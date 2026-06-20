// import { useState, useEffect } from 'react';
// import { db } from "../services/firebase";
// import { collection, addDoc, query, where, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
// import { useAuth } from "../context/AuthContext"; // if you're using a context
// import confetti from "canvas-confetti";
// import { useNavigate } from 'react-router-dom';


// import { 
//   ArrowLeft, 
//   Plus, 
//   Clock,
//   CheckCircle,
//   Sun,
//   Heart,
//   Coffee,
//   Smile,
//   Target,
//   MessageCircle,
//   Bell,
//   BellOff,
//   Edit3,
//   Calendar,
//   Crown,
//   Pencil,
//   Trash2
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const goalCategories = [
//   { id: 'dating', name: 'Dating', icon: Heart, color: 'from-pink-500 to-rose-500' },
//   { id: 'social', name: 'Social', icon: Smile, color: 'from-pink-400 to-pink-600' },
//   { id: 'personal', name: 'Personal', icon: Target, color: 'from-pink-500 to-purple-500' },
//   { id: 'wellness', name: 'Wellness', icon: Coffee, color: 'from-pink-600 to-red-500' }
// ];

// const goalSuggestions = {
//   dating: [
//     "Start a meaningful conversation with someone new",
//     "Be authentic in my interactions today",
//     "Practice active listening on my date",
//     "Share something genuine about myself"
//   ],
//   social: [
//     "Make plans with a friend this week",
//     "Reach out to someone I haven't talked to",
//     "Practice being more open in conversations",
//     "Step out of my comfort zone socially"
//   ],
//   personal: [
//     "Take 10 minutes for self-reflection",
//     "Do something that makes me feel confident",
//     "Learn something new today",
//     "Practice self-compassion"
//   ],
//   wellness: [
//     "Take a mindful walk outside",
//     "Drink enough water today",
//     "Get 7+ hours of sleep tonight",
//     "Do something active I enjoy"
//   ]
// };

// const reminderTimes = [
//   { id: 'morning', label: 'Morning (9 AM)', time: '09:00' },
//   { id: 'afternoon', label: 'Afternoon (2 PM)', time: '14:00' },
//   { id: 'evening', label: 'Evening (7 PM)', time: '19:00' },
//   { id: 'night', label: 'Night (9 PM)', time: '21:00' }
// ];


// export default function SunriseIntentions() {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [todayGoal, setTodayGoal] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [showForm, setShowForm] = useState(false);
//   const [todayNote, setTodayNote] = useState('');
//   const [reminderEnabled, setReminderEnabled] = useState(false);
//   const [selectedReminder, setSelectedReminder] = useState('evening');
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [goals, setGoals] = useState([]);
//   const { user } = useAuth(); // assumes you have an auth context
//   const [editGoalId, setEditGoalId] = useState(null);
//   const navigate = useNavigate();
//   const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);
//   const [loading, setLoading] = useState(true);
//   const [goalFilter, setGoalFilter] = useState("today");


// useEffect(() => {
//     if (!user) return;
//     const q = query(collection(db, "users", user.uid, "sunriseGoals"), where("date", "==", selectedDate));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const fetchedGoals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setGoals(fetchedGoals);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, [user, selectedDate]);

//   const filteredGoals = () => {
//     const today = new Date().toISOString().split("T")[0];
//     return goals.filter(goal => {
//       if (goalFilter === "today") return goal.date === today;
//       if (goalFilter === "completed") return goal.completed;
//       if (goalFilter === "pending") return !goal.completed;
//       return true;
//     });
//   };



//   const getTimeOfDay = () => {
//     const hour = currentTime.getHours();
//     if (hour < 12) return { greeting: 'Good Morning', icon: Sun, color: 'from-pink-400 to-rose-500' };
//     if (hour < 17) return { greeting: 'Good Afternoon', icon: Sun, color: 'from-pink-500 to-rose-500' };
//     return { greeting: 'Good Evening', icon: Sun, color: 'from-pink-600 to-rose-600' };
//   };

//   const timeOfDay = getTimeOfDay();
//   const TimeIcon = timeOfDay.icon;

// const handleAddGoal = async () => {
//   console.log("clicked ✅");
//   console.log("Goal:", todayGoal);
//   console.log("Category:", selectedCategory);
//   console.log("User:", user);

//   if (!todayGoal.trim() || !selectedCategory || !user) {
//     console.log("❌ Missing required data");
//     return;
//   }

//   const goalData = {
//     text: todayGoal,
//     category: selectedCategory,
//     date: new Date().toISOString().split('T')[0],
//     completed: false,
//     note: todayNote,
//     reminderEnabled,
//     reminderTime: selectedReminder,
//     createdAt: new Date()
//   };

//     try {
//       if (editGoalId) {
//         const ref = doc(db, "users", user.uid, "sunriseGoals", editGoalId);
//         await updateDoc(ref, goalData);
//         setEditGoalId(null);
//       } else {
//         await addDoc(collection(db, "users", user.uid, "sunriseGoals"), goalData);
//       }
//     } catch (e) {
//       console.error("Failed to add/update goal", e);
//     }

//   // Reset
//   setTodayGoal('');
//   setTodayNote('');
//   setSelectedCategory('');
//   setReminderEnabled(false);
//   setShowForm(false);
//   setShowSuggestions(false);
// };


//   const toggleGoalComplete = async (id, current) => {
//     await updateDoc(doc(db, "users", user.uid, "sunriseGoals", id), { completed: !current });
//     if (!current) confetti({ particleCount: 100, spread: 70 });
//   };

//     const handleDeleteGoal = async (id) => {
//     await deleteDoc(doc(db, "users", user.uid, "sunriseGoals", id));
//   };

//   const handleEditGoal = (goal) => {
//   setTodayGoal(goal.text);
//   setTodayNote(goal.note || '');
//   setSelectedCategory(goal.category);
//   setReminderEnabled(goal.reminderEnabled);
//   setSelectedReminder(goal.reminderTime || 'evening');
//   setEditGoalId(goal.id);
//   setShowForm(true);
// };



//   const getTodayGoals = () => {
//     const today = new Date().toISOString().split('T')[0];
//     return goals.filter(goal => goal.date === today);
//   };

//   const handleSuggestionSelect = (suggestion) => {
//     setTodayGoal(suggestion);
//     setShowSuggestions(false);
//   };

// const handleBackToDashboard = () => {
//   navigate('/dashboard'); // Replace with your actual dashboard route
// };


//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Header */}
//       <div className="bg-black border-b border-pink-500/20">
//         <div className="px-6 py-4">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={handleBackToDashboard}
//               className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors"
//             >
//               <ArrowLeft className="w-5 h-5" />
//               <span>Back</span>
//             </button>
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
//                 <Crown className="w-4 h-4 text-white" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="px-6 py-6">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           <div className="flex items-center space-x-3 mb-2">
//             <div className={`w-10 h-10 bg-gradient-to-br ${timeOfDay.color} rounded-full flex items-center justify-center`}>
//               <TimeIcon className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-semibold text-white">Sunrise Intentions</h1>
//               <p className="text-pink-400 text-sm">☀️ Set daily goals or moods.</p>
//             </div>
//           </div>
//         </div>

//         <div className="mb-6">
//   <label className="block mb-2 text-pink-400 text-sm font-medium">Select Date</label>
//   <input
//     type="date"
//     value={selectedDate}
//     onChange={(e) => setSelectedDate(e.target.value)}
//     max={new Date().toISOString().split("T")[0]} // prevent future dates
//     className="bg-black border border-pink-500/30 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-pink-500"
//   />
// </div>

// {selectedDate === new Date().toISOString().split("T")[0] && (
//   <>

//         {/* Add Goal Section */}
//         {!showForm ? (
//           <div 
//             onClick={() => setShowForm(true)}
//             className="bg-gradient-to-r from-pink-500/20 to-pink-600/20 border border-pink-500/30 rounded-2xl p-6 mb-6 hover:border-pink-500/50 transition-all cursor-pointer"
//           >
//             <div className="flex items-center space-x-4">
//               <Plus className="w-6 h-6 text-pink-500" />
//               <div>
//                 <h3 className="text-lg font-medium text-white">Set Today's Intention</h3>
//                 <p className="text-pink-300 text-sm">What do you want to focus on today?</p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-black border border-pink-500/30 rounded-2xl p-6 mb-6">
//             <h3 className="text-lg font-medium text-white mb-4">Create Your Daily Goal</h3>
            
//             {/* Category Selection */}
//             <div className="mb-4">
//               <p className="text-pink-400 text-sm mb-3">Choose a category:</p>
//               <div className="grid grid-cols-2 gap-3">
//                 {goalCategories.map((category) => {
//                   const IconComponent = category.icon;
//                   return (
//                     <button
//                       key={category.id}
//                       onClick={() => {
//                         setSelectedCategory(category.id);
//                         setShowSuggestions(true);
//                       }}
//                       className={`p-3 rounded-xl border transition-all ${
//                         selectedCategory === category.id
//                           ? 'border-pink-500 bg-pink-500/20'
//                           : 'border-pink-500/30 hover:border-pink-500/50'
//                       }`}
//                     >
//                       <IconComponent className="w-5 h-5 text-pink-500 mb-1" />
//                       <span className="text-black text-sm block">{category.name}</span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Suggestions */}
//             {showSuggestions && selectedCategory && (
//               <div className="mb-4">
//                 <p className="text-pink-400 text-sm mb-2">Suggestions for {goalCategories.find(c => c.id === selectedCategory)?.name}:</p>
//                 <div className="space-y-2">
//                   {goalSuggestions[selectedCategory]?.map((suggestion, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleSuggestionSelect(suggestion)}
//                       className="w-full text-left p-3 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/20 hover:border-pink-500/40 rounded-xl text-pink-200 hover:text-white transition-all text-sm"
//                     >
//                       {suggestion}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Goal Input */}
//             <div className="mb-4">
//               <textarea
//                 value={todayGoal}
//                 onChange={(e) => setTodayGoal(e.target.value)}
//                 placeholder="What's your intention for today?"
//                 className="w-full bg-black border border-pink-500/30 rounded-xl p-4 text-white placeholder-pink-400/60 focus:border-pink-500 focus:outline-none resize-none"
//                 rows="2"
//               />
//             </div>

//             {/* Quick Note */}
//             <div className="mb-4">
//               <div className="flex items-center space-x-2 mb-2">
//                 <Edit3 className="w-4 h-4 text-pink-400" />
//                 <p className="text-pink-400 text-sm">Add a quick note (optional):</p>
//               </div>
//               <textarea
//                 value={todayNote}
//                 onChange={(e) => setTodayNote(e.target.value)}
//                 placeholder="Any thoughts or reflections..."
//                 className="w-full bg-black border border-pink-500/30 rounded-xl p-3 text-white placeholder-pink-400/60 focus:border-pink-500 focus:outline-none resize-none"
//                 rows="2"
//               />
//             </div>

//             {/* Reminder Settings */}
//             <div className="mb-6">
//               <div className="flex items-center justify-between mb-3">
//                 <div className="flex items-center space-x-2">
//                   <Clock className="w-4 h-4 text-pink-400" />
//                   <p className="text-pink-400 text-sm">Set reminder</p>
//                 </div>
//                 <button
//                   onClick={() => setReminderEnabled(!reminderEnabled)}
//                   className={`p-2 rounded-lg transition-all ${
//                     reminderEnabled ? 'bg-pink-500 text-white' : 'bg-pink-500/20 text-pink-400'
//                   }`}
//                 >
//                   {reminderEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
//                 </button>
//               </div>
              
//               {reminderEnabled && (
//                 <div className="grid grid-cols-2 gap-2">
//                   {reminderTimes.map((reminder) => (
//                     <button
//                       key={reminder.id}
//                       onClick={() => setSelectedReminder(reminder.id)}
//                       className={`p-2 rounded-lg text-sm transition-all ${
//                         selectedReminder === reminder.id
//                           ? 'bg-pink-500 text-white'
//                           : 'bg-pink-500/20 text-pink-300 hover:bg-pink-500/30'
//                       }`}
//                     >
//                       {reminder.label}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex space-x-3">
//               <button
//                 onClick={handleAddGoal}
//                 disabled={!todayGoal.trim() || !selectedCategory}
//                 className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 disabled:from-pink-500/30 disabled:to-pink-600/30 text-white px-6 py-3 rounded-xl font-medium transition-all disabled:cursor-not-allowed"
//               >
//                 Set Goal
//               </button>
//               <button
//                 onClick={() => {
//                   setShowForm(false);
//                   setShowSuggestions(false);
//                 }}
//                 className="px-6 py-3 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 text-pink-300 rounded-xl font-medium transition-all"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//                     </>
// )}

//         {/* Today's Goals */}
//     <div className="space-y-3">
//         {loading ? <p className="text-pink-400">Loading...</p> : getTodayGoals().length === 0 ? (
//           <div className="text-center text-pink-400">No goals yet. Add one!</div>
//         ) : getTodayGoals().map(goal => {
//           const CatIcon = goalCategories.find(c => c.id === goal.category)?.icon || Target;
//           return (
//             <motion.div
//               key={goal.id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.2 }}
//               className={`border rounded-xl p-4 ${goal.completed ? 'bg-pink-600/10' : 'bg-black border-pink-500/20'}`}
//             >
//               <div className="flex items-start gap-3">
//                 <button onClick={() => toggleGoalComplete(goal.id, goal.completed)}>
//                   <CheckCircle className={`w-6 h-6 ${goal.completed ? 'text-pink-400' : 'text-pink-600/50'}`} />
//                 </button>
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <CatIcon className="w-4 h-4 text-pink-400" />
//                     <span className="text-sm text-pink-300">{goal.category}</span>
//                     {goal.reminderEnabled && <Bell className="w-4 h-4 text-pink-400" />}
//                   </div>
//                   <p className={`text-white ${goal.completed ? 'line-through text-pink-300/50' : ''}`}>{goal.text}</p>
//                   {goal.note && (
//                     <div className="mt-2 text-sm text-pink-200 bg-pink-500/10 border border-pink-500/20 p-2 rounded-lg">
//                       <MessageCircle className="w-4 h-4 inline-block mr-1" /> {goal.note}
//                     </div>
//                   )}
//                   <div className="flex gap-3 mt-3">
//                     <button onClick={() => handleEditGoal(goal)} className="text-pink-500 hover:bg-pink-500/10">
//                       <Pencil className="w-4 h-4 inline-block mr-1" /> Edit
//                     </button>
//                     <button onClick={() => handleDeleteGoal(goal.id)} className="text-red-500 hover:bg-red-500/10">
//                       <Trash2 className="w-4 h-4 inline-block mr-1" /> Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>

//         {/* Quick Stats */}
//         <div className="bg-black border border-pink-500/30 rounded-2xl p-6">
//           <h3 className="text-lg font-semibold text-white mb-4">Today's Progress</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="text-center">
//               <p className="text-2xl font-bold text-pink-500">{getTodayGoals().length}</p>
//               <p className="text-pink-400 text-sm">Goals Set</p>
//             </div>
//             <div className="text-center">
//               <p className="text-2xl font-bold text-pink-400">
//                 {getTodayGoals().filter(g => g.completed).length}
//               </p>
//               <p className="text-pink-400 text-sm">Completed</p>
//             </div>
//           </div>

          
//           {getTodayGoals().length > 0 && (
//             <div className="mt-4">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-pink-400 text-sm">Completion Rate</span>
//                 <span className="text-white text-sm font-medium">
//                   {Math.round((getTodayGoals().filter(g => g.completed).length / getTodayGoals().length) * 100)}%
//                 </span>
//               </div>
//               <div className="w-full bg-pink-500/20 rounded-full h-2">
//                 <div 
//                   className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full transition-all duration-500"
//                   style={{ 
//                     width: `${(getTodayGoals().filter(g => g.completed).length / getTodayGoals().length) * 100}%` 
//                   }}
//                 ></div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import { db } from "../services/firebase";
import { collection, addDoc, query, where, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // if you're using a context
import confetti from "canvas-confetti";
import { useNavigate } from 'react-router-dom';


import { 
  ArrowLeft, 
  Plus, 
  Clock,
  CheckCircle,
  Sun,
  Heart,
  Coffee,
  Smile,
  Target,
  MessageCircle,
  Bell,
  BellOff,
  Edit3,
  Calendar,
  Crown,
  Pencil,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';

const goalCategories = [
  { id: 'dating', name: 'Dating', icon: Heart, color: 'from-pink-500 to-rose-500' },
  { id: 'social', name: 'Social', icon: Smile, color: 'from-pink-400 to-pink-600' },
  { id: 'personal', name: 'Personal', icon: Target, color: 'from-pink-500 to-purple-500' },
  { id: 'wellness', name: 'Wellness', icon: Coffee, color: 'from-pink-600 to-red-500' }
];

const goalSuggestions = {
  dating: [
    "Start a meaningful conversation with someone new",
    "Be authentic in my interactions today",
    "Practice active listening on my date",
    "Share something genuine about myself"
  ],
  social: [
    "Make plans with a friend this week",
    "Reach out to someone I haven't talked to",
    "Practice being more open in conversations",
    "Step out of my comfort zone socially"
  ],
  personal: [
    "Take 10 minutes for self-reflection",
    "Do something that makes me feel confident",
    "Learn something new today",
    "Practice self-compassion"
  ],
  wellness: [
    "Take a mindful walk outside",
    "Drink enough water today",
    "Get 7+ hours of sleep tonight",
    "Do something active I enjoy"
  ]
};

const reminderTimes = [
  { id: 'morning', label: 'Morning (9 AM)', time: '09:00' },
  { id: 'afternoon', label: 'Afternoon (2 PM)', time: '14:00' },
  { id: 'evening', label: 'Evening (7 PM)', time: '19:00' },
  { id: 'night', label: 'Night (9 PM)', time: '21:00' }
];


export default function SunriseIntentions() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todayGoal, setTodayGoal] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [todayNote, setTodayNote] = useState('');
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState('evening');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [goals, setGoals] = useState([]);
  const { user } = useAuth(); // assumes you have an auth context
  const [editGoalId, setEditGoalId] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [goalFilter, setGoalFilter] = useState("today");


useEffect(() => {
  if (!user) return;

  const q = collection(db, "users", user.uid, "sunriseGoals");
  

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const fetchedGoals = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setGoals(fetchedGoals);
    setLoading(false);
  });

  return () => unsubscribe();
}, [user]);




