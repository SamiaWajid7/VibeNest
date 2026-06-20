
// import { useNavigate } from "react-router-dom";
// import { doc, setDoc } from "firebase/firestore"; 
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../services/firebase";
// import React, { useState } from "react";
// import Select from "react-select";
// import AsyncSelect from "react-select/async";

// import { Country, City } from "country-state-city";

// import {
//   Eye,
//   EyeOff,
//   Upload,
//   Heart,
//   User,
//   Mail,
//   MapPin,
//   Calendar,
//   Target,
//   Sparkles,
//   Users,
//   Home,
//   Coffee,
//   Star,
//   Search,
// } from "lucide-react";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     // Step 1: Basic Information
//     fullName: "",
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     dateOfBirth: "",
//     gender: "",
//     preferredPronouns: "",
    
//     // Step 2: Identity & Intentions
//     openToLongDistance: "",
//     relationshipType: "",
//     profession: "",
    
//     // Step 3: Lifestyle & Beliefs
//     maritalStatus: "",
//     hasChildren: "",
//     wantsChildren: "",
//     religion: "",
//     religionImportance: "",
//     country: "",
//     city: "",
//     nationality: "",
//     smokingHabits: "",
//     dailyRoutine: "",
//     dietPreference: "",
//     socialEnergy: "",
    
//     // Step 4: Personality & Vibe
//     vibeType: "",
//     aboutMe: "",
//     interests: [],
//     bucketList: "",
//     height: "",
//     profilePhoto: null,
    
//     // Step 5: Preferences
//     ageRangeMin: "",
//     ageRangeMax: "",
//     preferredReligion: "",
//     preferredMaritalStatus: "",
//     preferredChildrenSituation: "",
//     preferredVibeTypes: [],
//     locationPreference: "",
//     dealbreakers: [],
//     otherDealbreaker: "",
//   });

//   const [dobError, setDobError] = useState("");
//   const [ageError, setAgeError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [interestInput, setInterestInput] = useState("");
//   const [dealbreakerInput, setDealbreakerInput] = useState("");

//   const isPasswordValid = (password) => {
//     const lengthCheck = password.length >= 8;
//     const uppercaseCheck = /[A-Z]/.test(password);
//     const lowercaseCheck = /[a-z]/.test(password);
//     const numberCheck = /[0-9]/.test(password);
//     const symbolCheck = /[^A-Za-z0-9]/.test(password);
//     return lengthCheck && uppercaseCheck && lowercaseCheck && numberCheck && symbolCheck;
//   };

//   const loadCityOptions = (inputValue, callback) => {
//     if (!formData.country) {
//       callback([]);
//       return;
//     }

//     const allCities = City.getCitiesOfCountry(formData.country) || [];

//     const filtered = allCities
//       .filter((city) =>
//         city.name.toLowerCase().startsWith(inputValue.toLowerCase())
//       )
//       .map((city) => ({
//         label: city.name,
//         value: city.name,
//       }));

//     // Limit to first 100 matches for safety
//     callback(filtered.slice(0, 100));
//   };

//   const interestSuggestions = [
//     "Music", "Books", "Travel", "Meditation", "Fitness", "Art", "Photography", 
//     "Cooking", "Movies", "Gaming", "Dancing", "Hiking", "Yoga", "Sports", 
//     "Technology", "Fashion", "Nature", "Spirituality", "Writing", "Adventure"
//   ];

//   const relationshipTypes = [
//     "Romantic", "Soulful Friendship", "Emotional Support", "Marriage", "Not Sure Yet"
//   ];

//   const maritalStatuses = [
//     "Single", "Divorced", "Widowed", "Separated", "It's complicated"
//   ];

//   const religions = [
//     "Islam", "Christianity", "Hinduism", "Buddhism", "Judaism", "Sikhism", 
//     "Atheist", "Agnostic", "Spiritual but not religious", "Other", "Prefer not to say"
//   ];

//   const vibeTypes = [
//     "Romantic Idealist","Practical Realist","Fearful Avoidant","Caregiver / Nurturer","Shy"
//   ];

//   const dealbreakerOptions = [
//     "Smoking", "Addictions", "Dishonesty", "Long-distance", "Different religion", 
//     "Has children", "Doesn't want children", "Very different lifestyle", "Poor communication"
//   ];

//   const validateDOB = (dateString) => {
//     const today = new Date();
//     const inputDate = new Date(dateString);
//     return inputDate <= today;
//   };

