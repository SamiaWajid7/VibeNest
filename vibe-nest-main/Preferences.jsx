import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  MapPin,
  Calendar,
  Sparkles,
  X,
  ChevronLeft,
  Check,
} from "lucide-react";
import { Helmet } from 'react-helmet';

const Preferences = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const vibeTypes = [
    "Grounded Soul", "Romantic Dreamer", "Playful Spirit", "Wise Mentor", 
    "Creative Visionary", "Adventurous Explorer", "Peaceful Healer", "Passionate Leader"
  ];

  const dealbreakerOptions = [
    "Smoking", "Addictions", "Dishonesty", "Long-distance", "Different religion", 
    "Has children", "Doesn't want children", "Very different lifestyle", "Poor communication"
  ];

  const interestOptions = [
    "Traveling", "Books", "Fitness", "Music", "Gaming", "Art", "Food", "Movies", "Spirituality", "Fashion"
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return navigate("/login");

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          navigate("/register");
        }
      } catch (error) {
        console.error("Error loading preferences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (type, value) => {
    setUserData(prev => {
      const prevValues = prev[type] || [];
      return {
        ...prev,
        [type]: prevValues.includes(value)
          ? prevValues.filter(v => v !== value)
          : [...prevValues, value]
      };
    });
  };

  const handleSave = async () => {
    if (!userData || !auth.currentUser) return;

    setSaving(true);
    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        ageRangeMin: userData.ageRangeMin,
        ageRangeMax: userData.ageRangeMax,
        locationPreference: userData.locationPreference,
        dealbreakers: userData.dealbreakers || [],
        vibeType: userData.vibeType || "",
        smokingHabits: userData.smokingHabits || "",
        religion: userData.religion || "",
        wantsChildren: userData.wantsChildren || "",
        dailyRoutine: userData.dailyRoutine || "",
        socialEnergy: userData.socialEnergy || "",
        interests: userData.interests || [],
        bucketList: userData.bucketList || "",
        city: userData.city || "",
        country: userData.country || ""
      });
      navigate("/RecommendedPage");
    } catch (err) {
      console.error("Error saving preferences:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading your preferences...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center mb-4">
          <button onClick={() => navigate(-1)} className="mr-3 text-pink-500 hover:text-pink-400">
            <ChevronLeft className="w-6 h-6" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-pink-500">Adjust Preferences</h1>
        </div>

<Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

        {/* AGE RANGE */}
        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="mb-4 text-lg font-semibold text-pink-400 flex items-center">
            <Calendar className="w-5 h-5 mr-2" /> Age Range
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="ageRangeMin"
              placeholder="Min Age"
              value={userData.ageRangeMin || ""}
              onChange={handleInputChange}
              className="bg-gray-800 p-2 rounded border border-gray-600"
              min="18" max="100"
            />
            <input
              type="number"
              name="ageRangeMax"
              placeholder="Max Age"
              value={userData.ageRangeMax || ""}
              onChange={handleInputChange}
              className="bg-gray-800 p-2 rounded border border-gray-600"
              min="18" max="100"
            />
          </div>
        </div>

        {/* LOCATION */}
        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="mb-4 text-lg font-semibold text-pink-400 flex items-center">
            <MapPin className="w-5 h-5 mr-2" /> Location Preference
          </h2>
          <select
            name="locationPreference"
            value={userData.locationPreference || ""}
            onChange={handleInputChange}
            className="w-full bg-gray-800 p-2 rounded border border-gray-600"
          >
            <option value="">Select...</option>
            <option value="local">Local only</option>
            <option value="long-distance">Open to long-distance</option>
            <option value="international">International matches</option>
          </select>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={userData.city || ""}
              onChange={handleInputChange}
              className="bg-gray-800 p-2 rounded border border-gray-600"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={userData.country || ""}
              onChange={handleInputChange}
              className="bg-gray-800 p-2 rounded border border-gray-600"
            />
          </div>
        </div>

        {/* VIBE TYPE */}
        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="mb-4 text-lg font-semibold text-pink-400 flex items-center">
            <Sparkles className="w-5 h-5 mr-2" /> Vibe Type
          </h2>
          <select
            name="vibeType"
            value={userData.vibeType || ""}
            onChange={handleInputChange}
            className="w-full bg-gray-800 p-2 rounded border border-gray-600"
          >
            <option value="">Select your vibe</option>
            {vibeTypes.map(vibe => (
              <option key={vibe} value={vibe}>{vibe}</option>
            ))}
          </select>
        </div>

        {/* DEALBREAKERS */}
        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="mb-4 text-lg font-semibold text-pink-400 flex items-center">
            <X className="w-5 h-5 mr-2" /> Dealbreakers
          </h2>
          <div className="flex flex-wrap gap-3">
            {dealbreakerOptions.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => handleCheckboxChange("dealbreakers", option)}
                className={`px-3 py-1 rounded-full border ${
                  userData.dealbreakers?.includes(option)
                    ? "bg-pink-600 text-white border-pink-400"
                    : "bg-gray-800 text-gray-300 border-gray-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* LIFESTYLE FIELDS */}
        <div className="bg-gray-900 p-6 rounded-xl space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-400">Smoking Habits</label>
            <select
              name="smokingHabits"
              value={userData.smokingHabits || ""}
              onChange={handleInputChange}
              className="w-full bg-gray-800 p-2 rounded border border-gray-600"
            >
              <option value="">Select...</option>
              <option value="never">Never</option>
              <option value="sometimes">Sometimes</option>
              <option value="regularly">Regularly</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-400">Religion</label>
            <input
              type="text"
              name="religion"
              value={userData.religion || ""}
              onChange={handleInputChange}
              className="w-full bg-gray-800 p-2 rounded border border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-400">Wants Children</label>
            <select
              name="wantsChildren"
              value={userData.wantsChildren || ""}
              onChange={handleInputChange}
              className="w-full bg-gray-800 p-2 rounded border border-gray-600"
            >
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="maybe">Maybe</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-400">Daily Routine</label>
            <input
              type="text"
              name="dailyRoutine"
              value={userData.dailyRoutine || ""}
              onChange={handleInputChange}
              className="w-full bg-gray-800 p-2 rounded border border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-400">Social Energy</label>
            <input
              type="text"
              name="socialEnergy"
              value={userData.socialEnergy || ""}
              onChange={handleInputChange}
              className="w-full bg-gray-800 p-2 rounded border border-gray-600"
            />
          </div>
        </div>

        {/* INTERESTS */}
        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="mb-4 text-lg font-semibold text-pink-400">Interests</h2>
          <div className="flex flex-wrap gap-3">
            {interestOptions.map(interest => (
              <button
                key={interest}
                type="button"
                onClick={() => handleCheckboxChange("interests", interest)}
                className={`px-3 py-1 rounded-full border ${
                  userData.interests?.includes(interest)
                    ? "bg-pink-600 text-white border-pink-400"
                    : "bg-gray-800 text-gray-300 border-gray-700"
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* BUCKET LIST */}
        <div className="bg-gray-900 p-6 rounded-xl">
          <label className="block mb-2 text-sm text-gray-400">Bucket List</label>
          <textarea
            name="bucketList"
            value={userData.bucketList || ""}
            onChange={handleInputChange}
            rows="3"
            className="w-full bg-gray-800 p-2 rounded border border-gray-600"
            placeholder="What's something you dream of doing?"
          />
        </div>

        {/* SAVE */}
        <div className="text-center">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-pink-600 hover:bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-medium flex items-center justify-center"
          >
            {saving ? "Saving..." : "Save Preferences"}
            {!saving && <Check className="w-5 h-5 ml-2" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
