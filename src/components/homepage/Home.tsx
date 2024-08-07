import React from "react";
import PostItem from "./PostItem";
import { fetchPosts } from "@/utils/fetchPosts";

const Home = async () => {
  const posts = await fetchPosts();

  return (
    <div className=" bg-gray-200 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white text-center py-20 mb-10  shadow-lg">
        <h1 className="text-4xl font-bold mb-3">Our Curated Blogs</h1>
      </div>

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto p-5">
        <h2 className="text-2xl font-bold mb-5 text-gray-800">Recent Posts</h2>
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