//   const countryOptions = Country.getAllCountries().map((country) => ({
//     label: country.name,
//     value: country.isoCode,
//   }));

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const addDealbreaker = (dealbreaker) => {
//   setFormData((prev) => {
//     const exists = prev.dealbreakers.includes(dealbreaker);
//     return {
//       ...prev,
//       dealbreakers: exists
//         ? prev.dealbreakers.filter((d) => d !== dealbreaker)
//         : [...prev.dealbreakers, dealbreaker],
//     };
//   });
// };

// const handleAddCustomDealbreaker = () => {
//   const custom = formData.otherDealbreaker?.trim();
//   if (
//     custom &&
//     !formData.dealbreakers.includes(custom) &&
//     !dealbreakerOptions.includes(custom)
//   ) {
//     setFormData((prev) => ({
//       ...prev,
//       dealbreakers: [...prev.dealbreakers, custom],
//       otherDealbreaker: "", // clear field
//     }));
//   }
// };

//   const addInterest = (interest) => {
//     if (!formData.interests.includes(interest)) {
//       setFormData((prev) => ({ ...prev, interests: [...prev.interests, interest] }));
//     }
//     setInterestInput("");
//   };

//   const removeInterest = (interest) => {
//     setFormData((prev) => ({ ...prev, interests: prev.interests.filter((i) => i !== interest) }));
//   };


//   const removeDealbreaker = (dealbreaker) => {
//     setFormData((prev) => ({ ...prev, dealbreakers: prev.dealbreakers.filter((d) => d !== dealbreaker) }));
//   };

//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prev) => ({ ...prev, profilePhoto: file }));
//     }
//   };

//   const uploadToCloudinary = async (file) => {
//     const cloudName = "dpvsmzplh";
//     const unsignedPreset = "unsigned_preset";
//     const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", unsignedPreset);
//     formData.append("folder", "profile_photos");

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();
//       return data.secure_url;
//     } catch (error) {
//       console.error("Cloudinary Upload Error:", error);
//       return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!canGoNext()) {
//       alert("Please fill in all required fields before submitting.");
//       return;
//     }

//     if (!isPasswordValid(formData.password)) {
//       alert("Your password is too weak. Please use a stronger one.");
//       return;
//     }

//     const { profilePhoto, ...cleanedData } = {
//       ...formData,
//       fullName: formData.fullName.trim(),
//       username: formData.username.trim(),
//       email: formData.email.trim(),
//       city: formData.city.trim(),
//       country: formData.country.trim(),
//     };

//     try {
//       const res = await createUserWithEmailAndPassword(
//         auth,
//         cleanedData.email,
//         formData.password
//       );
//       const user = res.user;

//       const photoURL = await uploadToCloudinary(profilePhoto);
      
//       // Explicitly remove sensitive or unnecessary fields
//       const { password, confirmPassword, profilePhoto: _, ...safeData } = formData;

//       await setDoc(doc(db, "users", user.uid), {
//         uid: user.uid,
//         ...safeData,
//         profilePhotoURL: photoURL || null,
//       });

//       alert("Registration successful!");
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Registration error:", error);
//       alert(error.message);
//     }
//   };

//   const nextStep = () => {
//     if (!canGoNext()) {
//       alert("Please fill in all required fields before continuing.");
//       return;
//     }
//     setCurrentStep((prev) => Math.min(prev + 1, 5));
//   };

//   const prevStep = () => {
//     setCurrentStep((prev) => Math.max(prev - 1, 1));
//   };

//   const canGoNext = () => {
//     switch (currentStep) {
//       case 1:
//          // Check if DOB is valid (18-100 years old)
//       if (formData.dateOfBirth) {
//         const dob = new Date(formData.dateOfBirth);
//         const today = new Date();
//         let age = today.getFullYear() - dob.getFullYear(); // Changed to 'let'
        
//         // Adjust for month/day (e.g., if birthday hasn't happened yet this year)
//         const monthDiff = today.getMonth() - dob.getMonth();
//         if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
//           age--; // Now this works because 'age' is mutable
//         }
        
//         if (age < 18) {
//           setDobError("You must be at least 18 years old.");
//           return false;
//         } else if (age > 100) {
//           setDobError("Please enter a valid age (under 100).");
//           return false;
//         }
//       }
//         return (
//           formData.fullName.trim() !== "" &&
//           formData.username.trim() !== "" &&
//           formData.email.trim() !== "" &&
//           formData.password &&
//           formData.confirmPassword &&
//           formData.dateOfBirth &&
//           formData.gender &&
//           formData.preferredPronouns &&
//           isPasswordValid(formData.password) &&
//           formData.password === formData.confirmPassword
//         );
//       case 2:
//         return (
//           formData.openToLongDistance &&
//           formData.relationshipType &&
//           formData.profession.trim() !== ""
//         );
//       case 3:
//         return (
//           formData.maritalStatus &&
//           formData.hasChildren &&
//           formData.wantsChildren &&
//           formData.religion &&
//           formData.religionImportance &&
//           formData.country &&
//           formData.city &&
//           formData.nationality.trim() !== "" &&
//           formData.smokingHabits &&
//           formData.dailyRoutine &&
//           formData.dietPreference.trim() !== "" &&
//           formData.socialEnergy
//         );
//       case 4:
//         return (
//           formData.vibeType &&
//           formData.aboutMe.trim() !== "" &&
//           formData.interests.length > 0 &&
//           formData.bucketList.trim() !== "" &&
//           formData.profilePhoto
//         );
//       case 5:
//         // Age validation
//       const minAge = parseInt(formData.ageRangeMin);
//       const maxAge = parseInt(formData.ageRangeMax);
      
//       if (isNaN(minAge)) {
//         setAgeError("Please enter minimum age");
//         return false;
//       }
//       if (isNaN(maxAge)) {
//         setAgeError("Please enter maximum age");
//         return false;
//       }
//       if (minAge < 18 || minAge > 100) {
//         setAgeError("Minimum age must be between 18-100");
//         return false;
//       }
//       if (maxAge < 18 || maxAge > 100) {
//         setAgeError("Maximum age must be between 18-100");
//         return false;
//       }
//       if (minAge > maxAge) {
//         setAgeError("Minimum age cannot be greater than maximum age");
//         return false;
//       }
//         return (
//           formData.ageRangeMin &&
//           formData.ageRangeMax &&
//           formData.locationPreference &&
//           formData.dealbreakers.length > 0
//         );
//       default:
//         return true;
//     }
//   };

//   const getStepTitle = () => {
//     switch (currentStep) {
//       case 1: return "Basic Information";
//       case 2: return "Identity & Intentions";
//       case 3: return "Lifestyle & Beliefs";
//       case 4: return "Personality & Vibe";
//       case 5: return "Preferences";
//       default: return "Registration";
//     }
//   };

//   return (
//     <div className="min-h-screen w-screen bg-black flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-2xl">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-pink-500 mb-2"> Vibe nest</h1>
//           <p className="text-white text-lg">Sync Hearts • Share Vibes</p>
//           <p className="text-gray-400 mt-2">
//           Find your vibe, share your story, and grow closer. One perfect match at a time. Welcome to Vibe nest!!
//           </p>
//         </div>

        
        
  
//         {/* Form */}
//         <form
//   onSubmit={handleSubmit}
//   onKeyDown={(e) => {
//     if (e.key === "Enter") {
//       const tag = e.target.tagName.toLowerCase();
//       const type = e.target.type?.toLowerCase();
//       if (tag !== "textarea" && type !== "submit") {
//         e.preventDefault(); // ✅ Block Enter-based submission
//       }
//     }
//   }}
// >
//             <h2 className="text-2xl text-white font-semibold mb-4">{getStepTitle()}</h2>
  
//           {/* Step 1: Basic Information */}
//           {currentStep === 1 && (
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-white">Full Name *</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <User className="h-5 w-5 text-pink-300" />
//                   </div>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Enter your full name"
//                     className="w-full pl-10 pr-4 py-3 rounded-lg bg-black text-white border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-white">Username / Handle *</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <span className="text-pink-300">@</span>
//                   </div>
//                   <input
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Choose a unique username"
//                     className="w-full pl-10 pr-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-white">Email Address *</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="h-5 w-5 text-pink-300" />
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Enter your email"
//                     className="w-full pl-10 pr-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-white">Password *</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-pink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                     </svg>
//                   </div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Create a secure password"
//                     className="w-full pl-10 pr-10 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-300 hover:text-white"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 {formData.password && !isPasswordValid(formData.password) && (
//                   <p className="text-sm text-pink-200 mt-1">
//                     Password must be at least <strong>8 characters</strong> with <strong>uppercase</strong>, <strong>lowercase</strong>, <strong>numbers</strong>, and <strong>symbols</strong>.
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-white">Confirm Password *</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-pink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                     </svg>
//                   </div>
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Confirm your password"
//                     className="w-full pl-10 pr-10 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-300 hover:text-white"
//                   >
//                     {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 {formData.confirmPassword && formData.password !== formData.confirmPassword && (
//                   <p className="text-sm text-pink-200 mt-1">Passwords do not match.</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//   <label className="text-sm font-medium text-white">Date of Birth *</label>
//  <div className="relative w-full">
//   {/* Calendar Icon */}
//   <svg
//     className="absolute left-3 top-3 w-5 h-5 text-pink-400 pointer-events-none"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2
//       2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//     />
//   </svg>

//     <input
//       type="date"
//       name="dateOfBirth"
//       max={new Date().toISOString().split("T")[0]} // no future DOB
//       value={formData.dateOfBirth}
//       onChange={(e) => {
//         const dob = new Date(e.target.value);
//         const today = new Date();

//         // Calculate age
//         let age = today.getFullYear() - dob.getFullYear();
//         const m = today.getMonth() - dob.getMonth();
//         if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
//           age--;
//         }

//         // Error handling
//         if (dob > today) {
//           setDobError("Date of birth cannot be in the future.");
//           return;
//         } else if (age < 18) {
//           setDobError("You must be at least 18 years old.");
//           return;
//         } else if (age > 100) {
//           setDobError("Please enter a valid age (under 100).");
//           return;
//         }

//         // If valid
//         setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }));
//         setDobError(""); // clear errors
//       }}
//       required
//       className={`w-full pl-10 pr-4 py-3 rounded-lg bg-black border ${
//         dobError ? "border-red-500" : "border-gray-700"
//       } text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500`}
//     />
//   </div>

//   {dobError && (
//     <p className="text-red-400 text-sm mt-1">{dobError}</p>
//   )}
// </div>


//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-white">Gender *</label>
//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
//                   >
//                     <option value="" className="text-gray-400">Select gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="prefer-not-to-say">Prefer not to say</option>
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-white">Preferred Pronouns *</label>
//                   <select
//                     name="preferredPronouns"
//                     value={formData.preferredPronouns}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
//                   >
//                     <option value="" className="text-gray-400">Select pronouns</option>
//                     <option value="he/him">He/Him</option>
//                     <option value="she/her">She/Her</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Identity & Intentions */}
//           {currentStep === 2 && (
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-white">Are you open to long-distance connections? *</label>
//                 <div className="flex gap-4">
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="openToLongDistance"
//                       value="yes"
//                       checked={formData.openToLongDistance === "yes"}
//                       onChange={handleInputChange}
//                       className="mr-2 text-pink-500"
//                     />
//                     <span className="text-white">Yes</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="openToLongDistance"
//                       value="no"
//                       checked={formData.openToLongDistance === "no"}
//                       onChange={handleInputChange}
//                       className="mr-2 text-pink-500"
//                     />
//                     <span className="text-white">No</span>
//                   </label>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-white">Relationship Type *</label>
//                 <select
//                   name="relationshipType"
//                   value={formData.relationshipType}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
//                 >
//                   <option value="" className="text-gray-400">What are you looking for?</option>
//                   {relationshipTypes.map((type) => (
//                     <option key={type} value={type}>{type}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-white">Profession / Work Field *</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Target className="h-5 w-5 text-pink-300" />
//                   </div>
//                   <input
//                     type="text"
//                     name="profession"
//                     value={formData.profession}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="What do you do for work?"
//                     className="w-full pl-10 pr-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 3: Lifestyle & Beliefs */}
//           {currentStep === 3 && (
//             <div className="space-y-4">
//               {/* Marital Status and Has Children */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-white">Marital Status *</label>
//                   <select
//                     name="maritalStatus"
//                     value={formData.maritalStatus}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
//                   >
//                     <option value="" className="text-gray-400">Select status</option>
//                     {maritalStatuses.map((status) => (
//                       <option key={status} value={status}>
//                         {status}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-white">Do you have children? *</label>
//                   <select
//                     name="hasChildren"
//                     value={formData.hasChildren}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
//                   >
//                     <option value="" className="text-gray-400">Select</option>
//                     <option value="yes">Yes</option>
//                     <option value="no">No</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Wants Children and Religion */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-white">Do you want children? *</label>
//                   <select
//                     name="wantsChildren"
//                     value={formData.wantsChildren}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
//                   >
//                     <option value="" className="text-gray-400">Select</option>
//                     <option value="yes">Yes</option>
//                     <option value="no">No</option>
//                     <option value="maybe">Maybe</option>
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-white">Religion / Spiritual Belief *</label>
//                   <select
//                     name="religion"
//                     value={formData.religion}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
//                   >
//                     <option value="" className="text-gray-400">Select religion</option>
//                     {religions.map((religion) => (
//                       <option key={religion} value={religion}>
//                         {religion}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Religion Importance */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-white">How important is religion to you? *</label>
//                 <select
//                   name="religionImportance"
//                   value={formData.religionImportance}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
//                 >
//                   <option value="" className="text-gray-400">Select importance</option>
//                   <option value="not-important">Not Important</option>
//                   <option value="somewhat">Somewhat Important</option>
//                   <option value="very-important">Very Important</option>
//                 </select>
//               </div>

//               {/* Country and City */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-white flex items-center gap-2">
//                     <MapPin className="w-4 h-4 text-pink-300" />
//                     Country *
//                   </label>
//                   <Select
//                     options={countryOptions}
//                     value={countryOptions.find((c) => c.value === formData.country) || null}
//                     onChange={(selected) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         country: selected?.value || "",
//                         city: "",
//                       }))
//                     }
//                     placeholder="Select your country"
//                     className="mt-2"
//                     styles={{
//                       control: (base) => ({
//                         ...base,
//                         backgroundColor: '#000',
//                         borderColor: '#333',
//                         color: 'white',
//                       }),
//                       singleValue: (base) => ({
//                         ...base,
//                         color: 'white',
//                       }),
//                       input: (base) => ({
//                         ...base,
//                         color: 'white',
//                       }),
//                       placeholder: (base) => ({
//                         ...base,
//                         color: '#f9a8d4',
//                       }),
//                       menu: (base) => ({
//                         ...base,
//                         backgroundColor: '#000',
//                         borderColor: '#333',
//                       }),
//                       option: (base, state) => ({
//                         ...base,
//                         backgroundColor: state.isFocused ? '#333' : '#000',
//                         color: 'white',
//                       }),
//                     }}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-white flex items-center gap-2">
//                     <MapPin className="w-4 h-4 text-pink-300" />
//                     City *
//                   </label>
//                   <AsyncSelect
//                     cacheOptions
//                     loadOptions={loadCityOptions}
//                     defaultOptions
//                     value={
//                       formData.city
//                         ? { label: formData.city, value: formData.city }
//                         : null
//                     }
//                     onChange={(selected) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         city: selected?.value || "",
//                       }))
//                     }
//                     placeholder="Type to search your city"
//                     className="mt-2"
//                     styles={{
//                       control: (base) => ({
//                         ...base,
//                         backgroundColor: '#000',
//                         borderColor: '#333',
//                         color: 'white',
//                       }),
//                       singleValue: (base) => ({
//                         ...base,
//                         color: 'white',
//                       }),
//                       input: (base) => ({
//                         ...base,
//                         color: 'white',
//                       }),
//                       placeholder: (base) => ({
//                         ...base,
//                         color: '#f9a8d4',
//                       }),
//                       menu: (base) => ({
//                         ...base,
//                         backgroundColor: '#000',
//                         borderColor: '#333',
//                       }),
//                       option: (base, state) => ({
//                         ...base,
//                         backgroundColor: state.isFocused ? '#333' : '#000',
//                         color: 'white',
//                       }),
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Nationality */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-white">Nationality *</label>
//                 <input
//                   type="text"
//                   name="nationality"
//                   value={formData.nationality}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
//                   placeholder="Enter your nationality"
//                 />
//               </div>

//               {/* Smoking Habits, Daily Routine, Diet Preference, Social Energy */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-white">Smoking Habits *</label>
//                   <select
//                     name="smokingHabits"
//                     value={formData.smokingHabits}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
//                   >
//                     <option value="" className="text-gray-400">Select</option>
//                     <option value="never">Never</option>
//                     <option value="sometimes">Sometimes</option>
//                     <option value="regularly">Regularly</option>
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-white">Daily Routine *</label>
//                   <select
//                     name="dailyRoutine"
//                     value={formData.dailyRoutine}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
//                   >
//                     <option value="" className="text-gray-400">Select</option>
//                     <option value="early-bird">Early Bird</option>
//                     <option value="night-owl">Night Owl</option>
//                     <option value="flexible">Flexible</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-white">Diet Preference *</label>
//                   <input
//                     type="text"
//                     name="dietPreference"
//                     value={formData.dietPreference}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
//                     placeholder="E.g., Vegetarian, Vegan"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-white">Social Energy *</label>
//                   <select
//                     name="socialEnergy"
//                     value={formData.socialEnergy}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
//                   >
//                     <option value="" className="text-gray-400">Select</option>
//                     <option value="introvert">Introvert</option>
//                     <option value="ambivert">Ambivert</option>
//                     <option value="extrovert">Extrovert</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 4: Personality & Vibe */}
//           {currentStep === 4 && (
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-white">Know Your Vibe *</label>
//                 <select
//                   name="vibeType"
//                   value={formData.vibeType}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
//                 >
//                   <option value="" className="text-gray-400">Select your vibe</option>
//                   {vibeTypes.map((vibe) => (
//                     <option key={vibe} value={vibe}>{vibe}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-white">Short "About Me" Bio *</label>
//                 <textarea
//                   name="aboutMe"
//                   value={formData.aboutMe}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="I'm a passionate artist who..."
//                   className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400"
//                 />
//               </div>

// <div className="space-y-2">
//   <label className="text-sm font-medium text-white">Hobbies & Interests *</label>

//   {/* Suggestion Buttons */}
//   <div className="flex flex-wrap gap-2">
//     {interestSuggestions.map((interest) => (
//       <button
//         key={interest}
//         type="button"
//         onClick={() => addInterest(interest)}
//         className={`px-3 py-1 rounded-full border ${
//           formData.interests.includes(interest)
//             ? "bg-pink-600 text-white border-pink-500"
//             : "bg-black text-pink-200 border-gray-700 hover:bg-gray-800 hover:text-white"
//         }`}
//       >
//         {interest}
//       </button>
//     ))}
//   </div>

//   {/* Manual Input + Add Button */}
//   <div className="flex gap-2 mt-3">
//     <input
//       type="text"
//       value={interestInput}
//       onChange={(e) => setInterestInput(e.target.value)}
//       placeholder="Add your own interest"
//       className="flex-1 px-4 py-2 rounded-lg bg-black border border-gray-700 text-white"
//     />
//     <button
//       type="button"
//       onClick={() => {
//         const trimmed = interestInput.trim();
//         if (trimmed && !formData.interests.includes(trimmed)) {
//           addInterest(trimmed);
//           setInterestInput(""); // clear input after adding
//         }
//       }}
//       className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-500"
//     >
//       Add
//     </button>
//   </div>

//   {/* Selected Interests Display */}
//   {formData.interests.length > 0 && (
//     <div className="flex flex-wrap gap-2 mt-4">
//       {formData.interests.map((i) => (
//         <span
//           key={i}
//           className="bg-pink-600 text-white px-3 py-1 rounded-full flex items-center"
//         >
//           {i}
//           <button
//             onClick={() => removeInterest(i)}
//             className="ml-2 text-white hover:text-pink-200"
//           >
//             &times;
//           </button>
//         </span>
//       ))}
//     </div>
//   )}
// </div>


//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-white">Bucket List / Life Vision *</label>
//                 <textarea
//                   name="bucketList"
//                   value={formData.bucketList}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="What are you hoping to experience in this life?"
//                   className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-white">Height (Optional)</label>
//                 <input
//                   type="text"
//                   name="height"
//                   value={formData.height}
//                   onChange={handleInputChange}
//                   placeholder="e.g., 5'11''"
//                   className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-white">Profile Photo *</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handlePhotoUpload}
//                   required
//                   className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white"
//                 />
//               </div>
//             </div>
//           )}

//           {/* Step 5: Preferences */}
//           {currentStep === 5 && (
            
//             //   <div className="grid grid-cols-2 gap-4">
//             //     <div className="space-y-2">
//             //       <label className="text-sm font-medium text-white">Age Range Min *</label>
//             //       <input
//             //         type="number"
//             //         name="ageRangeMin"
//             //         value={formData.ageRangeMin}
//             //         onChange={handleInputChange}
//             //         required
//             //         placeholder="e.g., 25"
//             //         className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500"
//             //       />
//             //     </div>
//             //     <div className="space-y-2">
//             //       <label className="text-sm font-medium text-white">Age Range Max *</label>
//             //       <input
//             //         type="number"
//             //         name="ageRangeMax"
//             //         value={formData.ageRangeMax}
//             //         onChange={handleInputChange}
//             //         required
//             //         placeholder="e.g., 35"
//             //         className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500"
//             //       />
//             //     </div>
//             //   </div>

//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//   <div className="space-y-2">
//     <label className="text-sm font-medium text-white">Age Range Min *</label>
//     <input
//       type="number"
//       name="ageRangeMin"
//       min="18"
//       max="100"
//       value={formData.ageRangeMin}
//       onChange={(e) => {
//         const value = e.target.value;
//         setFormData(prev => ({...prev, ageRangeMin: value}));
//         setAgeError(""); // Clear previous error when editing
//       }}
//       required
//       placeholder={ageError || "18-100"}
//       className={`w-full px-4 py-3 rounded-lg bg-black border ${
//         ageError ? "border-red-500" : "border-gray-700"
//       } text-white focus:ring-2 focus:ring-pink-500`}
//     />
//   </div>

// {ageError && (
//   <p className="text-red-400 text-sm mt-1">{ageError}</p>
// )}

//   <div className="space-y-2">
//     <label className="text-sm font-medium text-white">Age Range Max *</label>
//     <input
//       type="number"
//       name="ageRangeMax"
//       min="18"
//       max="100"
//       value={formData.ageRangeMax}
//       onChange={(e) => {
//         const value = e.target.value;
//         setFormData(prev => ({...prev, ageRangeMax: value}));
//         setAgeError(""); // Clear previous error when editing
//       }}
//       required
//       placeholder={ageError || "18-100"}
//       className={`w-full px-4 py-3 rounded-lg bg-black border ${
//         ageError ? "border-red-500" : "border-gray-700"
//       } text-white focus:ring-2 focus:ring-pink-500`}
//     />
//   </div>
// </div>
// {ageError && (
//   <p className="text-red-400 text-sm mt-1">{ageError}</p>
// )}

//               <div className="grid grid-cols-1 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-white">Location Preference *</label>
//                   <select
//                     name="locationPreference"
//                     value={formData.locationPreference}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500"
//                   >
//                     <option value="" className="text-gray-400">Select</option>
//                     <option value="local">Local</option>
//                     <option value="long-distance">Open to Long-distance</option>
//                     <option value="international">International</option>
//                     <option value="none">None</option>

//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-white">Dealbreakers *</label>
//                   <div className="flex flex-wrap gap-2">
//                     {dealbreakerOptions.map((d) => (
//                       <button
//                         key={d}
//                         type="button"
//                         onClick={() => addDealbreaker(d)}
//                         className={`px-3 py-1 rounded-full border ${
//                           formData.dealbreakers.includes(d)
//                             ? "bg-pink-600 text-white border-pink-500"
//                             : "bg-black text-pink-200 border-gray-700 hover:bg-gray-800 hover:text-white"
//                         }`}
//                       >
//                         {d}
//                       </button>
//                     ))}
//                   </div>
//                   <input
//                     type="text"
//                     name="otherDealbreaker"
//                     value={formData.otherDealbreaker}
//                     onChange={handleInputChange}
//                     placeholder="Other dealbreakers..."
//                     className="w-full px-4 py-3 rounded-lg mt-2 bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 placeholder-gray-400"
//       onKeyDown={(e) => {
//         if (e.key === "Enter") {
//           e.preventDefault();
//           handleAddCustomDealbreaker();
//         }
//       }}
//     />
//         <button
//       type="button"
//       onClick={handleAddCustomDealbreaker}
//       className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500"
//     >
//       +
//     </button>
//                 </div>

//                   {/* Removable Dealbreaker Chips */}
//   {formData.dealbreakers.length > 0 && (
//     <div className="flex flex-wrap gap-2 mt-4">
//       {formData.dealbreakers.map((item) => (
//         <div
//           key={item}
//           className="flex items-center px-3 py-1 bg-pink-700 text-white rounded-full text-sm"
//         >
//           <span>{item}</span>
//           <button
//             type="button"
//             onClick={() =>
//               setFormData((prev) => ({
//                 ...prev,
//                 dealbreakers: prev.dealbreakers.filter((d) => d !== item),
//               }))
//             }
//             className="ml-2 text-white hover:text-gray-200"
//           >
//             ✕
//           </button>
//         </div>
//       ))}
//     </div>
//   )}
//               </div>
//             </div>
//           )}
  
//           {/* Navigation Buttons */}
//           <div className="flex justify-between mt-6">
//             {currentStep > 1 && (
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 className="bg-pink-800 text-white px-4 py-2 rounded hover:bg-pink-700"
//               >
//                 Back
//               </button>
//             )}
//             {currentStep < 5 ? (
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-500"
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
//               >
//                 Submit
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;




















































import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebase";
import React, { useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";

import { Country, City } from "country-state-city";

import {
  Eye,
  EyeOff,
  Upload,
  Heart,
  User,
  Mail,
  MapPin,
  Calendar,
  Target,
  Sparkles,
  Users,
  Home,
  Coffee,
  Star,
  Search,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    preferredPronouns: "",
    
    // Step 2: Identity & Intentions
    openToLongDistance: "",
    relationshipType: "",
    profession: "",
    
    // Step 3: Lifestyle & Beliefs
    maritalStatus: "",
    hasChildren: "",
    wantsChildren: "",
    religion: "",
    religionImportance: "",
    country: "",
    city: "",
    nationality: "",
    smokingHabits: "",
    dailyRoutine: "",
    dietPreference: "",
    socialEnergy: "",
    
    // Step 4: Personality & Vibe
    vibeType: "",
    aboutMe: "",
    interests: [],
    bucketList: "",
    height: "",
    profilePhoto: null,
    
    // Step 5: Preferences
    ageRangeMin: "",
    ageRangeMax: "",
    preferredReligion: "",
    preferredMaritalStatus: "",
    preferredChildrenSituation: "",
    preferredVibeTypes: [],
    locationPreference: "",
    dealbreakers: [],
    otherDealbreaker: "",
  });

  const [dobError, setDobError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [interestInput, setInterestInput] = useState("");
  const [dealbreakerInput, setDealbreakerInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const isPasswordValid = (password) => {
    const lengthCheck = password.length >= 8;
    const uppercaseCheck = /[A-Z]/.test(password);
    const lowercaseCheck = /[a-z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    const symbolCheck = /[^A-Za-z0-9]/.test(password);
    return lengthCheck && uppercaseCheck && lowercaseCheck && numberCheck && symbolCheck;
  };

  const loadCityOptions = (inputValue, callback) => {
    if (!formData.country) {
      callback([]);
      return;
    }

    const allCities = City.getCitiesOfCountry(formData.country) || [];

    const filtered = allCities
      .filter((city) =>
        city.name.toLowerCase().startsWith(inputValue.toLowerCase())
      )
      .map((city) => ({
        label: city.name,
        value: city.name,
      }));

    // Limit to first 100 matches for safety
    callback(filtered.slice(0, 100));
  };

  const interestSuggestions = [
    "Music", "Books", "Travel", "Meditation", "Fitness", "Art", "Photography", 
    "Cooking", "Movies", "Gaming", "Dancing", "Hiking", "Yoga", "Sports", 
    "Technology", "Fashion", "Nature", "Spirituality", "Writing", "Adventure"
  ];

  const relationshipTypes = [
    "Romantic", "Soulful Friendship", "Emotional Support", "Marriage", "Not Sure Yet"
  ];

  const maritalStatuses = [
    "Single", "Divorced", "Widowed", "Separated", "It's complicated"
  ];

  const religions = [
    "Islam", "Christianity", "Hinduism", "Buddhism", "Judaism", "Sikhism", 
    "Atheist", "Agnostic", "Spiritual but not religious", "Other", "Prefer not to say"
  ];

  const vibeTypes = [
    "Romantic Idealist","Practical Realist","Fearful Avoidant","Caregiver / Nurturer","Shy"
  ];

  const dealbreakerOptions = [
    "Smoking", "Addictions", "Dishonesty", "Long-distance", "Different religion", 
    "Has children", "Doesn't want children", "Very different lifestyle", "Poor communication"
  ];

  const validateDOB = (dateString) => {
    const today = new Date();
    const inputDate = new Date(dateString);
    return inputDate <= today;
  };

  const countryOptions = Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.isoCode,
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addDealbreaker = (dealbreaker) => {
  setFormData((prev) => {
    const exists = prev.dealbreakers.includes(dealbreaker);
    return {
      ...prev,
      dealbreakers: exists
        ? prev.dealbreakers.filter((d) => d !== dealbreaker)
        : [...prev.dealbreakers, dealbreaker],
    };
  });
};

const handleAddCustomDealbreaker = () => {
  const custom = formData.otherDealbreaker?.trim();
  if (
    custom &&
    !formData.dealbreakers.includes(custom) &&
    !dealbreakerOptions.includes(custom)
  ) {
    setFormData((prev) => ({
      ...prev,
      dealbreakers: [...prev.dealbreakers, custom],
      otherDealbreaker: "", // clear field
    }));
  }
};

  const addInterest = (interest) => {
    if (!formData.interests.includes(interest)) {
      setFormData((prev) => ({ ...prev, interests: [...prev.interests, interest] }));
    }
    setInterestInput("");
  };

  const removeInterest = (interest) => {
    setFormData((prev) => ({ ...prev, interests: prev.interests.filter((i) => i !== interest) }));
  };


  const removeDealbreaker = (dealbreaker) => {
    setFormData((prev) => ({ ...prev, dealbreakers: prev.dealbreakers.filter((d) => d !== dealbreaker) }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePhoto: file }));
    }
  };

  const uploadToCloudinary = async (file) => {
    const cloudName = "dpvsmzplh";
    const unsignedPreset = "unsigned_preset";
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", unsignedPreset);
    formData.append("folder", "profile_photos");

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!canGoNext()) {
      alert("Please fill in all required fields before submitting.");
      setIsSubmitting(false);
      return;
    }

    if (!isPasswordValid(formData.password)) {
      alert("Your password is too weak. Please use a stronger one.");
      setIsSubmitting(false);
      return;
    }

    const { profilePhoto, ...cleanedData } = {
      ...formData,
      fullName: formData.fullName.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
      city: formData.city.trim(),
      country: formData.country.trim(),
    };

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        cleanedData.email,
        formData.password
      );
      const user = res.user;

      const photoURL = await uploadToCloudinary(profilePhoto);
      
      // Explicitly remove sensitive or unnecessary fields
      const { password, confirmPassword, profilePhoto: _, ...safeData } = formData;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        ...safeData,
        profilePhotoURL: photoURL || null,
      });

      alert("Registration successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message);
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (!canGoNext()) {
      alert("Please fill in all required fields before continuing.");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
         // Check if DOB is valid (18-100 years old)
      if (formData.dateOfBirth) {
        const dob = new Date(formData.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear(); // Changed to 'let'
        
        // Adjust for month/day (e.g., if birthday hasn't happened yet this year)
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
          age--; // Now this works because 'age' is mutable
        }
        
        if (age < 18) {
          setDobError("You must be at least 18 years old.");
          return false;
        } else if (age > 100) {
          setDobError("Please enter a valid age (under 100).");
          return false;
        }
      }
        return (
          formData.fullName.trim() !== "" &&
          formData.username.trim() !== "" &&
          formData.email.trim() !== "" &&
          formData.password &&
          formData.confirmPassword &&
          formData.dateOfBirth &&
          formData.gender &&
          formData.preferredPronouns &&
          isPasswordValid(formData.password) &&
          formData.password === formData.confirmPassword
        );
      case 2:
        return (
          formData.openToLongDistance &&
          formData.relationshipType &&
          formData.profession.trim() !== ""
        );
      case 3:
        return (
          formData.maritalStatus &&
          formData.hasChildren &&
          formData.wantsChildren &&
          formData.religion &&
          formData.religionImportance &&
          formData.country &&
          formData.city &&
          formData.nationality.trim() !== "" &&
          formData.smokingHabits &&
          formData.dailyRoutine &&
          formData.dietPreference.trim() !== "" &&
          formData.socialEnergy
        );
      case 4:
        return (
          formData.vibeType &&
          formData.aboutMe.trim() !== "" &&
          formData.interests.length > 0 &&
          formData.bucketList.trim() !== "" &&
          formData.profilePhoto
        );
      case 5:
        // Age validation
      const minAge = parseInt(formData.ageRangeMin);
      const maxAge = parseInt(formData.ageRangeMax);
      
      if (isNaN(minAge)) {
        setAgeError("Please enter minimum age");
        return false;
      }
      if (isNaN(maxAge)) {
        setAgeError("Please enter maximum age");
        return false;
      }
      if (minAge < 18 || minAge > 100) {
        setAgeError("Minimum age must be between 18-100");
        return false;
      }
      if (maxAge < 18 || maxAge > 100) {
        setAgeError("Maximum age must be between 18-100");
        return false;
      }
      if (minAge > maxAge) {
        setAgeError("Minimum age cannot be greater than maximum age");
        return false;
      }
        return (
          formData.ageRangeMin &&
          formData.ageRangeMax &&
          formData.locationPreference &&
          formData.dealbreakers.length > 0
        );
      default:
        return true;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Basic Information";
      case 2: return "Identity & Intentions";
      case 3: return "Lifestyle & Beliefs";
      case 4: return "Personality & Vibe";
      case 5: return "Preferences";
      default: return "Registration";
    }
  };

  return (
    <div className="min-h-screen w-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-500 mb-2"> Vibe nest</h1>
          <p className="text-white text-lg">Sync Hearts • Share Vibes</p>
          <p className="text-gray-400 mt-2">
          Find your vibe, share your story, and grow closer. One perfect match at a time. Welcome to Vibe nest!!
          </p>
        </div>

        
        
  
        {/* Form */}
        <form
  onSubmit={handleSubmit}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      const tag = e.target.tagName.toLowerCase();
      const type = e.target.type?.toLowerCase();
      if (tag !== "textarea" && type !== "submit") {
        e.preventDefault(); // ✅ Block Enter-based submission
      }
    }
  }}
