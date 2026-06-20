import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import Select from "react-select";
import { Country, City } from "country-state-city";
import {
  Upload,
  User,
  Mail,
  Calendar,
  MapPin,
  Target,
  Sparkles,
} from "lucide-react";

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    city: "",
    country: "",
    relationshipGoals: "",
    interests: [],
    values: [],
    profilePhotoURL: "",
  });
  const [interestInput, setInterestInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [newPhotoFile, setNewPhotoFile] = useState(null);

  const relationshipGoals = [
    "Casual dating",
    "Long-term relationship",
    "Marriage",
    "Friendship",
    "Something serious",
    "Just seeing what's out there",
  ];
  const interestSuggestions = [
    "Travel",
    "Cooking",
    "Music",
    "Movies",
    "Reading",
    "Fitness",
    "Art",
    "Photography",
    "Gaming",
    "Dancing",
    "Hiking",
    "Yoga",
    "Sports",
    "Technology",
    "Fashion",
    "Food",
  ];
  const valueSuggestions = [
    "Honesty",
    "Ambition",
    "Family-Oriented",
    "Spirituality",
    "Kindness",
    "Adventure",
    "Stability",
    "Creativity",
    "Open Communication",
    "Emotional Intelligence",
  ];

  const countryOptions = Country.getAllCountries().map((c) => ({
    label: c.name,
    value: c.isoCode,
  }));

  const cityOptions = formData.country
    ? City.getCitiesOfCountry(formData.country)?.map((city) => ({
        label: city.name,
        value: city.name,
      })) || []
    : [];

  useEffect(() => {
    const fetchProfile = async () => {
      const ref = doc(db, "users", user.uid, "profile", "info");
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setFormData(snap.data());
      }
      setLoading(false);
    };

    if (user) fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addInterest = (interest) => {
    if (!formData.interests.includes(interest)) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, interest],
      }));
    }
    setInterestInput("");
  };

  const removeInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const addValue = (val) => {
    if (!formData.values.includes(val)) {
      setFormData((prev) => ({
        ...prev,
        values: [...prev.values, val],
      }));
    }
    setValueInput("");
  };

  const removeValue = (val) => {
    setFormData((prev) => ({
      ...prev,
      values: prev.values.filter((v) => v !== val),
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setNewPhotoFile(file);
  };

  const uploadToCloudinary = async (file) => {
    const cloudName = "dpvsmzplh";
    const unsignedPreset = "unsigned_preset";
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", unsignedPreset);
    fd.append("folder", "profile_photos");

    const res = await fetch(url, { method: "POST", body: fd });
    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedData = { ...formData };

    if (newPhotoFile) {
      const photoURL = await uploadToCloudinary(newPhotoFile);
      updatedData.profilePhotoURL = photoURL;
    }

    const ref = doc(db, "users", user.uid, "profile", "info");
    await updateDoc(ref, updatedData);
    alert("Profile updated successfully!");
    navigate("/profile");
  };

  if (loading) return <p className="text-white text-center">Loading...</p>;

  return (
    <div className="min-h-screen w-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl text-pink-500 font-bold mb-6 text-center">
          Edit Profile
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 rounded-xl p-6 space-y-6 border border-gray-800"
        >
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
              />
            </div>
          </div>

          {/* Age */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          {/* Country and City */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-pink-500" /> Country
            </label>
            <Select
              options={countryOptions}
              value={countryOptions.find((c) => c.value === formData.country)}
              onChange={(selected) =>
                setFormData((prev) => ({
                  ...prev,
                  country: selected.value,
                  city: "",
                }))
              }
              placeholder="Select country"
              className="text-black"
            />

            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-pink-500" /> City
            </label>
            <Select
              options={cityOptions}
              value={
                formData.city
                  ? { label: formData.city, value: formData.city }
                  : null
              }
              onChange={(selected) =>
                setFormData((prev) => ({ ...prev, city: selected.value }))
              }
              placeholder="Select city"
              isDisabled={!formData.country}
              className="text-black"
            />
          </div>

          {/* Relationship Goals */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Relationship Goals
            </label>
            <select
              name="relationshipGoals"
              value={formData.relationshipGoals}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
            >
              <option value="">Select goal</option>
              {relationshipGoals.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Interests
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.interests.map((i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-pink-900 text-pink-200 flex items-center"
                >
                  {i}
                  <button
                    type="button"
                    onClick={() => removeInterest(i)}
                    className="ml-2 text-pink-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                placeholder="Add interest"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
              />
              <button
                type="button"
                onClick={() => {
                  if (interestInput.trim()) addInterest(interestInput.trim());
                }}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </div>

          {/* Values */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Values</label>
            <div className="flex flex-wrap gap-2">
              {formData.values.map((v) => (
                <span
                  key={v}
                  className="px-3 py-1 rounded-full bg-purple-900 text-purple-200 flex items-center"
                >
                  {v}
                  <button
                    type="button"
                    onClick={() => removeValue(v)}
                    className="ml-2 text-purple-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                placeholder="Add value"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
              />
              <button
                type="button"
                onClick={() => {
                  if (valueInput.trim()) addValue(valueInput.trim());
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </div>

          {/* Profile Photo */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full text-white"
            />
            {formData.profilePhotoURL && (
              <img
                src={formData.profilePhotoURL}
                alt="Profile"
                className="w-24 h-24 rounded-full mt-2 object-cover"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-pink-600 text-white rounded-lg mt-4"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
