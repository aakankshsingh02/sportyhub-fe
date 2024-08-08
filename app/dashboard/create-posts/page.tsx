"use client";
import React from "react";
import Head from "next/head";
import CreatePostPage from "@/src/components/create-posts/page";


const CreatePost = () => {
  return (
    <div>
      <Head>
        <title>SportyHub</title>
      </Head>
      <CreatePostPage />
    </div>
  );
};

export default CreatePost;
