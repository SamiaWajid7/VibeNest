// Calendar.jsx — Date Readiness Calendar with Black & Pink Theme

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { deleteDoc } from "firebase/firestore";
import { Helmet } from 'react-helmet';

import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc
} from "firebase/firestore";

import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ArrowLeft,
  Calendar,
  Sparkles,
  Moon,
  Sun,
  Stars,
  Plus,
  X,
  Check
} from "lucide-react";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,Cell 
    } from 'recharts';


export default function DateReadinessCalendar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [showVibeModal, setShowVibeModal] = useState(false);
  const [currentVibe, setCurrentVibe] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [vibeNote, setVibeNote] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check immediately
    checkIfMobile();
    
    // Set up event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);


  // Available vibes for marking dates
  const vibes = [
    { emoji: "💕", label: "Ready to meet", color: "text-pink-500" },
    { emoji: "✨", label: "Feeling Magical", color: "text-yellow-300" },
    { emoji: "🌙", label: "Mysterious Mood", color: "text-purple-400" },
    { emoji: "🔥", label: "High Energy and happiness", color: "text-red-400" },
    { emoji: "😔", label: " Low / Sad", color: "text-pink-300" },
    { emoji: "💫", label: " Spirituality is hitting", color: "text-blue-400" },
    { emoji: "😣", label: "Stressed", color: "text-pink-400" },
    { emoji: "🦋", label: "Transforming and Thoughtful", color: "text-purple-300" }
  ];

    useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

    const isNightTime = () => {
    const hour = currentTime.getHours();
    return hour >= 18 || hour <= 6;
  };

  useEffect(() => {
    if (!user) return;
    const docRef = doc(db, "calendarVibes", user.uid);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setMarkedDates(docSnap.data() || {});
      }
    });

    return () => unsubscribe();
  }, [user]);
 
