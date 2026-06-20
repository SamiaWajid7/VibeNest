import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden bg-black text-white font-sans">
      {/* Animated glow blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-32 left-16 w-60 h-60 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Heart className="absolute top-28 left-28 w-4 h-4 text-pink-500/20 animate-bounce" />
        <Heart className="absolute bottom-24 right-24 w-3 h-3 text-pink-400/30 animate-bounce delay-1000" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-3xl px-6 py-16 animate-fade-in space-y-12">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 rounded-full bg-pink-600/20 hover:scale-105 transition duration-300">
            <Heart className="w-14 h-14 text-pink-500" />
          </div>
          <span className="text-5xl font-extrabold tracking-wide">Vibe nest</span>
        </div>

        {/* Heading */}
<h1 className="text-4xl md:text-5xl font-light leading-snug tracking-wide">
  Sync <span className="text-pink-500 font-semibold mx-1">Hearts</span>
  <br className="hidden md:block" />
  <span className="block mt-3">
    Share <span className="text-pink-500 font-semibold mx-1">Vibes</span>
  </span>
</h1>


        {/* Subtitle */}
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Find your vibe, share your story, and grow closer. One perfect match at a time.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            to="/register"
            className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full hover:scale-105 hover:bg-gray-100 transition shadow"
          >
            Get Started
          </Link>
          <a
            href="/learn-more"
            className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full hover:scale-105 hover:bg-gray-100 transition shadow"
          >
            Learn More
          </a>
          <Link
            to="/login"
            className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full hover:scale-105 hover:bg-gray-100 transition shadow"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
