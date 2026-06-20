
import React from "react";
import { useProfile } from "../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import {
  User, Mail, Heart, Target, MapPin, Calendar,
  Sparkles, Star, Users, Edit3, Coffee, Search
} from "lucide-react";
import { Helmet } from 'react-helmet';

const Profile = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();

  return (

    
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-pink-400 mb-2">Your Profile</h1>
          <p className="text-gray-300">View your vibe details</p>
        </div>

        <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

        {profile ? (
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-black rounded-3xl p-6 border border-pink-500">
              <div className="flex items-center gap-6">
                <div>
                  {profile.profilePhotoURL ? (
                    <img
                      src={profile.profilePhotoURL}
                      alt="Profile"
                      className="w-28 h-28 rounded-full object-cover border-4 border-pink-400"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-pink-600 text-white flex items-center justify-center text-3xl">👤</div>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-pink-400">{profile.fullName}</h2>
                  <p className="text-sm text-gray-300">{profile.email}</p>
                  {profile.username && <p className="text-gray-300">@{profile.username}</p>}
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="bg-black rounded-xl p-5 border border-pink-500">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-pink-400">
                  <User className="text-pink-400" /> Basic Info
                </h3>
                <div className="space-y-2 text-gray-200">
                  <p><strong className="text-pink-300">Date of Birth:</strong> {profile.dateOfBirth}</p>
                  <p><strong className="text-pink-300">Gender:</strong> {profile.gender}</p>
                  <p><strong className="text-pink-300">Pronouns:</strong> {profile.preferredPronouns}</p>
                </div>
              </div>

              {/* Identity & Intentions */}
              <div className="bg-black rounded-xl p-5 border border-pink-500">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-pink-400">
                  <Heart className="text-pink-400" /> Identity & Intentions
                </h3>
                <div className="space-y-2 text-gray-200">
                  <p><strong className="text-pink-300">Open to Long Distance:</strong> {profile.openToLongDistance}</p>
                  <p><strong className="text-pink-300">Relationship Type:</strong> {profile.relationshipType}</p>
                  <p><strong className="text-pink-300">Profession:</strong> {profile.profession}</p>
                </div>
              </div>

              {/* Lifestyle & Beliefs */}
              <div className="bg-black rounded-xl p-5 border border-pink-500">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-pink-400">
                  <Coffee className="text-pink-400" /> Lifestyle & Beliefs
                </h3>
                <div className="space-y-2 text-gray-200">
                  <p><strong className="text-pink-300">Marital Status:</strong> {profile.maritalStatus}</p>
                  <p><strong className="text-pink-300">Has Children:</strong> {profile.hasChildren}</p>
                  <p><strong className="text-pink-300">Wants Children:</strong> {profile.wantsChildren}</p>
                  <p><strong className="text-pink-300">Religion:</strong> {profile.religion}</p>
                  <p><strong className="text-pink-300">Importance:</strong> {profile.religionImportance}</p>
                  <p><strong className="text-pink-300">Nationality:</strong> {profile.nationality}</p>
                  <p><strong className="text-pink-300">Smoking Habits:</strong> {profile.smokingHabits}</p>
                  <p><strong className="text-pink-300">Daily Routine:</strong> {profile.dailyRoutine}</p>
                  <p><strong className="text-pink-300">Diet Preference:</strong> {profile.dietPreference}</p>
                  <p><strong className="text-pink-300">Social Energy:</strong> {profile.socialEnergy}</p>
                  <p><strong className="text-pink-300">Location:</strong> {profile.city}, {profile.country}</p>
                </div>
              </div>

              {/* Personality & Vibe */}
              <div className="bg-black rounded-xl p-5 border border-pink-500">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-pink-400">
                  <Sparkles className="text-pink-400" /> Personality & Vibe
                </h3>
                <div className="space-y-2 text-gray-200">
                  <p><strong className="text-pink-300">Vibe Type:</strong> {profile.vibeType}</p>
                  <p><strong className="text-pink-300">Height:</strong> {profile.height || 'Not specified'}</p>
                  <p><strong className="text-pink-300">About Me:</strong> {profile.aboutMe}</p>
                  <p><strong className="text-pink-300">Bucket List:</strong> {profile.bucketList}</p>
                  <p><strong className="text-pink-300">Interests:</strong></p>
                  <ul className="flex flex-wrap gap-2 mt-1">
                    {profile.interests?.map((interest, idx) => (
                      <li key={idx} className="bg-pink-600 px-3 py-1 rounded-full text-sm text-white">{interest}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-black rounded-xl p-5 border border-pink-500 col-span-2">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-pink-400">
                  <Search className="text-pink-400" /> Preferences
                </h3>
                <div className="space-y-2 text-gray-200">
                  <p><strong className="text-pink-300">Age Range:</strong> {profile.ageRangeMin} - {profile.ageRangeMax}</p>
                  <p><strong className="text-pink-300">Location Preference:</strong> {profile.locationPreference}</p>
                  <p><strong className="text-pink-300">Dealbreakers:</strong></p>
                  <ul className="flex flex-wrap gap-2 mt-1">
                    {profile.dealbreakers?.map((d, idx) => (
                      <li key={idx} className="bg-pink-600 px-3 py-1 rounded-full text-sm text-white">{d}</li>
                    ))}
                    {profile.otherDealbreaker && (
                      <li className="bg-pink-600 px-3 py-1 rounded-full text-sm text-white">{profile.otherDealbreaker}</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-300">Loading profile...</div>
        )}
      </div>
    </div>
  );
};

export default Profile;