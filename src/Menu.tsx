"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Menu = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  // Check authentication status on component mount and when local storage changes
  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Debugging line
      setIsAuthenticated(!!token);
    };

    checkAuthentication();

    // Add event listener for storage changes (e.g., in other tabs)
    window.addEventListener("storage", checkAuthentication);

    return () => {
      window.removeEventListener("storage", checkAuthentication);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.replace("/login"); // Redirect without adding a new entry to history
  };

  // Ensure that the component updates its state correctly on login/logout
  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated, redirecting...");
      router.replace("/"); // Redirect to homepage or any other page as needed
    }
  }, [isAuthenticated, router]);

  return (
    <nav className="bg-white text-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between md:justify-around items-center">
        <div className="text-2xl font-bold">
          <Link href="/">SportyHub</Link>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            href="/"
            className="hover:text-gray-400 transition-colors font-semibold"
          >
            Home
          </Link>
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="hover:text-gray-400 transition-colors font-semibold"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="hover:text-gray-400 transition-colors font-semibold"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="hover:text-gray-400 transition-colors font-semibold"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-gray-400 border-none bg-transparent cursor-pointer transition-colors font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
        <button
          className="md:hidden text-black focus:outline-none transition-transform duration-1000 font-semibold"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <AiOutlineClose size={24} />
          ) : (
            <AiOutlineMenu size={24} />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div
          className={`md:hidden mt-4 bg-white py-4 rounded-lg shadow-lg transition-transform duration-700 ease-in-out ${
            isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="hover:text-gray-400 transition-colors font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {!isAuthenticated ? (
              <>
                <Link
                  href="/login"
                  className="hover:text-gray-400 transition-colors font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="hover:text-gray-400 transition-colors font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="hover:text-gray-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-400 border-none bg-transparent cursor-pointer transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Menu;
