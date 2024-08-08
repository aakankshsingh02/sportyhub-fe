"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./blog.module.css";
import readingTime from "reading-time";
import { TableOfContents } from "@/src/components/TOC/page";

interface Author {
  _id: string;
  name: string;
  email: string;
}

interface PostProps {
  params: {
    id: string;
  };
}

const PostPage = ({ params }: PostProps) => {
  const { id } = params;
  const [post, setPost] = useState<{
    image: string;
    title: string;
    content: string;
    createdAt: string;
    readingTime?: string;
    authorId: Author;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [screenSize, setScreenSize] = useState<string>("large");
  const [tocClick, setTocClick] = useState<boolean>(false);

  const handleResize = () => {
    setScreenSize(window.innerWidth <= 768 ? "small" : "large");
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`
        );
        if (!res.ok) {
          const errorText = await res.text();
          console.error(
            `Failed to load post. Status: ${res.status}, Error: ${errorText}`
          );
          setError("Failed to load post.");
          return;
        }
        const postData = await res.json();
        const { content } = postData;
        const { text } = readingTime(content);

        // Add IDs to headings
        const addIdsToHeadings = (html: string) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          doc.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading) => {
            const id = `heading-${uuidv4()}`;
            heading.id = id;
          });
          return doc.body.innerHTML;
        };

        setPost({
          ...postData,
          content: addIdsToHeadings(content), // Updated content with IDs
          readingTime: text, // Calculate and set reading time
        });
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Failed to load post.");
      }
    };

    fetchPost();
    handleResize(); // Set initial screen size
    window.addEventListener("resize", handleResize); // Add resize event listener
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, [id]);

  const handleTocClick = () => {
    setTocClick(!tocClick);
  };

  const closeTOC = () => {
    setTocClick(false);
  };

  const backdropBlurStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: tocClick ? "blur(5px)" : "none",
    zIndex: 1000,
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString();

  return (
    <div className="relative flex flex-col py-10">
      <div className="flex flex-col items-center px-5 py-0 md:py-12 lg:px-20">
        <h1 className="text-3xl font-semibold text-center">{post.title}</h1>
        <div
          className="mt-4 mb-3 font-medium text-black uppercase text-opacity-60"
          style={{ fontSize: "16px", lineHeight: "22px" }}
        >
          <span>{formattedDate}</span>
          <span> • </span>
          <span>{post.readingTime}</span>
          <div className="mb-5 my-4 transform lg:-translate-x-1/2 lg:absolute lg:left-1/2 lg:mb-0">
            <span className="font-light normal-case">by </span>
            <span className="text-base font-medium text-black capitalize">
              {post.authorId.name}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-full mt-2 px-5 lg:px-20">
        <Image
          src={post.image}
          alt={post.title}
          height={580}
          width={1080}
          layout="responsive"
          className="object-cover"
          loading="eager"
          priority={true}
        />
      </div>

      <div className="relative flex">
        {screenSize === "large" && <TableOfContents onItemClick={undefined} />}
        {screenSize === "small" && (
          <>
            <div
              className="fixed top-0 left-0"
              style={tocClick ? backdropBlurStyle : {}}
            >
              {tocClick && (
                <div className="relative z-20">
                  <div className="fixed top-14 right-6 pl-10 transition-all duration-[0.3s] ease-in-out w-full">
                    <TableOfContents onItemClick={closeTOC} />
                  </div>
                </div>
              )}
            </div>
            <div
              style={{ backgroundColor: "#FDAB4F" }}
              className="fixed z-30 flex items-center justify-center rounded-full shadow-md left-8 bottom-8 w-14 h-14 border border-black lg:hidden"
              onClick={handleTocClick}
            >
              {tocClick ? (
                <Image
                  src="/assets/cross_white.svg"
                  width={20}
                  height={20}
                  alt="Close"
                  loading="lazy"
                />
              ) : (
                <Image
                  src="/assets/hamburger_toc.svg"
                  width={30}
                  height={30}
                  alt="Menu"
                  loading="lazy"
                />
              )}
            </div>
          </>
        )}
        <div className="flex justify-center items-center">
          <div className="max-w-4xl flex justify-center items-center">
            <div
              className={`${styles.postBody} gh-content gh-canvas mt-4  text-gray-700`}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