const saveVibe = async () => {
  if (!selectedDate || !user || !currentVibe) return;

    const selected = new Date(selectedDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Strip time

    if (selected > today) {
    alert("You cannot mark a vibe for a future date.");
    return;
  }

  const docRef = doc(db, "users", user.uid, "calendarVibes", selectedDate);

  const newData = {
    vibe: currentVibe,
    note: vibeNote,
    timestamp: new Date().toISOString(), // Optional
  };

  await setDoc(docRef, newData);
  setMarkedDates((prev) => ({
    ...prev,
    [selectedDate]: newData,
  }));
  setShowVibeModal(false);
  setSelectedDate(null);
  setVibeNote("");
  setCurrentVibe("");
};

useEffect(() => {
  if (!user) return;

  const vibesRef = collection(db, "users", user.uid, "calendarVibes");

  const unsubscribe = onSnapshot(vibesRef, (snapshot) => {
    const vibes = {};
    snapshot.forEach(doc => {
      vibes[doc.id] = doc.data();
    });
    setMarkedDates(vibes);
  });

  return () => unsubscribe();
}, [user]);


const removeVibe = async () => {
  if (!selectedDate || !user) return;

  const docRef = doc(db, "users", user.uid, "calendarVibes", selectedDate);

  try {
    await deleteDoc(docRef); // ⬅️ delete the document from Firestore
    const newMarked = { ...markedDates };
    delete newMarked[selectedDate];
    setMarkedDates(newMarked);
    setShowVibeModal(false);
    setSelectedDate(null);
    setVibeNote("");
    setCurrentVibe("");
  } catch (error) {
    console.error("Error removing vibe:", error);
  }
};

const getMoodStats = () => {
  const moodCount = {};

  // First initialize all with count 0
  vibes.forEach(vibe => {
    const label = `${vibe.emoji} ${vibe.label}`;
    moodCount[label] = 0;
  });

  // Then count from markedDates
  Object.values(markedDates).forEach(entry => {
    if (entry?.vibe?.emoji && entry?.vibe?.label) {
      const label = `${entry.vibe.emoji} ${entry.vibe.label}`;
      if (label in moodCount) {
        moodCount[label]++;
      }
    }
  });

  // Convert to array for recharts
  return Object.entries(moodCount).map(([name, count]) => ({
    name,
    count
  }));
};



  
  
  // Calendar helpers
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

const handleDateClick = (day) => {
  const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
  const dateKey = clickedDate.toISOString().split('T')[0];
  
  setSelectedDate(dateKey);

  const existingData = markedDates[dateKey];
  setCurrentVibe(existingData?.vibe || ""); // this holds emoji + label
  setVibeNote(existingData?.note || "");

  setShowVibeModal(true);
};


  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
      const markedData = markedDates[dateKey];
      const markedVibe = markedData?.vibe;

      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-12 flex items-center justify-center cursor-pointer rounded-lg transition-all duration-200 relative
            ${isToday ? 'bg-pink-500/20 border border-pink-500' : 'hover:bg-pink-500/10'}
            ${markedVibe ? 'bg-pink-500/10' : ''}
          `}
        >
          <span className={`text-sm ${isToday ? 'text-pink-500 font-semibold' : 'text-white'}`}>
            {day}
          </span>
          {markedVibe && (
            <span className="absolute -top-1 -right-1 text-xs">
              {markedVibe.emoji}
            </span>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <Stars className="absolute top-20 left-20 w-4 h-4 text-pink-500/30 animate-pulse" />
        <Sparkles className="absolute top-32 right-32 w-3 h-3 text-pink-500/40 animate-pulse delay-700" />
        <Heart className="absolute bottom-40 left-40 w-5 h-5 text-pink-500/20 animate-pulse delay-1500" />
        {isNightTime() ? (
          <Moon className="absolute top-40 right-40 w-6 h-6 text-pink-500/30 animate-pulse delay-300" />
        ) : (
          <Sun className="absolute top-40 right-40 w-6 h-6 text-yellow-300/30 animate-pulse delay-300" />
        )}
      </div>

      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 border-b border-pink-500/50 backdrop-blur-sm">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center space-x-2 text-pink-500 hover:text-pink-400 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="flex items-center space-x-3">
          <Calendar className="w-8 h-8 text-pink-500 animate-pulse" />
          <div className="text-center">
            <h1 className="text-2xl font-light text-white">Date Readiness Calendar</h1>
            <p className="text-sm text-pink-500">Mark days and manifest vibes ✨</p>
          </div>
        </div>
        <div className="w-20"></div> {/* Spacer for centering */}
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-6 max-w-4xl mx-auto">
        {/* Calendar Header */}
        <div className="bg-pink-500/10 border border-pink-500/30 rounded-3xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded-full hover:bg-pink-500/20 transition"
            >
              <ChevronLeft className="w-6 h-6 text-pink-500" />
            </button>
            <h2 className="text-3xl font-light">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 rounded-full hover:bg-pink-500/20 transition"
            >
              <ChevronRight className="w-6 h-6 text-pink-500" />
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center text-pink-500 font-semibold py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {renderCalendarDays()}
          </div>
        </div>

        {/* Vibe Legend */}
        <div className="bg-pink-500/10 border border-pink-500/30 rounded-3xl p-8">
          <h3 className="text-xl font-light mb-6 text-center">Your Vibe Palette 🎨</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {vibes.map((vibe, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-3 rounded-lg bg-pink-500/5 border border-pink-500/20"
              >
                <span className="text-lg">{vibe.emoji}</span>
                <span className={`text-sm ${vibe.color}`}>{vibe.label}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-pink-500/70 text-sm mt-6">
            Click on any date to mark your vibe and manifest your energy ✨
          </p>
        </div>
      </main>

{/* Mood Analytics */}
{/* Mood Analytics */}
<div className="mt-12 bg-pink-500/10 border border-pink-500/30 rounded-3xl p-4 md:p-8">
  <h3 className="text-xl font-light mb-6 text-center">Mood Analytics 📊</h3>

  {getMoodStats().length > 0 ? (
    <div className="h-[300px] w-full overflow-x-auto">
      <div className="min-w-[500px] h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={getMoodStats()} 
            margin={{ 
              top: 20, 
              right: 30, 
              left: 20, 
              bottom: 10
            }}
            layout={isMobile ? "vertical" : "horizontal"}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f9a8d4" opacity={0.3} />
            
            {/* Hidden axes */}
            {isMobile ? (
              <>
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={100}
                  tick={false}
                  axisLine={false}
                />
                <XAxis 
                  type="number" 
                  tick={false}
                  axisLine={false}
                  allowDecimals={false}
                />
              </>
            ) : (
              <>
                <XAxis 
                  dataKey="name" 
                  tick={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={false}
                  axisLine={false}
                  allowDecimals={false}
                />
              </>
            )}
            
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                borderColor: '#ec4899',
                borderRadius: '0.5rem'
              }}
              formatter={(value, name) => [
                `${value} days`, 
                name
              ]}
            />
            
            <Bar 
              dataKey="count" 
              radius={isMobile ? [0, 4, 4, 0] : [4, 4, 0, 0]}
            >
              {getMoodStats().map((entry, index) => {
                // Determine color based on mood label
                let fillColor;
                if (entry.name.includes("Ready to meet")) fillColor = "#be185d"; // dark pink
                else if (entry.name.includes("Feeling Magical")) fillColor = "#facc15"; // yellow
                else if (entry.name.includes("Mysterious Mood")) fillColor = "#9333ea"; // purple
                else if (entry.name.includes("High Energy")) fillColor = "#ef4444"; // red
                else if (entry.name.includes("Low / Sad")) fillColor = "#f97316"; // orange
                else if (entry.name.includes("Spirituality")) fillColor = "#3b82f6"; // blue
                else if (entry.name.includes("Stressed")) fillColor = "#f9a8d4"; // light pink
                else if (entry.name.includes("Transforming")) fillColor = "#7e22ce"; // purple
                else fillColor = "#ec4899"; // default pink
                
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={fillColor} 
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  ) : (
    <p className="text-center text-pink-400">No moods tracked yet. Mark some vibes!</p>
  )}
</div>



{/* Vibe Selection Modal */}
{showVibeModal && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-gray-900 border border-pink-500/50 rounded-3xl p-8 max-w-md w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-light">Mark Your Mood for {selectedDate}</h3>
        <button
          onClick={() => {
            setShowVibeModal(false);
            setCurrentVibe("");
            setVibeNote("");
          }}
          className="text-gray-400 hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

{/* Vibe Selector Grid */}
<div className="grid grid-cols-2 gap-3 mb-4">
  {vibes.map((vibe, index) => (
    <button
      key={index}
      onClick={() => setCurrentVibe(vibe)}
      className={`flex items-center space-x-2 p-3 rounded-lg transition
        ${currentVibe.label === vibe.label ? "bg-pink-500/30 border border-pink-400" : "bg-pink-500/10 border border-pink-500/20"}
      `}
    >
      <span className="text-lg">{vibe.emoji}</span>
      <span className={`text-sm ${vibe.color}`}>{vibe.label}</span>
    </button>
  ))}
</div>

{/* Mood Note Input */}
<textarea
  value={vibeNote}
  onChange={(e) => setVibeNote(e.target.value)}
  placeholder="Write a short note for today..."
  className="w-full mb-4 p-3 rounded-lg bg-pink-500/10 border border-pink-500/20 text-white placeholder-pink-300 resize-none"
/>

{/* Save Vibe Button */}
<button
  onClick={saveVibe}
  disabled={!currentVibe}
  className="w-full p-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition disabled:opacity-50"
>
  Save Vibe
</button>

{/* Remove Button (only if existing data) */}
{selectedDate && markedDates[selectedDate] && (
  <button
    onClick={removeVibe}
    className="mt-4 w-full p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg transition"
  >
    Remove Vibe
  </button>
)}



    </div>
  </div>
)}
    </div>
  );
}