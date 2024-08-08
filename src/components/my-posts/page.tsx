"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPostsByAuthor, Post } from "@/utils/fetchPosts";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface DecodedToken {
  id: string;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const MyPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserPosts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const authorId = decodedToken.id;

        const data = await fetchPostsByAuthor(authorId);
        setPosts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        My Posts
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Here you can view your posts.
      </p>

      <div className="max-w-3xl mx-auto">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts found.</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <Link key={post._id} href={`/post/${post._id}`}>
                <li className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer my-8">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {post.title}
                  </h3>
                  <div
                    className="text-gray-700 mt-2"
                    dangerouslySetInnerHTML={{
                      __html: truncateText(post.content, 300),
                    }}
                  />
                  <small className="block mt-4 text-gray-500 text-base">
                    Author: {post.authorId.name}
                  </small>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyPostsPage;