>
            <h2 className="text-2xl text-white font-semibold mb-4">{getStepTitle()}</h2>
  
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Full Name *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-pink-300" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-black text-white border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Username / Handle *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-pink-300">@</span>
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    placeholder="Choose a unique username"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Email Address *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-pink-300" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Password *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-pink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Create a secure password"
                    className="w-full pl-10 pr-10 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-300 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.password && !isPasswordValid(formData.password) && (
                  <p className="text-sm text-pink-200 mt-1">
                    Password must be at least <strong>8 characters</strong> with <strong>uppercase</strong>, <strong>lowercase</strong>, <strong>numbers</strong>, and <strong>symbols</strong>.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Confirm Password *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-pink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-10 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-300 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-sm text-pink-200 mt-1">Passwords do not match.</p>
                )}
              </div>

              <div className="space-y-2">
  <label className="text-sm font-medium text-white">Date of Birth *</label>
 <div className="relative w-full">
  {/* Calendar Icon */}
  <svg
    className="absolute left-3 top-3 w-5 h-5 text-pink-400 pointer-events-none"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2
      2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>

    <input
      type="date"
      name="dateOfBirth"
      max={new Date().toISOString().split("T")[0]} // no future DOB
      value={formData.dateOfBirth}
      onChange={(e) => {
        const dob = new Date(e.target.value);
        const today = new Date();

        // Calculate age
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
          age--;
        }

        // Error handling
        if (dob > today) {
          setDobError("Date of birth cannot be in the future.");
          return;
        } else if (age < 18) {
          setDobError("You must be at least 18 years old.");
          return;
        } else if (age > 100) {
          setDobError("Please enter a valid age (under 100).");
          return;
        }

        // If valid
        setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }));
        setDobError(""); // clear errors
      }}
      required
      className={`w-full pl-10 pr-4 py-3 rounded-lg bg-black border ${
        dobError ? "border-red-500" : "border-gray-700"
      } text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500`}
    />
  </div>

  {dobError && (
    <p className="text-red-400 text-sm mt-1">{dobError}</p>
  )}
