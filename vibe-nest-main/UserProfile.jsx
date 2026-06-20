import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { User, Mail, MapPin, Sparkles, Heart, Ruler } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUser(userSnap.data());
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800 text-white text-xl animate-pulse">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800 text-red-400 text-lg">
        User not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 p-4">

   


      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg overflow-hidden">
        {/* Header Section - Pink Background */}
        <div className="bg-pink-500 px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.profilePhotoURL || "/default.png"}
                alt={user.fullName}
                className="w-20 h-20 rounded-full object-cover border-4 border-black"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black">{user.fullName}</h1>
              <p className="text-black text-lg">@{user.username}</p>
              <div className="flex items-center gap-2 mt-1">
                <MapPin size={16} className="text-black" />
                <span className="text-black">{user.city || "Unknown"}</span>
              </div>
            </div>
          </div>
        </div>


        <Helmet>
                <meta name="robots" content="noindex,nofollow" />
              </Helmet>

        {/* Profile Details Grid */}
        <div className="p-6 grid grid-cols-2 gap-4">
          <Detail label="Email" value={user.email} icon={<Mail size={16} />} />
          <Detail label="Gender" value={user.gender} icon={<User size={16} />} />
          <Detail label="Height" value={user.height} icon={<Ruler size={16} />} />
          <Detail label="Religion" value={user.religion} />
          <Detail label="Vibe Type" value={user.vibeType} icon={<Sparkles size={16} />} />
          <Detail label="Relationship Type" value={user.relationshipType} icon={<Heart size={16} />} />
          <Detail label="Wants Children" value={user.wantsChildren} />
          <Detail
            label="Dealbreakers"
            value={user.dealbreakers?.join(", ") || "None"}
          />
        </div>

        {/* Full Width Interests Section */}
        <div className="px-6 pb-6">
          <div className="bg-black p-4 rounded-lg border border-gray-700">
            <div className="text-sm text-pink-400 flex items-center gap-2 mb-2">
              <Sparkles size={16} />
              Interests
            </div>
            <div className="text-white text-base font-medium">
              {user.interests?.join(", ") || "None"}
            </div>
          </div>
        </div>
        

        <div className="px-6 pb-6 flex justify-center">
        <button

          onClick={() => {
            if (!user) return;
            navigate(`/msg/${user.uid}`, { state: { user } })}
          }

          disabled={!user}
          className="w-full md:w-1/3 bg-pink-500 text-black font-bold py-3 rounded-lg hover:bg-pink-600 transition disabled:opacity-50"
        >
          Message
        </button>
      </div>



      </div>
    </div>
  );
};

// Reusable field component with dark black background
const Detail = ({ label, value, icon }) => (
  <div className="bg-black p-4 rounded-lg border border-gray-700">
    <div className="text-sm text-pink-400 flex items-center gap-2 mb-2">
      {icon}
      {label}
    </div>
    <div className="text-white text-base font-medium">
      {value || "N/A"}
    </div>
  </div>
);

export default UserProfile;