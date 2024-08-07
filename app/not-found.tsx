"use client";
import React from "react";

const NotFound = () => {
  return (
    <div className="relative w-full h-screen bg-white flex items-center justify-center">
      <svg
        width="380px"
        height="500px"
        viewBox="0 0 837 1045"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          marginTop: "-250px",
          marginLeft: "-400px",
        }}
      >
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <path
            d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z"
            id="Polygon-1"
            stroke="#007FB2"
            strokeWidth="6"
          ></path>
          <path
            d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z"
            id="Polygon-2"
            stroke="#EF4A5B"
            strokeWidth="6"
          ></path>
          <path
            d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z"
            id="Polygon-3"
            stroke="#795D9C"
            strokeWidth="6"
          ></path>
          <path
            d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z"
            id="Polygon-4"
            stroke="#F2773F"
            strokeWidth="6"
          ></path>
          <path
            d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z"
            id="Polygon-5"
            stroke="#36B455"
            strokeWidth="6"
          ></path>
        </g>
      </svg>
      <div
        className="text-center"
        style={{
          height: "200px",
          width: "380px",
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: "-100px",
          marginLeft: "50px",
          color: "#FFF",
          fontFamily: "Roboto",
          fontWeight: 300,
        }}
      >
        <h1 className="text-6xl font-bold mb-8 text-black">404</h1>
        <p className="text-lg text-black">Page not found</p>
        <div className="mt-10">
          <a
            onClick={() => window.history.back()}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 mr-4 cursor-pointer hover:bg-gray-600"
          >
            Go Back
          </a>
          <a
            href="/"
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 cursor-pointer hover:bg-gray-600"
          >
            Go to Home Page
          </a>
        </div>
      </div>
      <style jsx>{`
        #Polygon-1,
        #Polygon-2,
        #Polygon-3,
        #Polygon-4,
        #Polygon-5 {
          animation: float 1s infinite ease-in-out alternate;
        }
        #Polygon-2 {
          animation-delay: 0.2s;
        }
        #Polygon-3 {
          animation-delay: 0.4s;
        }
        #Polygon-4 {
          animation-delay: 0.6s;
        }
        #Polygon-5 {
          animation-delay: 0.8s;
        }

        @keyframes float {
          100% {
            transform: translateY(20px);
          }
        }

        @media (max-width: 450px) {
          svg {
            margin-left: -190px;
          }
          .text-center {
            margin-left: -190px;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
