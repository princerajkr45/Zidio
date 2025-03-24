import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-200">
      <h1 className="text-3xl uppercase pb-6 text-[#2D336B] font-bold">Task Manager</h1>

      <div className="relative w-[60%] flex rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side: Welcome Note OR Login Form */}
        <motion.div
          className="w-1/2 h-full flex flex-col justify-center items-center text-center p-6 bg-[#2D336B] text-white transition-all duration-500"
          animate={{ x: isLogin ? "100%" : "0%" }}
        >
          {!isLogin ? (
            <>
              {/* Signup Welcome Note */}
              <h2 className="text-3xl font-bold">Hello, Friend!</h2>
              <p className="py-3">Join us and start managing your tasks today!</p>
              <button
                className="px-8 py-3 bg-[#7886C7] rounded-lg text-xl hover:bg-[#A9B5DF] transition duration-300"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </>
          ) : (
            <>
              {/* Login Form */}
              <h2 className="text-2xl font-bold text-white">Login</h2>
              <form className="mt-6 w-full px-6  p-6 rounded-lg ">
                <div>
                  <label className="block text-left text-white">Email</label>
                  <input
                    type="email"
                    className="w-full mt-2 px-4 py-2 border rounded-lg border-gray-300 focus:border-[#7886C7] focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-left text-white">Password</label>
                  <input
                    type="password"
                    className="w-full mt-2 px-4 py-2 border rounded-lg border-gray-300 focus:border-[#7886C7] focus:outline-none"
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-6 px-4 py-2 text-white  rounded-lg bg-[#7886C7] transition duration-300"
                >
                  Login
                </button>
              </form>
            </>
          )}
        </motion.div>

        {/* Right Side: Login Welcome OR Signup Form */}
        <motion.div
          className="w-1/2 p-6 bg-white rounded-lg relative transition-all duration-500 flex flex-col justify-center items-center"
          animate={{ x: isLogin ? "-100%" : "0%" }}
        >
          {isLogin ? (
            <>
              {/* Login Welcome Note */}
              <h2 className="text-3xl font-bold text-[#2D336B] text-center">Welcome Back!</h2>
              <p className="py-3 text-center text-[#2D336B]">
                Enter your credentials and manage your tasks effectively.
              </p>
              <button
                className=" mt-4 px-8 py-3 bg-[#2D336B] text-white rounded-lg text-xl hover:bg-[#7886C7] transition duration-300"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              {/* Signup Form */}
              <h2 className="text-2xl font-bold text-center text-[#2D336B]">Sign Up</h2>
              <form className="mt-6 w-full px-6 bg-white p-6 rounded-lg ">
                <div>
                  <label className="block text-[#2D336B]">Name</label>
                  <input
                    type="text"
                    className="w-full mt-2 px-4 py-2 border rounded-lg border-gray-300 focus:border-[#7886C7] focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-[#2D336B]">Email</label>
                  <input
                    type="email"
                    className="w-full mt-2 px-4 py-2 border rounded-lg border-gray-300 focus:border-[#7886C7] focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-[#2D336B]">Password</label>
                  <input
                    type="password"
                    className="w-full mt-2 px-4 py-2 border rounded-lg border-gray-300 focus:border-[#7886C7] focus:outline-none"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-[#2D336B]">Confirm Password</label>
                  <input
                    type="password"
                    className="w-full mt-2 px-4 py-2 border rounded-lg border-gray-300 focus:border-[#7886C7] focus:outline-none"
                    placeholder="Confirm your password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-6 px-4 py-2 text-white bg-[#2D336B] rounded-lg hover:bg-[#7886C7] transition duration-300"
                >
                  Sign Up
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
