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

  const session = useSession();
  const mySession = session?.data?.user;

  const router = usePathname();

  const isGamePage = router.startsWith("/game");

  if (!isGamePage) {
    return (
      <header className="flex justify-between items-center py-4 lg:px-[7rem] md:px-[3rem] sm:px-[2rem] px-[1.2rem]">
        <Link href="/">
          <Image
            className="cursor-pointer w-[100px] h-[1.5rem] md:w-[12rem] md:h-[3rem]"
            src={Logo}
            height={200}
            width={200}
            alt=""
          />
        </Link>

        <nav className="items-center gap-10 hidden sm:block">
          <div className="flex items-center gap-8">
            <ul className="flex gap-5 text-slate-600 font-semibold">
              <li>
                <Link className="hover:text-orange-600" href="/">
                  Home
                </Link>
              </li>
              {mySession && (
                <li>
                  <Link className="hover:text-orange-600" href="/quiz">
                    Quiz
                  </Link>
                </li>
              )}
              <li>
                <Link className="hover:text-orange-600" href="/games">
                  Games
                </Link>
              </li>
              <li>
                <Link className="hover:text-orange-600" href="/about-us">
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
  } else {
    return null;
  }
};

export default NavBar;
