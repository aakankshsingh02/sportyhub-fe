import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { fetchPosts } from "@/utils/fetchPosts";

interface Author {
  _id: string;
  name: string;
  email: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: Author;
  createdAt: string;
}



const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        setError("Failed to load posts");
        console.error(error);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white text-center py-20 mb-10 shadow-lg">
        <h1 className="text-4xl font-bold mb-3">Our Curated Blogs</h1>
      </div>

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto p-5">
        <h2 className="text-2xl font-bold mb-5 text-gray-800">Recent Posts</h2>
        {error && <p className="text-red-500">{error}</p>}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <li key={post._id} className="bento-item">
              <PostItem post={post} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
