"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import MyPostsPage from "@/src/components/my-posts/page";

const MyPosts = () => {
  return (
    <div>
      <Head>
        <title>SportyHub</title>
      </Head>
      <MyPostsPage />
    </div>
  );
};

export default MyPosts;
