'use client';
import { useEffect, useState } from 'react';
import client from './lib/code'; // Adjust the import path as necessary
import Link from 'next/link';
import Markdown from 'react-markdown';
import { GoArrowUpRight } from 'react-icons/go';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Interface for the blog post fields
interface BlogPostFields {
  title: string;
  category: string;
  category_2: string;
  category_3: string;
  description: string;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

interface BlogPost {
  sys: {
    id: string;
  };
  fields: BlogPostFields;
}

interface BlogPostProps {
  post: BlogPost;
}

const BlogPostComponent = ({ post }: BlogPostProps) => {
  return (
    <div className="rounded-lg p-5 relative bg-gray-100">
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={post?.fields?.image?.fields?.file?.url || '/placeholder-image.jpg'}
          alt={post?.fields?.title || 'No title available'}
          className="rounded-lg h-60 w-full object-cover"
        />
        <div className="absolute inset-0 bg-green-900/40 backdrop-brightness-100"></div>
      </div>

      <h3 className="text-xl flex justify-between h-10 py-1 line-clamp-2 my-2 mb-2 font-semibold">
        {post.fields.title}
        <GoArrowUpRight className="my-2" />
      </h3>

      <Markdown className="line-clamp-4 h-24 mb-8 text-gray-600">
        {post.fields.description}
      </Markdown>

      <div className="space-x-2 flex items-center">
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
    </div>
  );
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for the search term
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // State for selected categories
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await client.getEntries({ content_type: 'blogPost' });
        setPosts(res.items as unknown as BlogPost[]);
      } catch (err) {
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Filter posts based on the search term and selected categories
  const filteredPosts = posts.filter(post => {
    const matchesSearchTerm = post.fields.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(post.fields.category) || selectedCategories.includes(post.fields.category_2) || selectedCategories.includes(post.fields.category_3);
    return matchesSearchTerm && matchesCategory;
  });

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(cat => cat !== category) : [...prev, category]
    );
  };

  return (
    <div className="bg-gray-100 px-20 w-full pt-20 h-[1800px] justify-end">
      <div className="h-[1660px] ">
        {/* Search Input */}
        <div className="mb-4 w-full flex items-end justify-center ">
          <input
            type="text"
            placeholder="search your love blog..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-96  border-black/40 px-3 justify-center flex text-center hover:border hover:border-black/20 text-black/80 text-lg"
          /> 
        </div>

        {/* Category Filters */}
        <div className="flex space-x-4 mb-4  w-full items-end justify-center">
          <button
            onClick={() => toggleCategory('Nature')}
            className={`px-3 py-1 rounded-full border border-black/40 ${selectedCategories.includes('Nature') ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-900'}`}
          >
            Nature 
          </button>
          <button
            onClick={() => toggleCategory('Adventure')}
            className={`px-3 py-1 rounded-full  border border-black/40 ${selectedCategories.includes('Adventure') ? 'bg-green-600 text-white' : 'bg-gray-100  text-gray-900'}`}
          >
            Adventure
          </button>
          <button
            onClick={() => toggleCategory('Photography')}
            className={`px-3 py-1 rounded-full  border border-black/40 ${selectedCategories.includes('Photography') ? 'bg-green-600 text-white' : 'bg-gray-100  text-gray-900'}`}
          >
            Photography
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {currentPosts.map((post) => (
            <Link
              key={post.sys.id}
              href={`./dashboard/cms/contentful/${post.sys.id}`}
            >
              <BlogPostComponent post={post} />
            </Link>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center space-x-2 w-full justify-between mt-0 mx-2">
          {/* Left Arrow Button (disabled on the first page) */}
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 flex items-center rounded-full ${
              currentPage === 1 ? 'bg-gray-0 cursor-not-allowed' : 'bg-gray-00 text-gray-600'
            }`}
          >
            <FaArrowLeft className="mr-2 text-sm" /> Before
          </button>

          {/* Page Indicator */}
          <div className="flex justify-center w-full mt-0">
            <span className="px-4 py-2 text-green-900/80">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {/* Right Arrow Button (disabled on the last page) */}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 flex items-center rounded-full ${
              currentPage === totalPages ? 'bg-gray-00 cursor-not-allowed' : 'bg-gray-00 text-gray-600'
            }`}
          >
            After <FaArrowRight className="ml-2 text-sm" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
