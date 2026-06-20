import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc, getDocs, collection, addDoc , updateDoc, deleteDoc} from "firebase/firestore";
import { db } from "../services/firebase"; // adjust path to your firebase config
import { useAuth } from "../context/AuthContext"; // if you're using auth
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { 
  Heart, 
  Calendar, 
  Camera,
  Edit3, 
  ArrowLeft, 
  Plus,
  Sparkles,
  Crown,
  MapPin,
  Coffee,
  Sun,
  Moon,
  CloudRain,
  Zap,
  Target,
  Smile,
  Frown,
  Meh,
  Star,
  Gift,
  Handshake,
  Users,
  MessageCircle,
  Shield,
  Cloud,
  Eye,
  Trash2,
  Award,
  AlertTriangle,
  HeartCrack,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

// Graph
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,CartesianGrid } from 'recharts';

const RelationshipTracker = () => {
  const [relationshipStartDate, setRelationshipStartDate] = useState(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [totalYears, setTotalYears] = useState(0);
  const [dailyEntries, setDailyEntries] = useState({});
  const [showDayDetail, setShowDayDetail] = useState(false);
  const [showPastDays, setShowPastDays] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [isSetupMode, setIsSetupMode] = useState(true);
  const { user } = useAuth(); // or however you get logged-in user
  const [pickedDate, setPickedDate] = useState(null);
  const [photoFile, setPhotoFile] = useState(null); // store File object
  const [photoPreview, setPhotoPreview] = useState(null); // for showing preview
  const [isUploading, setIsUploading] = useState(false);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
const [photo, setPhoto] = useState(null); // Cloudinary URL (after upload)
const todayKey = new Date().toISOString().split("T")[0];
const todaysMemories = dailyEntries[todayKey] || [];
const [editingEntry, setEditingEntry] = useState(null);
const [previewImageUrl, setPreviewImageUrl] = useState(null);
const navigate = useNavigate();


  const emotionColors = {
    cared: { color: '#FF1493', icon: Heart, name: 'Cared' },
    supported: { color: '#FF69B4', icon: Handshake, name: 'Supported' },
    hug: { color: '#FFB6C1', icon: Smile, name: 'Hug' },
    grateful: { color: '#DDA0DD', icon: Star, name: 'Grateful' },
    holdingHands: { color: '#F8BBD9', icon: Users, name: 'Hold Hands' },
    longTalkingSession: { color: '#FFD700', icon: MessageCircle, name: 'Long Talking Session' },
    playful: { color: '#FF6347', icon: Zap, name: 'Playful' },
    protective: { color: '#DC143C', icon: Shield, name: 'Protective' },
    lonely: { color: '#696969', icon: Cloud, name: 'Lonely' },
    jealous: { color: '#FFA500', icon: Eye, name: 'Jealous' },
    proud: { color: '#FF4500', icon: Award, name: 'Proud' },
    fight: { color: '#8B0000', icon: AlertTriangle, name: 'Fight' },
    hurt: { color: '#800080', icon: HeartCrack, name: 'Hurt' },
    afraid: { color: '#4B0082', icon: AlertCircle, name: 'Afraid' },
    peaceful: { color: '#DA70D6', icon: Moon, name: 'Peaceful' }
  };

const uploadToCloudinary = async (file) => {
  const cloudName = "dpvsmzplh";
  const unsignedPreset = "unsigned_preset"; // double-check that this preset exists and is unsigned
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", unsignedPreset);
  formData.append("folder", "relationship_memories");

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("Cloudinary upload result:", data); // 🔍 log output

    if (data.secure_url) {
      return data.secure_url;
    } else {
      console.error("No secure_url returned:", data);
      return null;
    }
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};



  // Get current date string
  const getCurrentDateString = () => {
    const today = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('en-US', options);
  };

  // Get emotion counts for the last 30 days
const getEmotionCounts = () => {
  const counts = {};

  Object.keys(emotionColors).forEach((emotion) => {
    counts[emotion] = 0;
  });

  Object.entries(dailyEntries).forEach(([date, memories]) => {
    memories.forEach((memory) => {
      if (memory?.emotion) {
        counts[memory.emotion] = (counts[memory.emotion] || 0) + 1;
      }
    });
  });

  return Object.entries(counts)
    .filter(([_, count]) => count > 0)
    .map(([emotion, count]) => ({
      emotion: emotionColors[emotion]?.name || emotion,
      count,
      color: emotionColors[emotion]?.color || '#999',
    }));
};


//for end journey
const endJourney = async () => {
  if (!user) return;

  try {
    // Delete all relationship data from Firestore
    const metaRef = doc(db, "users", user.uid, "meta", "relationshipTracker");
    await deleteDoc(metaRef);

    // Delete all timeline entries (this is more complex)
    const timelineRef = collection(db, "users", user.uid, "ourTimeline");
    const timelineSnap = await getDocs(timelineRef);
    
    const deletePromises = timelineSnap.docs.map(async (doc) => {
      // Delete all memories in subcollection first
      const memoriesRef = collection(timelineRef, doc.id, "memories");
      const memoriesSnap = await getDocs(memoriesRef);
      const memoryDeletes = memoriesSnap.docs.map(memDoc => deleteDoc(memDoc.ref));
      await Promise.all(memoryDeletes);
      
      // Then delete the day document
      return deleteDoc(doc.ref);
    });

    await Promise.all(deletePromises);

    // Reset all local state
    setRelationshipStartDate(null);
    setCurrentDay(1);
    setTotalYears(0);
    setDailyEntries({});
    setPickedDate(null);
    setIsSetupMode(true);

  } catch (error) {
    console.error("Error ending journey:", error);
    alert("Failed to end journey. Please try again.");
  }
};



  // Save entry to Firebase (placeholder function)


const startRelationship = async (startDate) => {
  if (!user || !startDate) return;

  const formattedDate = startDate.toISOString().split("T")[0];

  try {
    const metaRef = doc(db, "users", user.uid, "meta", "relationshipTracker");
    await setDoc(metaRef, {
      relationshipStartDate: formattedDate,
      createdAt: new Date().toISOString(),
    });

    setRelationshipStartDate(formattedDate);
    setIsSetupMode(false);
    calculateCurrentDay(startDate);
  } catch (error) {
    console.error("Error saving relationship start date:", error);
    alert("Failed to save. Please try again.");
  }
};

useEffect(() => {
  if (!user?.uid) return;

  const fetchStartDateAndEntries = async () => {
    const metaSnap = await getDoc(doc(db, "users", user.uid, "meta", "relationshipTracker"));

    if (metaSnap.exists()) {
      const startDateStr = metaSnap.data().relationshipStartDate;
      setRelationshipStartDate(startDateStr);
      setIsSetupMode(false);
      calculateCurrentDay(new Date(startDateStr));
    } else {
      setIsSetupMode(true);
    }

    await loadEntries(); // ✅ only runs if user is ready
  };

  fetchStartDateAndEntries();
}, [user?.uid]);




  const calculateCurrentDay = (startDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    setCurrentDay(diffDays);
    setTotalYears(Math.floor(diffDays / 365));
    
    // Keep only last 30 days of entries
    const newEntries = {};
for (let i = Math.max(1, diffDays - 29); i <= diffDays; i++) {
  const date = new Date(relationshipStartDate);
  date.setDate(date.getDate() + i - 1);
  const key = date.toISOString().split("T")[0];
  if (dailyEntries[key]) {
    newEntries[key] = dailyEntries[key];
  }
}
    setDailyEntries(newEntries);
  };



const saveDayEntry = async (note, photoUrl, emotionKey) => {
  if (!user) return;

  const todayKey = getTodayKey();

  const memory = {
    note: String(note || ''),
    photo: photoUrl || null,
    emotion: emotionKey || null,
    timestamp: new Date().toISOString()
  };

  try {
    // ✅ Create the parent document first (so it appears in getDocs)
    await setDoc(doc(db, "users", user.uid, "ourTimeline", todayKey), {
      hasEntry: true,
      updatedAt: new Date().toISOString(),
    });

    // ✅ Then add the memory inside the subcollection
    const memRef = collection(db, "users", user.uid, "ourTimeline", todayKey, "memories");
        if (editingEntry?.id) {
      const memDocRef = doc(memRef, editingEntry.id);
      await updateDoc(memDocRef, memory);
    } else {
      await addDoc(memRef, memory);
    }

    await loadEntries(); // Refresh entries
  } catch (error) {
    console.error("Failed to save memory:", error);
  }
};




const getTodayKey = () => {
  return new Date().toISOString().split("T")[0]; // e.g., "2025-07-29"
};

const fetchTodayEntry = async () => {
  if (!user) return;

  const todayKey = getTodayKey();
  const docRef = doc(db, "users", user.uid, "ourTimeline", todayKey);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    const data = snapshot.data();

    setDailyEntries((prev) => ({
      ...prev,
      [currentDay]: data,
    }));
  }
};


const loadEntries = async () => {
  if (!user) return;
console.log("📦 Loading entries for user:", user?.uid);

  try {
    const timelineSnap = await getDocs(collection(db, "users", user.uid, "ourTimeline"));

    const entries = {};

    for (const dateDoc of timelineSnap.docs) {
      const dateKey = dateDoc.id;
      const memSnap = await getDocs(
        collection(db, "users", user.uid, "ourTimeline", dateKey, "memories")
      );

      const memories = [];
      memSnap.forEach((memDoc) => {
        memories.push({ id: memDoc.id, ...memDoc.data() }); // ✅ Include document ID
      });

      if (memories.length > 0) {
        entries[dateKey] = memories;
      }
    }

    setDailyEntries(entries);
    console.log("✅ Set dailyEntries:", entries);

  } catch (error) {
    console.error("Failed to load timeline memories:", error);
  }
};






const DayDetailModal = ({ day, onClose, onSave }) => {
  const [note, setNote] = useState('');
  const [photo, setPhoto] = useState(null); // Cloudinary URL
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState('cared');


  useEffect(() => {
    setNote(editingEntry?.note || '');
    setPhoto(editingEntry?.photo || null);
    setSelectedEmotion(editingEntry?.emotion || 'cared');
  }, [editingEntry]);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);

    setIsUploading(true);
    const cloudinaryUrl = await uploadToCloudinary(file);
    setIsUploading(false);

    if (cloudinaryUrl) {
      setPhoto(cloudinaryUrl); // ✅ Save Cloudinary URL
      setPhotoPreview(null);   // Clear preview (optional)
    } else {
      alert("Image upload failed. Try again.");
    }
  };

  const handleSave = () => {
    if (isUploading) {
      alert("Please wait for image upload to finish.");
      return;
    }

    onSave(note, photo, selectedEmotion, editingEntry); // ✅ Pass correct values
    onClose();
  };

  return (
 <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-gradient-to-br from-black via-pink-950 to-black border border-pink-500 shadow-lg rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-pink-400 tracking-wide drop-shadow">
          Day {day}
        </h2>
        <button onClick={onClose} className="text-pink-400 hover:text-pink-300 transition-all">
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Photo Upload */}
      <div className="mb-6">
        <label className="block text-pink-300 mb-2 font-semibold tracking-wide">
          <Camera className="inline mr-2" size={16} />
          Memory Photo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
          id="photo-upload"
        />
        <label
          htmlFor="photo-upload"
          className="block w-full h-36 border-2 border-dashed border-pink-500 rounded-xl cursor-pointer hover:border-pink-400 transition-all overflow-hidden relative"
        >
          {isUploading ? (
            <div className="flex items-center justify-center h-full text-pink-300 text-sm animate-pulse">
              Uploading...
            </div>
          ) : photoPreview ? (
            <img
              src={photoPreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : photo ? (
            <img
              src={photo}
              alt="Uploaded Memory"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-pink-400 transition-opacity hover:opacity-80">
              <Plus size={28} />
            </div>
          )}
        </label>
      </div>

      {/* Note Input */}
      <div className="mb-6">
        <label className="block text-pink-300 mb-2 font-semibold tracking-wide">
          <Edit3 className="inline mr-2" size={16} />
          Your Note
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write something beautiful about today..."
          className="w-full p-4 bg-black border-2 border-pink-600 rounded-xl text-pink-200 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all resize-none shadow-inner"
          rows="4"
        />
      </div>

      {/* Emotion Selection */}
      <div className="mb-6">
        <label className="block text-pink-300 mb-3 font-semibold tracking-wide">
          <Heart className="inline mr-2" size={16} />
          How did you feel?
        </label>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(emotionColors).map(([key, emotion]) => {
            const IconComponent = emotion.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedEmotion(key)}
                className={`p-3 rounded-xl border-2 transition-all transform hover:scale-105 ${
                  selectedEmotion === key
                    ? 'border-pink-400 bg-pink-500/10'
                    : 'border-pink-700 hover:border-pink-400 bg-black'
                }`}
              >
                <IconComponent
                  size={20}
                  style={{ color: emotion.color }}
                  className="mx-auto mb-1"
                />
                <div className="text-xs text-pink-300 text-center">{emotion.name}</div>
              </button>
            );
          })}
        </div>
      </div>

<Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg border-2 border-pink-400"
      >
        Save Memory
      </button>
    </div>
  </div>
);
}


//   const PastDaysModal = ({ onClose }) => {
//     const emotionData = getEmotionCounts();
    
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-pink-500 shadow-lg rounded-2xl p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto">


//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-3xl font-bold text-pink-400 flex items-center gap-2 tracking-wide">
//             <TrendingUp size={24} />
//             Emotions in the Last 30 Days
//           </h2>
//           <button onClick={onClose} className="text-pink-400 hover:text-pink-300 transition-all">
//             <ArrowLeft size={24} />
//           </button>
//         </div>

//          {/* Bar Chart */}
//         <div className="mb-10">
//           {emotionData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={400}>
//               <BarChart data={emotionData} margin={{ top: 20, right: 30, left: 10, bottom: 60 }}>
//                 <XAxis 
//                   dataKey="emotion" 
//                   tick={{ fill: '#f472b6', fontSize: 12 }}
//                   angle={-45}
//                   textAnchor="end"
//                   height={80}
//                 />
//                 <YAxis tick={{ fill: '#f472b6' }} />
//                 <Tooltip 
//                   contentStyle={{ backgroundColor: '#111', borderColor: '#f472b6', borderRadius: '10px' }}
//                   labelStyle={{ color: '#f472b6' }}
//                   itemStyle={{ color: '#f472b6' }}
//                 />
//                 <Bar dataKey="count" radius={[8, 8, 0, 0]}>
//                   {emotionData.map((entry, index) => (
//                     <Cell key={`bar-${index}`} fill={entry.color} />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="text-center py-12 text-pink-300">
//               <Heart size={48} className="mx-auto mb-4 opacity-50" />
//               <p className="text-lg mb-2">No emotions recorded yet</p>
//               <p className="text-sm">Start adding daily memories to see your emotion chart!</p>
//             </div>
//           )}
//         </div>

