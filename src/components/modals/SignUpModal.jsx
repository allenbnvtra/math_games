"use client";

import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignUpModal = ({ isSignupOpen, onClose }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    studentLRN: "",
    schoolName: "",
    password: "",
    gradeSec: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", {
        name: formData.name,
        username: formData.username,
        studentLRN: formData.studentLRN,
        schoolName: formData.schoolName,
        password: formData.password,
        gradeSection: formData.gradeSec,
      });
      console.log(response.data);
      router.push("/");
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600" htmlFor="name">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                onChange={handleChange}
                value={formData.name}
                name="name"
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
                onChange={handleChange}
                value={formData.username}
                name="username"
                className="border border-slate-300 rounded-md text-sm px-2 py-1 focus:border-orange-600 focus:outline-none"
                type="text"
                id="username"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600" htmlFor="studentLRN">
                Student LRN <span className="text-red-600">*</span>
              </label>
              <input
                onChange={handleChange}
                value={formData.studentLRN}
                name="studentLRN"
                className="border border-slate-300 rounded-md text-sm px-2 py-1 focus:border-orange-600 focus:outline-none"
                type="text"
                id="studentLRN"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600" htmlFor="schoolName">
                School Name <span className="text-red-600">*</span>
              </label>
              <input
                onChange={handleChange}
                value={formData.schoolName}
                name="schoolName"
                className="border border-slate-300 rounded-md text-sm px-2 py-1 focus:border-orange-600 focus:outline-none"
                type="text"
                id="schoolName"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600" htmlFor="password">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                onChange={handleChange}
                value={formData.password}
                name="password"
                className="border border-slate-300 rounded-md text-sm px-2 py-1 focus:border-orange-600 focus:outline-none"
                type="text"
                id="password"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600" htmlFor="gradeSec">
                Grade and section <span className="text-red-600">*</span>
              </label>
              <input
                onChange={handleChange}
                value={formData.gradeSec}
                name="gradeSec"
                className="border border-slate-300 rounded-md text-sm px-2 py-1 focus:border-orange-600 focus:outline-none"
                type="text"
                id="gradeSec"
              />
            </div>
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
