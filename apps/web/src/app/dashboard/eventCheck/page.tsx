'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { Component } from './chart/chart';
import { Navbar } from '@/app/layout/navbar';
import withRole from '@/hoc/roleGuard';

type Event = {
  ticketType: string;
  location: { id: number; locationName: string };
  id: number;
  title: string;
  description: string;
  totalSeats: number;
  images: { id: number; path: string; eventId: number }[];
  price: number;
  startTime: string;
  endTime: string;
  isDeleted: boolean;
};

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:8000/api/event/events-users/?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        setEvents(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        console.log('Error fetching events', error);
      }
    };
    fetchEvents();
  }, [page]);

  const handleDelete = async (eventId: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(
        `http://localhost:8000/api/event/events-delete/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      toast.error('You do not have permission to delete this event.', {
        className: 'bg-red-100 text-red-700 p-4 rounded-lg',
      });
    }
  };

  const handleEdit = async (eventId: number) => {
    router.push(`eventCheck/create/${eventId}`);
  };

  return (
    <div className="dark:bg-gray-800">
      <ToastContainer />
      <div>
        <div className="lg:xl:h-[1400px] px-8 py-20">
          <h1 className="text-3xl font-medium text-center dark:text-gray-100">
            Your Events
          </h1>
          <div className="mt-5 mb-10 flex justify-center">
            <Link href="/dashboard/eventCheck/create/event">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition">
                Create or Update Event
              </button>
            </Link>
          </div>
          {events.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md p-4"
                >
                  {event.images.length > 0 ? (
                    <div className="relative">
                      <Image
                        src={`http://localhost:8000${event.images[0].path}`}
                        alt={event.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">
                        Image Not Found
                      </span>
                    </div>
                  )}
                  <div className="mt-4 h-28">
                    <h2 className="text-xl font-semibold dark:text-gray-100">
                      {event.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {event.description}
                    </p>
                  </div>
                  <div className="mt-2 text-gray-600 dark:text-gray-400">
                    <p>
                      <strong>Location:</strong> {event.location.locationName}
                    </p>
                    <p>
                      <strong>Ticket:</strong> {event.ticketType}
                    </p>
                    <p>
                      <strong>Seats:</strong> {event.totalSeats}
                    </p>
                  </div>
                  <div className="mt-4 flex space-x-4">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={() => handleEdit(event.id)}
                    >
                      Update
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center dark:text-gray-100 h-[1000px]">
              No events found. Please create one.
            </div>
          )}
          <div className="mt-8 flex justify-center">
            <button
              className="px-4 py-2 rounded-full border bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span className="px-4 py-2">
              {page} of {totalPages}
            </span>
            <button
              className="px-4 py-2 rounded-full border bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>{' '}
        </div>
        <Component />
        <Navbar />
      </div>
    </div>
  );
};

export default withRole(EventList, 'ADMIN');
