'use client';
import { useParams, useRouter } from 'next/navigation';
import client from '../lib/code';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
  sys: {
    id: string;
  };
  fields: {
    author: string;
    category_2: string;
    category_3: string;
    category: string;
    location: {
      lat: number;
      lon: number;
    } | null; // Location can be null
    title: string;
    description: string;
    createAt: string;
    image: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
}

const BlogDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null); // State for address

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        const res = await client.getEntry(id as string);
        setPost(res as unknown as BlogPost);
      } catch (err) {
        setError('Failed to load post.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Fetch address when post and location are available
  useEffect(() => {
    const fetchAddress = async (lat: number, lon: number) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
        );
        const data = await response.json();

        if (data.display_name) {
          setAddress(data.display_name);
        } else {
          setAddress('Address not found');
        }
      } catch (error) {
        setAddress('Error fetching address');
      }
    };

    if (post?.fields.location) {
      const { lat, lon } = post.fields.location;
      fetchAddress(lat, lon);
    }
  }, [post]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!post) return <div>Post not found.</div>;

  return (
    <div className="flex justify-center flex-wrap items-center flex-col text-center py-14 px-20 bg-gray-100 w-full">
      {/* Image */}
      <img
        src={post.fields.image.fields.file.url}
        alt={post.fields.title}
        className="rounded-lg mb-4 h-96"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{post.fields.title}</h1>

      {/* Description */}
      <ReactMarkdown className={'text-xl mb-3'}>{post.fields.description}</ReactMarkdown>

      {/* Creation Date */}
      <p className="my-4 text-gray-900">
        <div className="font-bold">Create on </div>{' '}
        {new Date(post.fields.createAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <div className="flex flex-wrap items-center justify-center flex-col mb-3 mt-1">
        {' '}
        <div className="font-bold">Author</div>
        <div>{post.fields.author} </div>
      </div>

      <div className="flex justify-center items-center flex-wrap font-bold mt-1 mb-1">
        Category
      </div> 
      <div className="space-x-2 flex items-center mb-4">
        {post.fields.category && (
          <h3 className="font-bold border border-black inline-flex items-center justify-center px-2 py-1 rounded-full h-7 text-sm text-gray-900 bg-green-200">
            {post.fields.category}
          </h3>
        )}

        {post.fields.category_2 && (
          <h3 className="font-bold border border-black inline-flex items-center justify-center px-2 py-1 rounded-full h-7 text-sm text-gray-900 bg-green-200">
            {post.fields.category_2}
          </h3>
        )}

        {post.fields.category_3 && (
          <h3 className="font-bold border border-black inline-flex items-center justify-center px-2 py-1 rounded-full h-7 text-sm text-gray-900 bg-green-200">
            {post.fields.category_3}
          </h3>
        )}
      </div>

            {/* Location */}
      {post.fields.location && (
        <div className="mt-4 text-gray-900 flex justify-center flex-wrap items-center flex-col">
          <h4 className=" font-bold">Location writer </h4>
          {/* <p>Latitude: {post.fields.location.lat}, Longitude: {post.fields.location.lon}</p> */}
          {address && <p className='my-1'>Address: {address}</p>}

          {/* Embed OpenStreetMap */}
          <iframe
            width="600"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen 
            className='rounded-xl'
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${post.fields.location.lon - 0.01},${post.fields.location.lat - 0.01},${post.fields.location.lon + 0.01},${post.fields.location.lat + 0.01}&layer=mapnik&marker=${post.fields.location.lat},${post.fields.location.lon}`}
          > </iframe>

          {/* Link to open the full map */}
          <p>
            <a
              href={`https://www.openstreetmap.org/?mlat=${post.fields.location.lat}&mlon=${post.fields.location.lon}#map=15/${post.fields.location.lat}/${post.fields.location.lon}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/80 underline"
            >
              View Larger Map
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
