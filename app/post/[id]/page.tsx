// app/post/[id]/page.tsx

import React from "react";

interface PostProps {
  params: {
    id: string;
  };
}

const PostPage = async ({ params }: PostProps) => {
  const { id } = params;

  // Fetch the post data using the ID
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
  if (!res.ok) {
    // Handle error
    return <p>Failed to load post.</p>;
  }
  const post = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-3xl font-semibold mt-4">{post.title}</h1>
      <p className="mt-4 text-gray-700">{post.content}</p>
    </div>
  );
};

export default PostPage;
