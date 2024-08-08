import Image from "next/image";
import Link from "next/link";
import React from "react";

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const PostItem = ({ post }: { post: any }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Image
        src={post.image || "/default-image.png"} // Fallback image
        alt={post.title || "Post Image"}
        className="w-full h-48 object-cover"
        width={1024}
        height={716}
        priority={false}
        loading="lazy"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          {post.title}
        </h3>
        <div
          className="text-gray-600"
          dangerouslySetInnerHTML={{ __html: truncateText(post.content, 300) }}
        ></div>
        <Link
          href={`/post/${post._id}`}
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
