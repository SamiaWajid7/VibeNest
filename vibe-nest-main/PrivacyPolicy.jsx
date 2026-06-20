import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

export default function PrivacyPolicy() {
const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
            {/* ✅ Back Button Header */}
      <div className="bg-black border-b border-pink-500/20 mb-6">
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

      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-semibold text-pink-500 text-center">
          Privacy Policy & Terms of Use ✨
        </h1>

        {/* Section 1 */}
        <section className="bg-gray-900/40 border border-pink-500/20 rounded-2xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-white">1. Introduction</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
          Vibe nest is a soulful platform designed to help users build meaningful connections through emotional depth, shared intentions, and spiritual compatibility. By using this app, you agree to our policies outlined below.
          </p>
        </section>

        {/* Section 2 */}
        <section className="bg-gray-900/40 border border-pink-500/20 rounded-2xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-white">2. Data We Collect</h2>
          <ul className="text-gray-300 text-sm list-disc list-inside space-y-2">
            <li>Basic profile info: name, email, gender, DOB</li>
            <li>Preferences, answers to quizzes, and intentions</li>
            <li>Optional data like height, profile photo, vibe quiz results</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="bg-gray-900/40 border border-pink-500/20 rounded-2xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-white">3. How We Use Your Data</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Your data is used to power the matchmaking engine, improve user experience, and foster meaningful connections. We never sell your data to third parties.
          </p>
        </section>

        {/* Section 4 */}
        <section className="bg-gray-900/40 border border-pink-500/20 rounded-2xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-white">4. Account Terms</h2>
          <ul className="text-gray-300 text-sm list-disc list-inside space-y-2">
            <li>You must be 18+ to use Vibe nest.</li>
            <li>You are responsible for the authenticity of your profile.</li>
            <li>Harassment, hate speech, or spam will result in suspension.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="bg-gray-900/40 border border-pink-500/20 rounded-2xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-white">5. Safety & Consent</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Your safety matters. Always communicate respectfully. We encourage mindful interactions and emotional boundaries. By using this app, you consent to the collection and storage of your data in Firebase.
          </p>
        </section>

        {/* Section 6 */}
        <section className="bg-gray-900/40 border border-pink-500/20 rounded-2xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-white">6. Your Control</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            You may update or delete your profile at any time. For support or data removal requests, please contact us directly through the “Contact Us” page.
          </p>
        </section>

        {/* Section 7 */}
        <section className="bg-gray-900/40 border border-red-400/30 rounded-2xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-red-400">Disclaimer</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
          Vibe nest is a community platform, not a replacement for professional counseling or therapy. Always seek professional help if needed. We are not liable for external interactions between users.
          </p>
        </section>

        <p className="text-center text-sm text-gray-500 mt-10">
          Last Updated: {new Date().toLocaleDateString("en-US")} <br />
          © {new Date().getFullYear()} Vibe nest. All rights reserved.
        </p>
      </div>
    </div>
  );
}