</div>


              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="" className="text-gray-400">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Preferred Pronouns *</label>
                  <select
                    name="preferredPronouns"
                    value={formData.preferredPronouns}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="" className="text-gray-400">Select pronouns</option>
                    <option value="he/him">He/Him</option>
                    <option value="she/her">She/Her</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Identity & Intentions */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Are you open to long-distance connections? *</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="openToLongDistance"
                      value="yes"
                      checked={formData.openToLongDistance === "yes"}
                      onChange={handleInputChange}
                      className="mr-2 text-pink-500"
                    />
                    <span className="text-white">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="openToLongDistance"
                      value="no"
                      checked={formData.openToLongDistance === "no"}
                      onChange={handleInputChange}
                      className="mr-2 text-pink-500"
                    />
                    <span className="text-white">No</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Relationship Type *</label>
                <select
                  name="relationshipType"
                  value={formData.relationshipType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="" className="text-gray-400">What are you looking for?</option>
                  {relationshipTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Profession / Work Field *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Target className="h-5 w-5 text-pink-300" />
                  </div>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    required
                    placeholder="What do you do for work?"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Lifestyle & Beliefs */}
          {currentStep === 3 && (
            <div className="space-y-4">
              {/* Marital Status and Has Children */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Marital Status *</label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="" className="text-gray-400">Select status</option>
                    {maritalStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Do you have children? *</label>
                  <select
                    name="hasChildren"
                    value={formData.hasChildren}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="" className="text-gray-400">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>

              {/* Wants Children and Religion */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Do you want children? *</label>
                  <select
                    name="wantsChildren"
                    value={formData.wantsChildren}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="" className="text-gray-400">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="maybe">Maybe</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Religion / Spiritual Belief *</label>
                  <select
                    name="religion"
                    value={formData.religion}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="" className="text-gray-400">Select religion</option>
                    {religions.map((religion) => (
                      <option key={religion} value={religion}>
                        {religion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Religion Importance */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">How important is religion to you? *</label>
                <select
                  name="religionImportance"
                  value={formData.religionImportance}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="" className="text-gray-400">Select importance</option>
                  <option value="not-important">Not Important</option>
                  <option value="somewhat">Somewhat Important</option>
                  <option value="very-important">Very Important</option>
                </select>
              </div>

              {/* Country and City */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-pink-300" />
                    Country *
                  </label>
                  <Select
                    options={countryOptions}
                    value={countryOptions.find((c) => c.value === formData.country) || null}
                    onChange={(selected) =>
                      setFormData((prev) => ({
                        ...prev,
                        country: selected?.value || "",
                        city: "",
                      }))
                    }
                    placeholder="Select your country"
                    className="mt-2"
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: '#000',
                        borderColor: '#333',
                        color: 'white',
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: 'white',
                      }),
                      input: (base) => ({
                        ...base,
                        color: 'white',
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: '#f9a8d4',
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: '#000',
                        borderColor: '#333',
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? '#333' : '#000',
                        color: 'white',
                      }),
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-pink-300" />
                    City *
                  </label>
                  <AsyncSelect
                    cacheOptions
                    loadOptions={loadCityOptions}
                    defaultOptions
                    value={
                      formData.city
                        ? { label: formData.city, value: formData.city }
                        : null
                    }
                    onChange={(selected) =>
                      setFormData((prev) => ({
                        ...prev,
                        city: selected?.value || "",
                      }))
                    }
                    placeholder="Type to search your city"
                    className="mt-2"
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: '#000',
                        borderColor: '#333',
                        color: 'white',
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: 'white',
                      }),
                      input: (base) => ({
                        ...base,
                        color: 'white',
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: '#f9a8d4',
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: '#000',
                        borderColor: '#333',
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? '#333' : '#000',
                        color: 'white',
                      }),
                    }}
                  />
                </div>
              </div>

              {/* Nationality */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Nationality *</label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter your nationality"
                />
              </div>

              {/* Smoking Habits, Daily Routine, Diet Preference, Social Energy */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Smoking Habits *</label>
                  <select
                    name="smokingHabits"
                    value={formData.smokingHabits}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="" className="text-gray-400">Select</option>
                    <option value="never">Never</option>
                    <option value="sometimes">Sometimes</option>
                    <option value="regularly">Regularly</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Daily Routine *</label>
                  <select
                    name="dailyRoutine"
                    value={formData.dailyRoutine}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="" className="text-gray-400">Select</option>
                    <option value="early-bird">Early Bird</option>
                    <option value="night-owl">Night Owl</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Diet Preference *</label>
                  <input
                    type="text"
                    name="dietPreference"
                    value={formData.dietPreference}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="E.g., Vegetarian, Vegan"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Social Energy *</label>
                  <select
                    name="socialEnergy"
                    value={formData.socialEnergy}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="" className="text-gray-400">Select</option>
                    <option value="introvert">Introvert</option>
                    <option value="ambivert">Ambivert</option>
                    <option value="extrovert">Extrovert</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Personality & Vibe */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Know Your Vibe *</label>
                <select
                  name="vibeType"
                  value={formData.vibeType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="" className="text-gray-400">Select your vibe</option>
                  {vibeTypes.map((vibe) => (
                    <option key={vibe} value={vibe}>{vibe}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Short "About Me" Bio *</label>
                <textarea
                  name="aboutMe"
                  value={formData.aboutMe}
                  onChange={handleInputChange}
                  required
                  placeholder="I'm a passionate artist who..."
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400"
                />
              </div>

<div className="space-y-2">
  <label className="text-sm font-medium text-white">Hobbies & Interests *</label>

  {/* Suggestion Buttons */}
  <div className="flex flex-wrap gap-2">
    {interestSuggestions.map((interest) => (
      <button
        key={interest}
        type="button"
        onClick={() => addInterest(interest)}
        className={`px-3 py-1 rounded-full border ${
          formData.interests.includes(interest)
            ? "bg-pink-600 text-white border-pink-500"
            : "bg-black text-pink-200 border-gray-700 hover:bg-gray-800 hover:text-white"
        }`}
      >
        {interest}
      </button>
    ))}
  </div>

  {/* Manual Input + Add Button */}
  <div className="flex gap-2 mt-3">
    <input
      type="text"
      value={interestInput}
      onChange={(e) => setInterestInput(e.target.value)}
      placeholder="Add your own interest"
      className="flex-1 px-4 py-2 rounded-lg bg-black border border-gray-700 text-white"
    />
    <button
      type="button"
      onClick={() => {
        const trimmed = interestInput.trim();
        if (trimmed && !formData.interests.includes(trimmed)) {
          addInterest(trimmed);
          setInterestInput(""); // clear input after adding
        }
      }}
      className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-500"
    >
      Add
    </button>
  </div>

  {/* Selected Interests Display */}
  {formData.interests.length > 0 && (
    <div className="flex flex-wrap gap-2 mt-4">
      {formData.interests.map((i) => (
        <span
          key={i}
          className="bg-pink-600 text-white px-3 py-1 rounded-full flex items-center"
        >
          {i}
          <button
            onClick={() => removeInterest(i)}
            className="ml-2 text-white hover:text-pink-200"
          >
            &times;
          </button>
        </span>
      ))}
    </div>
  )}
</div>


              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Bucket List / Life Vision *</label>
                <textarea
                  name="bucketList"
                  value={formData.bucketList}
                  onChange={handleInputChange}
                  required
                  placeholder="What are you hoping to experience in this life?"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Height (Optional)</label>
                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="e.g., 5'11''"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Profile Photo *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white"
                />
              </div>
            </div>
          )}

          {/* Step 5: Preferences */}
          {currentStep === 5 && (
            
            //   <div className="grid grid-cols-2 gap-4">
            //     <div className="space-y-2">
            //       <label className="text-sm font-medium text-white">Age Range Min *</label>
            //       <input
            //         type="number"
            //         name="ageRangeMin"
            //         value={formData.ageRangeMin}
            //         onChange={handleInputChange}
            //         required
            //         placeholder="e.g., 25"
            //         className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500"
            //       />
            //     </div>
            //     <div className="space-y-2">
            //       <label className="text-sm font-medium text-white">Age Range Max *</label>
            //       <input
            //         type="number"
            //         name="ageRangeMax"
            //         value={formData.ageRangeMax}
            //         onChange={handleInputChange}
            //         required
            //         placeholder="e.g., 35"
            //         className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500"
            //       />
            //     </div>
            //   </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
  <div className="space-y-2">
    <label className="text-sm font-medium text-white">Age Range Min *</label>
    <input
      type="number"
      name="ageRangeMin"
      min="18"
      max="100"
      value={formData.ageRangeMin}
      onChange={(e) => {
        const value = e.target.value;
        setFormData(prev => ({...prev, ageRangeMin: value}));
        setAgeError(""); // Clear previous error when editing
      }}
      required
      placeholder={ageError || "18-100"}
      className={`w-full px-4 py-3 rounded-lg bg-black border ${
        ageError ? "border-red-500" : "border-gray-700"
      } text-white focus:ring-2 focus:ring-pink-500`}
    />
  </div>

{ageError && (
  <p className="text-red-400 text-sm mt-1">{ageError}</p>
)}

  <div className="space-y-2">
    <label className="text-sm font-medium text-white">Age Range Max *</label>
    <input
      type="number"
      name="ageRangeMax"
      min="18"
      max="100"
      value={formData.ageRangeMax}
      onChange={(e) => {
        const value = e.target.value;
        setFormData(prev => ({...prev, ageRangeMax: value}));
        setAgeError(""); // Clear previous error when editing
      }}
      required
      placeholder={ageError || "18-100"}
      className={`w-full px-4 py-3 rounded-lg bg-black border ${
        ageError ? "border-red-500" : "border-gray-700"
      } text-white focus:ring-2 focus:ring-pink-500`}
    />
  </div>
</div>
{ageError && (
  <p className="text-red-400 text-sm mt-1">{ageError}</p>
)}

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Location Preference *</label>
                  <select
                    name="locationPreference"
                    value={formData.locationPreference}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="" className="text-gray-400">Select</option>
                    <option value="local">Local</option>
                    <option value="long-distance">Open to Long-distance</option>
                    <option value="international">International</option>
                    <option value="none">None</option>

                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Dealbreakers *</label>
                  <div className="flex flex-wrap gap-2">
                    {dealbreakerOptions.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => addDealbreaker(d)}
                        className={`px-3 py-1 rounded-full border ${
                          formData.dealbreakers.includes(d)
                            ? "bg-pink-600 text-white border-pink-500"
                            : "bg-black text-pink-200 border-gray-700 hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    name="otherDealbreaker"
                    value={formData.otherDealbreaker}
                    onChange={handleInputChange}
                    placeholder="Other dealbreakers..."
                    className="w-full px-4 py-3 rounded-lg mt-2 bg-black border border-gray-700 text-white focus:ring-2 focus:ring-pink-500 placeholder-gray-400"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleAddCustomDealbreaker();
        }
      }}
    />
        <button
      type="button"
      onClick={handleAddCustomDealbreaker}
      className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500"
    >
      +
    </button>
                </div>

                  {/* Removable Dealbreaker Chips */}
  {formData.dealbreakers.length > 0 && (
    <div className="flex flex-wrap gap-2 mt-4">
      {formData.dealbreakers.map((item) => (
        <div
          key={item}
          className="flex items-center px-3 py-1 bg-pink-700 text-white rounded-full text-sm"
        >
          <span>{item}</span>
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                dealbreakers: prev.dealbreakers.filter((d) => d !== item),
              }))
            }
            className="ml-2 text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )}
              </div>
            </div>
          )}
  
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-pink-800 text-white px-4 py-2 rounded hover:bg-pink-700"
              >
                Back
              </button>
            )}
            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-500"
              >
                Next
              </button>
            ) : (
<button
  type="submit"
  className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 disabled:opacity-50`}
  disabled={isSubmitting}
>
  {isSubmitting ? "Submitting..." : "Submit"}
</button>

            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;