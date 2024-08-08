import React from "react";
import useProtectedRoute from "@/src/_helper/protectedRoute";
import Link from "next/link";

const DashboardPage = () => {
  useProtectedRoute();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Welcome to your dashboard! Here you can post new articles and view
          your posts.
        </p>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              View Your Posts
            </h2>
            <Link
              href="/dashboard/my-posts"
              className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
            >
              Go to My Posts
            </Link>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Create New Posts
            </h2>
            <Link
              href="/dashboard/create-posts"
              className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
            >
              Create Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
