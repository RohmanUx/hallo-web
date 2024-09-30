'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import withRole from '@/hoc/roleGuard';
import Markdown from 'markdown-to-jsx';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
type Event = {
  user: number;
  ticketType: string;
  location?: { id: number; locationName: string };
  id: number;
  title: string;
  description: string;
  totalSeats: number;
  images: { id: number; path: string; eventId: number }[];
  price: number;
  startTime: string;
  endTime: string;
  category: { categoryName: string };
};

type Testimonial = {
  id: number;
  userId: number;
  eventId: number;
  reviewDescription: string;
  rating: number;
};

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type Props = {
  params: { id: string; eventId: string };
};

const EventDetailPage: React.FC<Props> = ({ params }: Props) => {
  const { id: userId, eventId, id } = params;
  const [event, setEvent] = useState<Event | null>(null);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [reviewDescription, setReviewDescription] = useState('');
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState('');
  const [purhace, setMessagePurhace] = useState('');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [qty, setQty] = useState<Number>(1);
  const [canComment, setCanComment] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      try {
        // event
        const eventResponse = await axios.get(
          `http://localhost:8000/api/event/events-id/${id}`,
        );
        setEvent(eventResponse.data.data);

        const savedTransaction = localStorage.getItem(
          `purchase_${userId}_${eventId}_${id}`,
        );
        const savedEndDate = localStorage.getItem(
          `endDate_${eventId}_${id}_${userId}`,
        );

        if (savedTransaction) {
          setHasPurchased(true);
        }

        if (savedEndDate) {
          const endDate = new Date(savedEndDate).getTime();
          const currentTime = new Date().getTime();
          if (currentTime > endDate) {
            setCanComment(true);
          }
        }
      } catch (error) {
        console.log('Error fetching event details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [eventId, userId, id]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/testimonial/testimonial/${id}`,
        );
        if (response.data && Array.isArray(response.data)) {
          setTestimonials(response.data);
        } else {
          setTestimonials([]);
        }
      } catch (err) {
        console.log('Error fetching testimonials', err);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [id]);

  const handlePurchase = async () => {
    if (!event) {
      setMessagePurhace('Event data is not available.');
      toast.error('Event data is not available.', {
        className: 'bg-red-100 text-red-700 p-4 rounded-lg',
        bodyClassName: 'font-medium',
      });
      return;
    }

    const currentTime = new Date().getTime();
    const endTime = new Date(event.endTime).getTime();
    if (currentTime > endTime) {
      toast.error('Cannot purchase tickets for a closed event.', {
        className: 'bg-red-100 text-red-700 p-4 rounded-lg',
        bodyClassName: 'font-medium',
      });
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/transaction/transaction`,
        {
          eventId: event.id,
          userId,
          qty,
          discountCode,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('auth_token')}`,
          },
        },
      );

      Cookies.set('transaction_token', response.data.token, {
        expires: 7,
        sameSite: 'None',
        secure: true,
      });

      localStorage.setItem(`purchase_${userId}_${eventId}_${id}`, 'true');
      localStorage.setItem(`endDate_${eventId}_${id}_${userId}`, event.endTime);
      setHasPurchased(true);
      toast.success('Purchase successful!', {
        className: 'bg-green-100 text-green-700 p-4 rounded-lg',
        bodyClassName: 'font-medium',
      });
    } catch (error) {
      console.log('Error during purchase', error);
      toast.error('Failed to complete the purchase.', {
        className: 'bg-red-100 text-red-700 p-4 rounded-lg',
        bodyClassName: 'font-medium',
      });
    }
  };

  function formatDateTime(isoString: string | number | Date) {
    const date = new Date(isoString);
    const formattedDate = date.toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
    const formattedTime = date.toLocaleTimeString('en-GB', { hour12: false }); // Format: HH:MM:SS
    return `${formattedDate} & ${formattedTime}`;
  }

  const handleCommentSubmit = async () => {
    if (!event) {
      setMessage('Event data is not available.');
      return;
    }

    try {
      await axios.post(`http://localhost:8000/api/testimonial/testimonial/`, {
        userId: parseInt(userId, 10), // Ensure userId is in the correct format
        eventId: parseInt(id, 10), // Ensure eventId is in the correct format
        reviewDescription,
        rating,
      });
      toast.success('its ok', {
        className: 'bg-red-100 text-red-700 p-4 rounded-lg',
        bodyClassName: 'font-medium',
      });

      // Refresh testimonials list
      const testimonialResponse = await axios.get(
        `http://localhost:8000/api/testimonial/testimonial/${id}`,
      );
      // setTestimonials(testimonialResponse.data.data || []);
      console.log('Testimonials data:');
    } catch (error) {
      setMessage('Error submitting testimonial');
      console.log('Error submitting testimonial ', error);
    }
  };

  const handleDeleteTestimonial = async (id: number) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/testimonial/testimonial/${id}`,
      );
      toast.success('delete testimonial succest ', {
        className: 'bg-red-100 text-red-700 p-4 rounded-lg',
        bodyClassName: 'font-medium',
      });
    } catch (error) {
      setMessage('Error deleting testimonial');
      console.log('Error deleting testimonial', error);
    }
  };

  const handleEditTestimonial = async (
    testimonialId: number,
    updatedData: { reviewDescription: string; rating: number },
  ) => {
    try {
      await axios.put(
        `http://localhost:8000/api/testimonial/testimonial/${testimonialId}`,
        updatedData,
      );
      toast.success(' edit testimonial succest ', {
        className: 'bg-red-100 text-red-700 p-4 rounded-lg',
        bodyClassName: 'font-medium',
      });

      // Refresh testimonials list
      const testimonialResponse = await axios.get(
        `http://localhost:8000/api/testimonial/testimonial/${id}`,
      );
      setTestimonials(testimonialResponse.data || []);
    } catch (error) {
      setMessage('Error updating testimonial');
      console.log('Error updating testimonial', error);
    }
  };
  if (loading) return <p>Loading ... </p>;
  if (!event) return <p>Event not found </p>;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? event.images.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === event.images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const currentTime = new Date().getTime();
  const startTime = new Date(event.startTime).getTime();
  const endTime = new Date(event.endTime).getTime();
  const isEnded = currentTime > endTime;

  return (
    <div className="bg-gray-50 p-4 sm:px-10 md:px-20 lg:px-28 py-20">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="w-full lg:w-2/3">
          <ToastContainer />
          <div className="relative w-96 h-[380px] flex mb-4">
            {event.title.length > 0 && (
              <Carousel>
                <CarouselContent
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {event.images.map((image) => (
                    <CarouselItem
                      key={image.id}
                      className="flex-shrink-0 w-[300px] h-[380px] "
                    >
                      <Image
                        src={`http://localhost:8000${image.path}`}
                        alt={event.title}
                        width={300}
                        height={380}
                        objectFit="layout"
                        className="my-5 shadow-sm w-full h-auto max-w-full bg-black/40"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* Left Navigation */}
                <button
                  onClick={handlePrev}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800/40 text-white p-1 rounded-full backdrop-blur-3xl border-white/60 border mx-1"
                >
                  <FaChevronLeft size={15} />
                </button>
                {/* Right Navigation */}
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800/40 text-white p-1 rounded-full  backdrop-blur-3xl border-white/60 border mx-1"
                >
                  <FaChevronRight size={15} />
                </button>
              </Carousel>
            )}
          </div>
          <div className="bg-gray-50 flex rounded-sm font-sans flex-col py-5 text-gray-100">
            <h1 className="text-2xl md:text-3xl font-medium text-gray-900 font-sans uppercase">
              {event.title}
            </h1>
            <div className="my-3">
              <Markdown className="text-sm md:text-base font-sans text-gray-900">
                {event.description}
              </Markdown>
            </div>
            <p className="text-sm mt-3 font-sans text-gray-900">
              {formatDateTime(event.startTime)}
            </p>
            <p className="text-sm mt-2 font-sans text-gray-900">
              {formatDateTime(event.endTime)}
            </p>
            <p className="text-gray-900 mt-2 text-sm font-sans">
              Location:{' '}
              {event.location
                ? event.location.locationName
                : 'Location not available'}
            </p>
            <p className="text-gray-900 mt-2 text-sm font-sans">
              Seats Available: {event.totalSeats}
            </p>
            <p className="text-gray-900 mt-2 text-sm font-sans">
              Price: {event.price}
            </p>
            <p
              className={`text-${
                currentTime > endTime
                  ? 'red'
                  : currentTime < startTime
                    ? 'red'
                    : 'red'
              }-600 font-medium font-sans mt-2 text-sm`}
            >
              Status:{' '}
              {currentTime > endTime
                ? 'Closed'
                : currentTime < startTime
                  ? 'Upcoming'
                  : 'Ongoing'}
            </p>
            <p className="text-gray-900 font-sans text-sm mt-2">
              Ticket Type: {event.ticketType}
            </p>
            <div className="mt-8">
              <div className="text-gray-900 font-sans text-sm p-1 bg-gray-200 w-20 rounded-full flex justify-center border-l-4 border-green-600">
                LABEL:
              </div>
              <p className="ml-4 text-gray-900 font-sans text-sm mt-2">
                {event.category.categoryName}{' '}
              </p>
            </div>
          </div>
        </div>

        {/* Purchase Form */}
        <div className="relative w-full lg:w-1/3 lg:ml-20">
          <div className="bg-gray-100/10 p-6 rounded-lg mt-6 lg:mt-[57px] h-auto lg:h-80 w-full lg:w-80 border-gray-700 opacity-100 border-[1px] sticky top-20 backdrop-blur-3xl">
            <h2 className="text-lg font-medium font-sans mb-4">
              Purchase Tickets{' '}
            </h2>
            <label className="block text-sm mb-2 text-gray-900 font-sans">
              Quantity:
              <input
                type="number"
                value={parseInt(qty.toString())}
                onChange={(e) => setQty(parseInt(e.target.value, 10))}
                min={0}
                max={event.totalSeats}
                placeholder="idr currency"
                className="w-full p-2 border border-gray-300 rounded my-2"
              />
            </label>
            <label className="block mb-2 font-sans text-sm text-gray-900">
              Discount Code:
              <input
                type="text"
                placeholder="code here"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded my-2"
              />
            </label>
            <button
              onClick={handlePurchase}
              className="bg-gray-500 text-white p-2 rounded mt-4 hover:bg-blue-700 w-full"
            >
              Purchase
            </button>
            {message && <p className="mt-4 text-gray-900">{purhace}</p>}
          </div>
        </div>
      </div>

      {/* Testimonial Form */}
      {hasPurchased && isEnded && (
        <div className="mt-8  bg-gray-50/10 backdrop-blur-3xl">
          <div className="p-6 rounded-lg font-sans border-black border-[1px] w-full lg:w-[400px]">
            <h2 className="text-lg font-medium font-sans mb-4 text-gray-900">
              Your Comment
            </h2>
            <div className="flex flex-col lg:flex-row">
              <label className="block mb-2 font-sans text-gray-900 w-full">
                Review:
                <textarea
                  value={reviewDescription}
                  onChange={(e) => setReviewDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded my-2 h-10"
                />
              </label>
              <label className="block mb-2 font-sans w-full">
                <span className="block mb-2 font-sans text-gray-900">
                  Rating:
                </span>
                <select
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value, 10))}
                  className="p-2 border border-gray-300 w-full rounded-sm my-0 mx-2"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </label>
            </div>
            <button
              onClick={handleCommentSubmit}
              className="bg-gray-500 text-white p-2 rounded mt-4 hover:bg-blue-700 w-full"
            >
              Submit
            </button>
            {message && <p className="mt-4 text-red-600">{message}</p>}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-medium text-gray-900 font-sans">
              Testimonials
            </h2>
            {testimonials.length > 0 ? (
              <ul className="mt-4 space-y-4">
                {testimonials.map((testimonial) => (
                  <li
                    key={testimonial.id}
                    className="p-4 border-[1px] border-gray-300 flex justify-between items-start"
                  >
                    <div>
                      <p className="font-medium text-gray-950 font-sans text-xl">
                        {`userId:  ${testimonial.userId}`}
                      </p>
                      <p className="text-gray-700 font-sans">
                        {testimonial.reviewDescription}
                      </p>
                      <p className="font-medium text-gray-700 font-sans">
                        {`Rating: ${testimonial.rating}`}
                      </p>
                    </div>
                    <div className="flex flex-col lg:flex-row">
                      {hasPurchased && (
                        <>
                          <button
                            onClick={() => {
                              const newReviewDescription = prompt(
                                'Enter new review description:',
                                testimonial.reviewDescription,
                              );
                              const newRating =
                                (prompt(
                                  'Enter new rating:',
                                  testimonial.rating.toString(),
                                ),
                                10);

                              if (newReviewDescription && !isNaN(newRating)) {
                                handleEditTestimonial(testimonial.id, {
                                  reviewDescription: newReviewDescription,
                                  rating: newRating,
                                });
                              } else {
                                setMessage(
                                  'Invalid input for updating testimonial.',
                                );
                              }
                            }}
                            className="text-red-500 text-sm ml-4 font-sans"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteTestimonial(testimonial.id)
                            }
                            className="text-red-500 text-sm ml-4 font-sans"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-gray-900">No testimonials available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;