const filteredGoals = () => {
  const today = new Date().toISOString().split("T")[0];

  return goals.filter((goal) => {
    const goalDate = typeof goal.date === 'string'
      ? goal.date
      : goal.date?.toDate?.().toISOString().split("T")[0]; // handle Timestamp

    if (goalFilter === "today") return goalDate === today;
    if (goalFilter === "completed") return goal.completed === true;
    if (goalFilter === "pending") return goal.completed === false;
    return true; // "all"
  });
};




  


  const getTimeOfDay = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { greeting: 'Good Morning', icon: Sun, color: 'from-pink-400 to-rose-500' };
    if (hour < 17) return { greeting: 'Good Afternoon', icon: Sun, color: 'from-pink-500 to-rose-500' };
    return { greeting: 'Good Evening', icon: Sun, color: 'from-pink-600 to-rose-600' };
  };

  const timeOfDay = getTimeOfDay();
  const TimeIcon = timeOfDay.icon;

const handleAddGoal = async () => {
  console.log("clicked ✅");
  console.log("Goal:", todayGoal);
  console.log("Category:", selectedCategory);
  console.log("User:", user);

  if (!todayGoal.trim() || !selectedCategory || !user) {
    console.log("❌ Missing required data");
    return;
  }

  const goalData = {
    text: todayGoal,
    category: selectedCategory,
    date: new Date().toISOString().split('T')[0],
    completed: false,
    note: todayNote,
    reminderEnabled,
    reminderTime: selectedReminder,
    createdAt: new Date()
  };

    try {
      if (editGoalId) {
        const ref = doc(db, "users", user.uid, "sunriseGoals", editGoalId);
        await updateDoc(ref, goalData);
        setEditGoalId(null);
      } else {
        await addDoc(collection(db, "users", user.uid, "sunriseGoals"), goalData);
      }
    } catch (e) {
      console.error("Failed to add/update goal", e);
    }

  // Reset
  setTodayGoal('');
  setTodayNote('');
  setSelectedCategory('');
  setReminderEnabled(false);
  setShowForm(false);
  setShowSuggestions(false);
};


  const toggleGoalComplete = async (id, current) => {
    await updateDoc(doc(db, "users", user.uid, "sunriseGoals", id), { completed: !current });
    if (!current) confetti({ particleCount: 100, spread: 70 });
  };

    const handleDeleteGoal = async (id) => {
    await deleteDoc(doc(db, "users", user.uid, "sunriseGoals", id));
  };

  const handleEditGoal = (goal) => {
  setTodayGoal(goal.text);
  setTodayNote(goal.note || '');
  setSelectedCategory(goal.category);
  setReminderEnabled(goal.reminderEnabled);
  setSelectedReminder(goal.reminderTime || 'evening');
  setEditGoalId(goal.id);
  setShowForm(true);
};



  const getTodayGoals = () => {
    const today = new Date().toISOString().split('T')[0];
    return goals.filter(goal => goal.date === today);
  };

  const handleSuggestionSelect = (suggestion) => {
    setTodayGoal(suggestion);
    setShowSuggestions(false);
  };

const handleBackToDashboard = () => {
  navigate('/dashboard'); // Replace with your actual dashboard route
};


  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black border-b border-pink-500/20">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToDashboard}
              className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Helmet>
              <meta name="robots" content="noindex,nofollow" />
            </Helmet>

      <div className="px-6 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`w-10 h-10 bg-gradient-to-br ${timeOfDay.color} rounded-full flex items-center justify-center`}>
              <TimeIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">Sunrise Intentions</h1>
              <p className="text-pink-400 text-sm">☀️ Set daily goals or moods.</p>
            </div>
          </div>
        </div>

        {/* Add Goal Section */}
        {!showForm ? (
          <div 
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-pink-500/20 to-pink-600/20 border border-pink-500/30 rounded-2xl p-6 mb-6 hover:border-pink-500/50 transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <Plus className="w-6 h-6 text-pink-500" />
              <div>
                <h3 className="text-lg font-medium text-white">Set Today's Intention</h3>
                <p className="text-pink-300 text-sm">What do you want to focus on today?</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-black border border-pink-500/30 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">Create Your Daily Goal</h3>
            
            {/* Category Selection */}
            <div className="mb-4">
              <p className="text-pink-400 text-sm mb-3">Choose a category:</p>
              <div className="grid grid-cols-2 gap-3">
                {goalCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setShowSuggestions(true);
                      }}
                      className={`p-3 rounded-xl border transition-all ${
                        selectedCategory === category.id
                          ? 'border-pink-500 bg-pink-500/20'
                          : 'border-pink-500/30 hover:border-pink-500/50'
                      }`}
                    >
                      <IconComponent className="w-5 h-5 text-pink-500 mb-1" />
                      <span className="text-black text-sm block">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Suggestions */}
            {showSuggestions && selectedCategory && (
              <div className="mb-4">
                <p className="text-pink-400 text-sm mb-2">Suggestions for {goalCategories.find(c => c.id === selectedCategory)?.name}:</p>
                <div className="space-y-2">
                  {goalSuggestions[selectedCategory]?.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className="w-full text-left p-3 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/20 hover:border-pink-500/40 rounded-xl text-pink-200 hover:text-white transition-all text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Goal Input */}
            <div className="mb-4">
              <textarea
                value={todayGoal}
                onChange={(e) => setTodayGoal(e.target.value)}
                placeholder="What's your intention for today?"
                className="w-full bg-black border border-pink-500/30 rounded-xl p-4 text-white placeholder-pink-400/60 focus:border-pink-500 focus:outline-none resize-none"
                rows="2"
              />
            </div>

            {/* Quick Note */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Edit3 className="w-4 h-4 text-pink-400" />
                <p className="text-pink-400 text-sm">Add a quick note (optional):</p>
              </div>
              <textarea
                value={todayNote}
                onChange={(e) => setTodayNote(e.target.value)}
                placeholder="Any thoughts or reflections..."
                className="w-full bg-black border border-pink-500/30 rounded-xl p-3 text-white placeholder-pink-400/60 focus:border-pink-500 focus:outline-none resize-none"
                rows="2"
              />
            </div>

            {/* Reminder Settings */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-pink-400" />
                  <p className="text-pink-400 text-sm">Set reminder</p>
                </div>
                <button
                  onClick={() => setReminderEnabled(!reminderEnabled)}
                  className={`p-2 rounded-lg transition-all ${
                    reminderEnabled ? 'bg-pink-500 text-white' : 'bg-pink-500/20 text-pink-400'
                  }`}
                >
                  {reminderEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                </button>
              </div>
              
              {reminderEnabled && (
                <div className="grid grid-cols-2 gap-2">
                  {reminderTimes.map((reminder) => (
                    <button
                      key={reminder.id}
                      onClick={() => setSelectedReminder(reminder.id)}
                      className={`p-2 rounded-lg text-sm transition-all ${
                        selectedReminder === reminder.id
                          ? 'bg-pink-500 text-white'
                          : 'bg-pink-500/20 text-pink-300 hover:bg-pink-500/30'
                      }`}
                    >
                      {reminder.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handleAddGoal}
                disabled={!todayGoal.trim() || !selectedCategory}
                className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 disabled:from-pink-500/30 disabled:to-pink-600/30 text-white px-6 py-3 rounded-xl font-medium transition-all disabled:cursor-not-allowed"
              >
                Set Goal
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setShowSuggestions(false);
                }}
                className="px-6 py-3 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 text-pink-300 rounded-xl font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-2 mb-4">
{["today", "all", "pending", "completed"].map((type) => (
    <button
      key={type}
      onClick={() => setGoalFilter(type)}
      className={`px-4 py-2 rounded-xl text-sm transition-all ${
        goalFilter === type
          ? "bg-pink-500 text-white"
          : "bg-pink-500/20 text-pink-300 hover:bg-pink-500/30"
      }`}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </button>
  ))}
</div>


        {/* Today's Goals */}
    <div className="space-y-3">
          {loading ? <p className="text-pink-400">Loading...</p> : filteredGoals().length === 0 ? (
  <div className="text-center text-pink-400">No goals yet. Add one!</div>
) : filteredGoals().map(goal => {

          const CatIcon = goalCategories.find(c => c.id === goal.category)?.icon || Target;
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`border rounded-xl p-4 ${goal.completed ? 'bg-pink-600/10' : 'bg-black border-pink-500/20'}`}
            >
              <div className="flex items-start gap-3">
                <button onClick={() => toggleGoalComplete(goal.id, goal.completed)}>
                  <CheckCircle className={`w-6 h-6 ${goal.completed ? 'text-pink-400' : 'text-pink-600/50'}`} />
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CatIcon className="w-4 h-4 text-pink-400" />
                    <span className="text-sm text-pink-300">{goal.category}</span>
                    {goal.reminderEnabled && <Bell className="w-4 h-4 text-pink-400" />}
                  </div>
                  <p className={`text-white ${goal.completed ? 'line-through text-pink-300/50' : ''}`}>{goal.text}</p>
                  {goal.note && (
                    <div className="mt-2 text-sm text-pink-200 bg-pink-500/10 border border-pink-500/20 p-2 rounded-lg">
                      <MessageCircle className="w-4 h-4 inline-block mr-1" /> {goal.note}
                    </div>
                  )}
                  <div className="flex gap-3 mt-3">
                    <button onClick={() => handleEditGoal(goal)} className="text-pink-500 hover:bg-pink-500/10">
                      <Pencil className="w-4 h-4 inline-block mr-1" /> Edit
                    </button>
                    <button onClick={() => handleDeleteGoal(goal.id)} className="text-red-500 hover:bg-red-500/10">
                      <Trash2 className="w-4 h-4 inline-block mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

        {/* Quick Stats */}

{["today", "all"].includes(goalFilter) && (
  <div className="bg-black border border-pink-500/30 rounded-2xl p-6 mt-6">
    <h3 className="text-lg font-semibold text-white mb-4">
      {goalFilter === "today" ? "Today's Progress" : "All Goals Progress"}
    </h3>

    <div className="grid grid-cols-2 gap-4">
      <div className="text-center">
        <p className="text-2xl font-bold text-pink-500">{filteredGoals().length}</p>
        <p className="text-pink-400 text-sm">Goals Set</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-pink-400">
          {filteredGoals().filter((g) => g.completed).length}
        </p>
        <p className="text-pink-400 text-sm">Completed</p>
      </div>
    </div>

    {filteredGoals().length > 0 && (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-pink-400 text-sm">Completion Rate</span>
          <span className="text-white text-sm font-medium">
            {Math.round(
              (filteredGoals().filter((g) => g.completed).length / filteredGoals().length) * 100
            )}
            %
          </span>
        </div>
        <div className="w-full bg-pink-500/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${
                (filteredGoals().filter((g) => g.completed).length / filteredGoals().length) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>
    )}
  </div>
)}


      </div>
    </div>
  );
}