//         {/* Emotion Legend */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
//           {Object.entries(emotionColors).map(([key, emotion]) => {
//             const IconComponent = emotion.icon;
//             return (
//               <div key={key} className="flex items-center gap-2 p-2 rounded-xl border border-pink-700 bg-black/50 shadow-inner">
//                 <IconComponent size={18} style={{ color: emotion.color }} />
//                 <span className="text-sm text-pink-300 font-medium">{emotion.name}</span>
//               </div>
//             );
//           })}
//         </div>

//       </div>
//     </div>
//   );
// };

const PastDaysModal = ({ onClose }) => {
  const emotionData = getEmotionCounts();
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-pink-500 shadow-lg rounded-2xl p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-pink-400 flex items-center gap-2 tracking-wide">
            <TrendingUp size={24} />
            Emotions in the Last 30 Days
          </h2>
          <button onClick={onClose} className="text-pink-400 hover:text-pink-300 transition-all">
            <ArrowLeft size={24} />
          </button>
        </div>

        {/* Bar Chart - Modified Version */}
        <div className="mb-10">
          {emotionData.length > 0 ? (
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={emotionData} 
                  margin={{ top: 20, right: 30, left: 10, bottom: 10 }} // Reduced bottom margin
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f472b6" opacity={0.3} />
                  
                  {/* Hidden XAxis */}
                  <XAxis 
                    dataKey="emotion" 
                    tick={false} // Hide ticks
                    axisLine={false} // Hide axis line
                  />
                  
                  {/* Hidden YAxis */}
                  <YAxis 
                    tick={false}
                    axisLine={false}
                  />
                  
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#111', 
                      borderColor: '#f472b6', 
                      borderRadius: '10px',
                      boxShadow: '0 0 20px rgba(244, 114, 182, 0.3)'
                    }}
                    formatter={(value, name) => [
                      `${value} days`, 
                      name
                    ]}
                    labelStyle={{ 
                      color: '#f472b6',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}
                    itemStyle={{ 
                      color: '#f9a8d4',
                      fontSize: '13px'
                    }}
                  />
                  
                  <Bar 
                    dataKey="count" 
                    radius={[8, 8, 0, 0]}
                    animationDuration={1500}
                  >
                    {emotionData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke="#000"
                        strokeWidth={1}
                        style={{
                          filter: 'drop-shadow(0 0 5px rgba(244, 114, 182, 0.5))'
                        }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-12 text-pink-300">
              <Heart size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">No emotions recorded yet</p>
              <p className="text-sm">Start adding daily memories to see your emotion chart!</p>
            </div>
          )}
        </div>

        {/* Emotion Legend - Optional */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {Object.entries(emotionColors).map(([key, emotion]) => {
            const IconComponent = emotion.icon;
            return (
              <div 
                key={key} 
                className="flex items-center gap-2 p-2 rounded-xl border border-pink-700 bg-black/50 shadow-inner hover:bg-pink-500/10 transition-colors"
              >
                <IconComponent size={18} style={{ color: emotion.color }} />
                <span className="text-sm text-pink-300 font-medium">
                  {emotion.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

if (isSetupMode) {
  return (
    //<div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex flex-col items-center justify-center px-4 py-10">
      
      
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-10">
      
      <div className="max-w-md w-full bg-black/80 border-2 border-pink-500 rounded-3xl shadow-xl p-8 space-y-6">
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
      


        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-pink-400 mb-2">Start Your Journey ✨</h1>
          <p className="text-pink-300 text-sm">When did your beautiful relationship begin?</p>
        </div>

        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-pink-500/20 p-4 rounded-full border-2 border-pink-500">
            <Heart className="text-pink-400" size={32} />
          </div>
        </div>

        {/* Date Picker */}
        <div>
          <label className="block text-pink-400 mb-2 font-semibold text-center">
            <Calendar className="inline mr-2" size={16} />
            Relationship Start Date
          </label>
          <input
            type="date"
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setPickedDate(new Date(e.target.value))}
            className="w-full p-3 bg-black border-2 border-pink-500 rounded-lg text-pink-400 placeholder-pink-300 focus:outline-none focus:border-pink-400"
          />
        </div>

        {/* Message */}
        <p className="text-pink-300 text-xs text-center mt-2 italic">
          This will be your Day 1 together 💕
        </p>

        {/* Button */}
        <button
          disabled={!pickedDate}
          onClick={() => startRelationship(pickedDate)}
          className={`w-full mt-4 py-3 rounded-lg font-semibold transition-all border-2 ${
            pickedDate
              ? "bg-pink-600 hover:bg-pink-700 text-white border-pink-500"
              : "bg-zinc-800 text-gray-500 border-gray-700 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

  return (
    
<div className="min-h-screen bg-black text-white p-6">
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


      <div className="max-w-4xl mx-auto p-6">

      

        {/* Header */}
        <div className="text-center mb-8">
<h1 className="text-5xl font-extrabold tracking-tight text-pink-400 mb-2">
  Hey, Soul Seeker ✨
</h1>

          <p className="text-pink-300">{getCurrentDateString()}</p>
        </div>

        {/* Main Card */}
        <div className="bg-black border-2 border-pink-500 rounded-2xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-pink-500/20 p-3 rounded-full border-2 border-pink-500">
                <Heart className="text-pink-400" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-pink-400">Our Journey</h2>
                <p className="text-pink-300">Track your love story, day by day</p>
              </div>
            </div>
            <div className="bg-pink-600 p-3 rounded-full border-2 border-pink-500">
              <Sparkles className="text-white" size={24} />
            </div>
          </div>

          {/* Current Day Display */}
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-pink-400 mb-2">
              Day {currentDay}
            </div>
            {totalYears > 0 && (
              <div className="flex items-center justify-center gap-2 text-pink-400">
                <Crown size={20} />
                <span className="text-xl font-semibold">
                  Happy {totalYears} {totalYears === 1 ? 'Year' : 'Years'} Together!
                </span>
                <Crown size={20} />
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => {
                setSelectedDay(currentDay);
                setShowDayDetail(true);
              }}
              className="bg-pink-600 hover:bg-pink-700 text-white py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 border-2 border-pink-500"
            >
              <Edit3 size={20} />
              Add Today's Memory
            </button>
            
            <button
              onClick={() => setShowPastDays(true)}
              className="bg-black border-2 border-pink-500 text-pink-400 py-4 px-6 rounded-lg font-semibold hover:bg-pink-500/10 transition-all flex items-center justify-center gap-2"
            >
              <TrendingUp size={20} />
              View Emotions Chart
            </button>

            {/* Current End Journey Button - REPLACE THIS */}
<div className="fixed bottom-6 left-6 z-10">
  <button
    onClick={() => setShowEndConfirm(true)}  // This triggers the dialog
    className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white py-3 px-6 rounded-xl font-semibold transition-all flex items-center gap-3 border-2 border-pink-500 shadow-lg hover:shadow-xl text-lg"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-6 h-6" 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path 
        fillRule="evenodd" 
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
        clipRule="evenodd" 
      />
    </svg>
    End Journey
  </button>
</div>
{showEndConfirm && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-black border-2 border-pink-500 p-6 rounded-xl max-w-sm">
      <h3 className="text-xl text-pink-400 mb-4">End Current Journey?</h3>
      <p className="text-pink-300 mb-6">This will permanently delete all relationship data and start fresh.</p>
      <div className="flex gap-4">
        <button 
          onClick={() => setShowEndConfirm(false)}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg"
        >
          Cancel
        </button>
        <button 
          onClick={() => {
            endJourney();
            setShowEndConfirm(false);
          }}
          className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}
            
          </div>



{/* Today's Entry */}
{/* Today's Entry - Icons Only Version */}
<div className="mt-8">
  <h3 className="text-xl font-semibold text-pink-400 mb-4">Today's Memories</h3>

  <div className="bg-black border-2 border-pink-600 rounded-lg p-4">
    {todaysMemories.length > 0 ? (
      todaysMemories.map((memory, i) => (
        <div 
          key={i} 
          className="border border-pink-500 p-4 mb-4 rounded-2xl bg-black/70 shadow-lg transition-transform hover:scale-[1.01]"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Left Column - Emoji + Buttons */}
            <div className="flex flex-row sm:flex-col items-center sm:items-start gap-3 sm:gap-2">
              {/* Emotion Icon */}
              {memory.emotion && (
                <div className="p-2 rounded-full border-2 border-pink-500">
                  {React.createElement(emotionColors[memory.emotion]?.icon, {
                    size: 24,
                    style: { color: emotionColors[memory.emotion]?.color || "#fff" },
                  })}
                </div>
              )}
              
              {/* Action Buttons - Icons Only */}
              <div className="flex gap-2 sm:mt-2">
                <button
                  onClick={() => {
                    setSelectedDay(currentDay);
                    setEditingEntry({ ...memory, index: i });
                    setShowDayDetail(true);
                  }}
                  className="flex items-center justify-center text-xs bg-pink-600/30 hover:bg-pink-600/50 text-pink-200 border border-pink-500 p-2 rounded-full transition-all"
                  aria-label="Edit"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={async () => {
                    if (!user || !memory.id) return;
                    const todayKey = getTodayKey();
                    const memDocRef = doc(
                      db,
                      "users",
                      user.uid,
                      "ourTimeline",
                      todayKey,
                      "memories",
                      memory.id
                    );
                    try {
                      await deleteDoc(memDocRef);
                      await loadEntries();
                    } catch (err) {
                      console.error("❌ Failed to delete entry:", err);
                    }
                  }}
                  className="flex items-center justify-center text-xs bg-red-900/30 hover:bg-red-900/50 text-red-300 border border-red-500 p-2 rounded-full transition-all"
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="flex-1 text-pink-300">
              <div className="font-semibold sm:-mt-1">
                <span>{emotionColors[memory.emotion]?.name || "No Emotion"}</span>
              </div>
              
              {memory.note && (
                <div className="mt-2 text-sm sm:text-base">
                  {memory.note}
                </div>
              )}
              
              {memory.photo && (
                <div className="mt-3">
                  <img
                    src={memory.photo}
                    alt="Memory"
                    className="h-36 w-full rounded-lg border-2 border-pink-600 cursor-pointer object-cover shadow-md hover:scale-105 transition-transform"
                    onClick={() => setPreviewImageUrl(memory.photo)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center py-8 text-pink-300">
        <Heart size={32} className="mx-auto mb-2 opacity-50" />
        <p>No entries for today yet</p>
        <p className="text-sm">Click "Add Today's Memory" to get started!</p>
      </div>
    )}
  </div>
</div>


{/* ✅ Render modal outside the map loop */}
{showDayDetail && (
  <DayDetailModal
    day={selectedDay}
    editingEntry={editingEntry}
    onClose={() => {
      setShowDayDetail(false);
      setEditingEntry(null);
    }}
    onSave={saveDayEntry}
  />
)}


        {/* Past Days Modal */}
        {showPastDays && (
          <PastDaysModal onClose={() => setShowPastDays(false)} />
        )}

{previewImageUrl && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
    <div className="relative bg-black border-2 border-pink-600 rounded-2xl shadow-xl max-w-3xl w-full mx-4 overflow-hidden">
      
      {/* Image Container */}
      <div className="p-4">
        <img
          src={previewImageUrl}
          alt="Full Memory"
          className="w-full h-auto rounded-lg object-contain max-h-[80vh] transition-transform duration-300 hover:scale-[1.01]"
        />
      </div>

      {/* Caption / Close Button */}
      <div className="absolute top-3 right-3">
        <button
          onClick={() => setPreviewImageUrl(null)}
          className="bg-pink-600 hover:bg-pink-700 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          aria-label="Close image preview"
        >
          ✕
        </button>
      </div>

      {/* Optional Caption or Tip */}
      <div className="text-center text-sm text-pink-300 py-2">
        Click ✕ to close
      </div>
    </div>
  </div>
)}

        
        </div>
      </div>
    </div>
  );
};

export default RelationshipTracker;


