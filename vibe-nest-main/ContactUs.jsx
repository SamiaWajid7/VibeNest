                                                                                                                                                         import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase";
import { Sparkles, Mail, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // success | error
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      setFormData({ name: "", email: "", message: "" });
      setStatus("success");
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-16 flex flex-col items-center justify-center">
       {/* ✅ Back Button Header */}
      <div className="w-full bg-black border-b border-pink-500/20 mb-6">
        <div className="px-6 py-4">
          <button
            onClick={() => navigate("/dashboard")}
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

<Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

<br></br> <br></br> <br></br>
      <div className="max-w-2xl w-full bg-gray-900 border border-pink-500/30 rounded-3xl p-8 shadow-lg relative">
        <div className="absolute -top-6 left-6">
          <Sparkles className="w-8 h-8 text-pink-500 animate-pulse" />
        </div>
        <h1 className="text-3xl font-semibold text-center mb-6 text-pink-500">
          Get in Touch
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              required
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black border border-pink-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black border border-pink-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-300">Message</label>
            <textarea
              name="message"
              value={formData.message}
              required
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-black border border-pink-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="What's on your mind?"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4 mr-2" />
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-green-400 text-sm text-center">
            ✅ Message sent! We'll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-400 text-sm text-center">
            ❌ Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactUs;