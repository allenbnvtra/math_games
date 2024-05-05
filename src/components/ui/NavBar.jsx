"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import Logo from "@/assets/logo.png";
import Link from "next/link";
import SignUpModal from "../modals/SignUpModal";
import LoginModal from "../modals/LoginModal";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const NavBar = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const session = useSession();
  const mySession = session?.data?.user;

  const router = usePathname();

  const isGamePage = router.startsWith("/game");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    setIsLoginOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleSignup = () => {
    setIsSignupOpen(true);
    setIsMobileMenuOpen(false);
  };

  if (!isGamePage)
    return (
      <header className="relative flex justify-between items-center py-4 lg:px-[7rem] md:px-[3rem] sm:px-[2rem] px-[1.2rem]">
        <Link href="/">
          <Image
            className="cursor-pointer w-[100px] h-[1.5rem] md:w-[12rem] md:h-[3rem]"
            src={Logo}
            height={200}
            width={200}
            alt=""
          />
        </Link>

        <button
          onClick={toggleMobileMenu}
          className="block sm:hidden focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile navigation menu */}
        {isMobileMenuOpen && (
          <nav className="absolute sm:hidden h-screen bg-white w-[17rem] left-0 top-[3.4rem] z-[1000]">
            <ul className="flex flex-col pl-5 pt-5 gap-5 text-slate-600 font-semibold">
              <li>
                <Link
                  className="hover:text-orange-600"
                  href="/"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>
              {mySession && (
                <li>
                  <Link
                    className="hover:text-orange-600"
                    href="/quiz"
                    onClick={closeMobileMenu}
                  >
                    Quiz
                  </Link>
                </li>
              )}
              <li>
                <Link
                  className="hover:text-orange-600"
                  href="/games"
                  onClick={closeMobileMenu}
                >
                  Games
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-orange-600"
                  href="/about-us"
                  onClick={closeMobileMenu}
                >
                  About us
                </Link>
              </li>
              {mySession ? (
                <li>
                  <button
                    onClick={() => signOut()}
                    className="hover:text-orange-600"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <button
                    onClick={handleSignup}
                    className="hover:text-orange-600"
                  >
                    Sign up
                  </button>
                </li>
              )}
              {!mySession && (
                <li>
                  <button
                    onClick={handleLogin}
                    className="hover:text-orange-600"
                  >
                    Login
                  </button>
                </li>
              )}
            </ul>
          </nav>
        )}

        <nav className="items-center gap-10 hidden sm:block">
          <div className="flex items-center gap-8">
            <ul className="flex gap-5 text-slate-600 font-semibold">
              <li>
                <Link
                  className="hover:text-orange-600"
                  href="/"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>
              {mySession && (
                <li>
                  <Link
                    className="hover:text-orange-600"
                    href="/quiz"
                    onClick={closeMobileMenu}
                  >
                    Quiz
                  </Link>
                </li>
              )}
              <li>
                <Link
                  className="hover:text-orange-600"
                  href="/games"
                  onClick={closeMobileMenu}
                >
                  Games
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-orange-600"
                  href="/about-us"
                  onClick={closeMobileMenu}
                >
                  About us
                </Link>
              </li>
            </ul>

            {mySession ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => signOut()}
                  className="bg-orange-600 px-3 py-2 rounded-md text-white font-semibold border border-orange-600 hover:bg-white hover:text-orange-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSignupOpen(true)}
                  className="bg-orange-600 px-3 py-2 rounded-md text-white font-semibold border border-orange-600 hover:bg-white hover:text-orange-600"
                >
                  Sign up
                </button>
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="text-orange-600 font-semibold border border-orange-600 px-3 py-2 rounded-md hover:bg-orange-600 hover:text-white"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </nav>

        <SignUpModal
          onClose={() => setIsSignupOpen(false)}
          isSignupOpen={isSignupOpen}
        />

        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          isLoginOpen={isLoginOpen}
        />
      </header>
    );
};

export default NavBar;
