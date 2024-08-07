import React from "react";

const PostItem = ({ post }: { post: any }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          {post.title}
        </h3>
        <p className="text-gray-600">{post.excerpt}</p>
        <a
          href={`/post/${post._id}`}
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default PostItem;
