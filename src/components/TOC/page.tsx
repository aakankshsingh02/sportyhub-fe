import React, { useEffect } from "react";
import Image from "next/image";
import tocbot from "tocbot";

interface TableOfContentsProps {
  onItemClick?: () => void;
}
export const TableOfContents = ({ onItemClick }: TableOfContentsProps) => {
  useEffect(() => {
    const initializeTocbot = () => {
      tocbot.init({
        tocSelector: ".gh-toc",
        contentSelector: ".gh-content",
        headingSelector: "h1, h2, h3, h4",
        hasInnerContainers: true,
        scrollSmooth: true,
        scrollSmoothOffset: -100,
        disableTocScrollSync: false,
        tocScrollOffset: -70,
        headingsOffset: 140,
      });
    };

    // Ensure tocbot initializes after the content is rendered
    setTimeout(initializeTocbot, 100);

    return () => {
      tocbot.destroy();
    };
  }, []);

  const handleTocItemClick = () => {
    const screenSizeBreakpoint = 768;
    if (window.innerWidth <= screenSizeBreakpoint) {
      if (typeof onItemClick === "function") {
        onItemClick();
      }
    }
  };

  const handleSubmitClick = () => {
    if (typeof onItemClick === "function") {
      onItemClick();
    }
  };

  return (
    <>
      <aside className="gh-sidebar pr-10 w-13/48 mx-0 lg:ml-12 ">
        <div className="flex justify-between">
          <h2 className="pt-10 lg:pt-12">Table of contents</h2>
          <button
            className="absolute right-5 top-6 block md:hidden"
            onClick={handleSubmitClick}
          >
            <Image alt="Close" src="/cross_yellow.svg" width={25} height={25} />
          </button>
        </div>
        <div className="gh-toc" onClick={handleTocItemClick}></div>
      </aside>
    </>
  );
};
