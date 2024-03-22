"use client";

import Image from "next/image";
import React, { useState } from "react";

import Logo from "@/assets/logo.png";
import Link from "next/link";
import SignUpModal from "../modals/SignUpModal";
import LoginModal from "../modals/LoginModal";

const NavBar = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <header className="flex justify-between items-center py-4 px-10">
      <Link href="/">
        <Image
          className="cursor-pointer"
          src={Logo}
          height={200}
          width={200}
          alt=""
        />
      </Link>

      <nav className="flex items-center gap-10">
        <ul className="flex gap-5 text-slate-600 font-semibold">
          <li>
            <Link className="hover:text-orange-600" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-orange-600" href="/games">
              Games
            </Link>
          </li>
          <li>
            <Link className="hover:text-orange-600" href="/">
              About us
            </Link>
          </li>
        </ul>

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
