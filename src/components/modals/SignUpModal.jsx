"use client";

import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

const SignUpModal = ({ isSignupOpen, onClose }) => {
  return (
    <div
      className={`${
        isSignupOpen ? "fixed" : "hidden"
      } inset-0 flex justify-center items-center z-50 cursor-default`}
    >
      <div className="fixed inset-0 bg-black opacity-40"></div>
      <div className="flex flex-col bg-white px-5 pb-6 pt-4 z-10 rounded-md">
        <div className="flex justify-end text-2xl">
          <button
            className="bg-slate-100 rounded-full hover:bg-slate-200"
            onClick={onClose}
          >
            <IoIosClose />
          </button>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-700 cursor-default mb-2">
          Register a new account
        </h1>

        <form className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600" htmlFor="name">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                className="border border-slate-300 rounded-md text-sm px-2 py-1 focus:border-orange-600 focus:outline-none"
                type="text"
                id="name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600" htmlFor="username">
                Username <span className="text-red-600">*</span>
              </label>
              <input
                className="border border-slate-300 rounded-md text-sm px-2 py-1 focus:border-orange-600 focus:outline-none"
                type="text"
                id="username"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600" htmlFor="student_id">
                Student ID <span className="text-red-600">*</span>
              </label>
              <input
                className="border border-slate-300 rounded-md text-sm px-2 py-1 focus:border-orange-600 focus:outline-none"
                type="text"
                id="student_id"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600" htmlFor="student_name">
                School Name <span className="text-red-600">*</span>
              </label>
              <input
                className="border border-slate-300 rounded-md text-sm px-2 py-1 focus:border-orange-600 focus:outline-none"
                type="text"
                id="student_name"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600" htmlFor="password">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                className="border border-slate-300 rounded-md text-sm px-2 py-1 focus:border-orange-600 focus:outline-none"
                type="text"
                id="password"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="text-sm text-slate-600"
                htmlFor="confirm_password"
              >
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <input
                className="border border-slate-300 rounded-md text-sm px-2 py-1 focus:border-orange-600 focus:outline-none"
                type="text"
                id="confirm_password"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <input id="agree" type="checkbox" />
            <label htmlFor="agree" className="text-sm text-slate-600">
              Do you agree on our{" "}
              <span className="text-blue-600 cursor-pointer">
                terms and conditions
              </span>
              ?
            </label>
          </div>

          <div className="flex justify-center">
            <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
