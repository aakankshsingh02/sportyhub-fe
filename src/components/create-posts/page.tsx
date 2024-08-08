
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useProtectedRoute from "@/src/_helper/protectedRoute";
import axios from "axios";
import "react-quill/dist/quill.snow.css"; // import styles
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


const CreatePostPage = () => {
  useProtectedRoute();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setfeaturedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setfeaturedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (featuredImage) {
        formData.append("image", featuredImage);
      }

      await axios.post(`${apiUrl}/post`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      router.push("/dashboard/my-posts");
    } catch (err) {
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-800 mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              required
            />
          </div>
          <div>
            <label
              htmlFor="featuredImage"
              className="block text-lg font-medium text-gray-800 mb-2"
            >
              Featured Image
            </label>
            <input
              id="featuredImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-lg font-medium text-gray-800 mb-2"
            >
              Content
            </label>
            <ReactQuill
              value={content}
              onChange={setContent}
              className="w-full border border-gray-300 rounded-md shadow-sm "
              modules={quillModules}
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            } transition duration-150 ease-in-out`}
          >
            {loading ? "Creating..." : "Publish"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Configure Quill modules
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // This adds all header levels
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link"],
    ["image"],
  ],
};

export default CreatePostPage;
