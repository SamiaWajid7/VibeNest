import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleReset = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    
    // Basic email format check
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email");
      return;
    }
  
    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
    } catch (error) {
      console.error("Error:", error.code);
      setError(error.message.replace("Firebase: ", ""));
    }
  };

  return (
 <div className="min-h-screen bg-black text-white">
      {/* 🔙 Back Button Header */}
      <div className="bg-black border-b border-pink-500/20">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>


      {/* 🔐 Reset Password Form */}
      <div className="flex items-center justify-center px-4 py-16">
        <div className="bg-gray-900 p-8 rounded-xl shadow-md w-full max-w-md border border-gray-800">
          <h2 className="text-2xl font-semibold text-pink-500 mb-6 text-center">
            Forgot Password
        </h2>
        
        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        {submitted ? (
          <p className="text-bg-pink-500 text-center">
             A reset link has been sent to your email. Check your inbox and spam folder.
          </p>
        ) : (
          <form onSubmit={handleReset} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-300 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 border border-gray-700"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-500 text-white py-2 rounded-md transition duration-300"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
    </div>
  );
};

export default ForgotPassword;