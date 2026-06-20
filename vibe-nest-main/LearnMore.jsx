import { Sparkles, CalendarHeart, MessageCircleHeart, Lock, Wand2, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

export default function LearnMore() {
  return (
    <div className="min-h-screen w-screen bg-black text-white px-6 py-16 flex flex-col items-center">
      {/* Soft animated background effects */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-32 left-10 w-64 h-64 bg-pink-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-16 right-16 w-48 h-48 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-4xl text-center space-y-12">
        <h1 className="text-5xl md:text-6xl font-light leading-tight">
          Discover <span className="text-pink-500 font-semibold">Vibieez</span>
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Vibe Nest is more than an app ,it helps you find your vibe, share your story, and grow closer.
        </p>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <Feature
            icon={<MessageCircleHeart className="w-6 h-6 text-pink-500" />}
            title="Private Couple Chat"
            desc="Send love notes, share your day, and stay close with a secure, ad-free chat just for the two of you."
          />
          <Feature
            icon={<CalendarHeart className="w-6 h-6 text-pink-500" />}
            title="Shared Calendar"
            desc="Celebrate anniversaries, remember dates, and plan the future together with synced reminders."
          />
          <Feature
            icon={<Clock3 className="w-6 h-6 text-pink-500" />}
            title="Memory Timeline"
            desc="A scrollable journey through your shared moments — from your first message to your latest selfie."
          />
          <Feature
            icon={<Sparkles className="w-6 h-6 text-pink-500" />}
            title="Mood Check-ins"
            desc="Share how you're feeling and support each other even on the quiet days."
          />
          <Feature
            icon={<Wand2 className="w-6 h-6 text-pink-500" />}
            title="Custom Themes"
            desc="Make it truly yours — customize colors, nicknames, and vibes that reflect your relationship."
          />
          <Feature
            icon={<Lock className="w-6 h-6 text-pink-500" />}
            title="Privacy First"
            desc="Your data stays between you and your partner — no ads, no tracking, just love."
          />
        </div>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-10">
          <Link
            to="/register"
            className="bg-gradient-to-r from-pink-500 to-pink-300 text-gray-900 font-semibold py-3 px-8 rounded-3xl hover:scale-105 transition"
          >
            Join Now
          </Link>
          <Link
            to="/"
            className="border-2 border-gray-600 text-gray-300 py-3 px-8 rounded-3xl hover:bg-gray-800 hover:border-pink-500 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

// Feature card component
function Feature({ icon, title, desc }) {
  return (
    <div className="flex items-start space-x-4 bg-white/5 p-6 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition">
      <div>{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">{desc}</p>
      </div>
    </div>
  );
}
