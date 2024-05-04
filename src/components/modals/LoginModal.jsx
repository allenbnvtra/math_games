"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";

import { signIn } from "next-auth/react";

const LoginModal = ({ isLoginOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
      setIsLoading(true);
      const res = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (!res.ok) {
        setIsLoading(false);
        setError("Wrong Credentials!");
      } else {
        setIsLoading(false);
        onClose();
      }
    } catch (error) {
      console.log(error);
      setError("Error: Wrong Credentialss!");
    }
  };

  return (
    <div
      className={`${
        isLoginOpen ? "fixed" : "hidden"
      } inset-0 flex justify-center items-center z-50 cursor-default`}
    >
      <div className="fixed inset-0 bg-black opacity-40"></div>
      <div className="w-[22rem] flex flex-col bg-white px-5 pb-6 pt-4 z-10 rounded-md">
        <div className="flex justify-end text-2xl">
          <button
            className="bg-slate-100 rounded-full hover:bg-slate-200"
            onClick={onClose}
          >
            <IoIosClose />
          </button>
        </div>
        <h1 className="text-center text-2xl font-extrabold text-slate-700 cursor-default mb-2">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
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
          </div>
          <p className="text-red-600 text-sm">{error}</p>

          <div className="flex justify-center">
            <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 rounded-md">
              {isLoading ? "Logging in..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
