import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, getDoc,setDoc } from "firebase/firestore";
import { db, auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { Heart, User, MapPin, Sparkles, X } from "lucide-react";
import { Helmet } from 'react-helmet';

const RecommendedPage = () => {
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
  const fetchCurrentUser = async () => {
    const user = auth.currentUser;
    if (!user) return navigate("/login");

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) return navigate("/register");

    const userData = userDoc.data();
    setCurrentUser(userData);
    fetchRecommendedUsers(userData, setRecommendedUsers, setLoading);
  };

  fetchCurrentUser();
}, []);



// Utility: Get subcollection IDs (for passes/matches)
const getUserIdsFromSubcollection = async (uid, subcollection) => {
  const snapshot = await getDocs(collection(db, "users", uid, subcollection));
  return snapshot.docs.map(doc => doc.id);
};

const savePass = async (currentUserId, passedUserId) => {
  try {
    await setDoc(doc(db, "users", currentUserId, "soul match", passedUserId), {
      status: "passed",
      passedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("❌ Failed to save pass:", err);
  }
};

const getUserIdsFromSoulMatch = async (uid, status) => {
  const snapshot = await getDocs(collection(db, "users", uid, "soul match"));
  return snapshot.docs
    .filter(doc => doc.data().status === status)
    .map(doc => doc.id);
};

    const fetchRecommendedUsers = async (userData) => {
    try {
       const passedUserIds = await getUserIdsFromSoulMatch(userData.uid, "passed");

const matchSnapshot = await getDocs(collection(db, "users", userData.uid, "soul match"));

const excludedUserIds = new Set(
  matchSnapshot.docs
    .filter(doc => doc.data().status === "passed")
    .map(doc => doc.id)
);

excludedUserIds.add(userData.uid);

      const filters = [
        where("gender", "in", ["male", "female"]),
        where("gender", "!=", userData.gender)
      ];

      if (userData.locationPreference === "local" && userData.city && userData.country) {
        filters.push(where("city", "==", userData.city));
        filters.push(where("country", "==", userData.country));
      }

      if (userData.ageRangeMin && userData.ageRangeMax) {
        const currentYear = new Date().getFullYear();
        const minYear = currentYear - userData.ageRangeMax;
        const maxYear = currentYear - userData.ageRangeMin;
        filters.push(where("dateOfBirth", ">=", `${minYear}-01-01`));
        filters.push(where("dateOfBirth", "<=", `${maxYear}-12-31`));
      }

      const snapshot = await getDocs(query(collection(db, "users"), ...filters));

      const candidates = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => !excludedUserIds.has(user.id))
        .map(user => {
          let score = 0;
          let sharedInterests = 0;

          if (userData.interests && user.interests) {
            sharedInterests = userData.interests.filter(i => user.interests.includes(i)).length;
            score += sharedInterests * 5;
          }

          if (user.vibeType === userData.vibeType) score += 30;

          if (userData.bucketList && user.bucketList) {
            const words = userData.bucketList.toLowerCase().split(/\s+/);
            const matched = words.filter(w => user.bucketList.toLowerCase().includes(w));
            score += matched.length * 2;
          }

          if (user.wantsChildren === userData.wantsChildren) score += 10;
          if (user.religion === userData.religion) score += 8;
          if (user.dailyRoutine === userData.dailyRoutine) score += 5;
          if (user.socialEnergy === userData.socialEnergy) score += 5;

          return {
            ...user,
            compatibilityScore: Math.min(100, score),
            sharedInterestsCount: sharedInterests,
          };
        })
        .filter(user => user.compatibilityScore >= 20)
        .sort((a, b) => b.compatibilityScore - a.compatibilityScore);

      setRecommendedUsers(candidates);

await Promise.all(
  candidates.map((user) =>
    setDoc(doc(db, "users", userData.uid, "soul match", user.id), {
      status: "recommended",
      recommendedAt: new Date().toISOString(),
      compatibilityScore: user.compatibilityScore,
    }, { merge: true }) // optional: avoids overwriting if already passed
  )
);


    } catch (error) {
      console.error("🔥 Failed to fetch recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

   const handlePass = async (userId) => {
    if (!currentUser?.uid) return;
    await savePass(currentUser.uid, userId);
    setRecommendedUsers(prev => prev.filter(user => user.id !== userId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Finding your best matches...</div>
      </div>
    );
  }

  if (recommendedUsers.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        
        <div className="text-center text-white p-6 max-w-md">
        <div className="bg-black border-b border-pink-500/20">
<div className="px-6 py-4">
          <div className="flex items-center justify-between">
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
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-4 h-4 text-white" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6H8a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H8a1 1 0 010-2h1v-1a1 1 0 011-1zM5 9a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1zm0 5a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

<Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <br></br> <br></br> <br></br>
          
          <h2 className="text-2xl font-bold text-pink-500 mb-4">No matches found</h2>
          <p>We couldn't find users matching your preferences.</p>
          <button 
            onClick={() => navigate("/preferences")}
            className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-500"
          >
            Adjust Preferences
          </button>
        </div>
      </div>
    );
  }

   return (
    <div className="min-h-screen bg-black text-white p-4">

<div className="bg-black border-b border-pink-500/20">
<div className="px-6 py-4">
          <div className="flex items-center justify-between">
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
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-4 h-4 text-white" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6H8a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H8a1 1 0 010-2h1v-1a1 1 0 011-1zM5 9a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1zm0 5a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br></br> <br></br> <br></br>

      <div className="max-w-4xl mx-auto">
<div className="flex justify-between items-center mb-10">
<h1 className="text-4xl font-bold text-pink-500 text-center w-full tracking-wide drop-shadow-lg hover:scale-105 transition-transform duration-300 mb-2">
  Your Best Matches
</h1>


  <button
    onClick={() => navigate("/preferences")}
    className="absolute top-24 right-6 bg-gray-800 text-pink-300 hover:text-white px-4 py-2 rounded-full border border-pink-500 text-sm shadow-lg"
  >
    Adjust Preferences
  </button>
</div>        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedUsers.map((user) => (
<div
  key={user.id}
  className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-800 hover:border-pink-500 transition-all duration-300 group"
>
  <div className="relative h-64 bg-gray-800">
    {user.profilePhotoURL ? (
      <img
        src={user.profilePhotoURL}
        alt={user.fullName}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gray-700">
        <User className="h-20 w-20 text-pink-400" />
      </div>
    )}
    <div className="absolute top-3 right-3 flex flex-col items-end space-y-2">
      <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm flex items-center shadow-md">
        <Sparkles className="w-3 h-3 mr-1" />
        {user.compatibilityScore}%
      </span>
    </div>
  </div>

  <div className="p-5">
    <div className="flex justify-between items-start mb-3">
      <h2 className="text-xl font-bold truncate">
        {user.fullName}, {new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear()}
      </h2>
      <span className="text-pink-400 text-sm font-medium">{user.vibeType}</span>
    </div>

     <div className="flex items-center text-gray-300 text-sm mb-3">
      <MapPin className="w-4 h-4 mr-1" />
      <span>{user.city}, {user.country}</span>
    </div>

 <p className="text-sm text-gray-300 mb-4 line-clamp-3 italic">
      “{user.aboutMe}”
    </p>

    {user.sharedInterestsCount > 0 && (
      <div className="mb-4">
        <div className="flex items-center text-sm text-pink-400 mb-2 font-medium">
          <Heart className="w-4 h-4 mr-1" />
          {user.sharedInterestsCount} shared interests
        </div>
        <div className="flex flex-wrap gap-2">
          {currentUser?.interests
            ?.filter(interest => user.interests?.includes(interest))
            .slice(0, 4)
            .map(interest => (
              <span
                key={interest}
                className="bg-pink-800/40 text-pink-200 px-3 py-1 rounded-full text-xs font-medium"
              >
                {interest}
              </span>
            ))}
        </div>
      </div>
    )}


    <div className="flex justify-between mt-4">
      <button
        onClick={() => handlePass(user.id)}
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full flex items-center text-sm transition"
      >
        <X className="w-4 h-4 mr-1" /> Pass
      </button>
      <button
        onClick={() => navigate(`/users/${user.id}/profile`)}
        className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-full flex items-center text-sm transition"
      >
        <User className="w-4 h-4 mr-1" /> View
      </button>
    </div>
  </div>
</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedPage;