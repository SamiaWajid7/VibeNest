// import { useAuth } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { signOut } from "firebase/auth";
// import {
//   Heart,
//   LogOut,
//   Brain,
//   Sunrise,
//   Stars,
//   Bell,
//   User,
//   Sparkles,
//   Moon,
//   Sun,
//   CalendarCheck,
//   HeartHandshake,
//   MessageCircle,
//   Search
// } from "lucide-react";
// import { Menu, Settings, Shield, Mail } from "lucide-react";
// import { auth, db } from "../services/firebase";
// import { collection, query, where, onSnapshot, collectionGroup, getDocs } from "firebase/firestore";

// export default function Dashboard() {
//   const { user, loading } = useAuth();
//   const navigate = useNavigate();
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [profiles, setProfiles] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);


//   // Effect to manage the timer
//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Redirect if not logged in
//   useEffect(() => {
//     if (!loading && !user) navigate("/login");
//   }, [user, loading, navigate]);

// useEffect(() => {
//   if (!user?.uid) return;

//   const q = query(
//     collectionGroup(db, "messages"),
//     where("recipientId", "==", user.uid),
//     where("read", "==", false)
//   );

//   const unsubscribe = onSnapshot(q, (snapshot) => {
//     setUnreadCount(snapshot.size); // 🔢 Sets number of unread messages
//   });

//   return () => unsubscribe();
// }, [user]);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       window.location.reload();
//       navigate('/login');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };  

// const searchUsers = async () => {
//   if (!searchTerm.trim()) return;

//   console.log("Searching for:", searchTerm);

//   const usersRef = collection(db, "users");
//   const q = query(
//     usersRef,
//     where("username", ">=", searchTerm),
//     where("username", "<=", searchTerm + "\uf8ff")
//   );

//   try {
//     const querySnapshot = await getDocs(q);
//     const matchedProfiles = [];

//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       matchedProfiles.push({ uid: doc.id, ...data });
//     });

//     console.log("Matches found:", matchedProfiles);
//     setProfiles(matchedProfiles);
//   } catch (error) {
//     console.error("Search error:", error);
//   }
// };




//   const getGreeting = () => {
//     const hour = currentTime.getHours();
//     if (hour < 12) return "Good Morning";
//     if (hour < 17) return "Good Afternoon";
//     return "Good Evening";
//   };

//   const isNightTime = () => {
//     const hour = currentTime.getHours();
//     return hour >= 18 || hour <= 6;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="text-pink-500 text-xl animate-pulse">
//           ✨ Loading your sacred space...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black text-white overflow-x-hidden">
//       {/* Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Reuse your animated backgrounds */}
//         <Stars className="absolute top-20 left-20 w-4 h-4 text-pink-500/30 animate-pulse" />
//         <Sparkles className="absolute top-32 right-32 w-3 h-3 text-pink-500/40 animate-pulse delay-700" />
//         <Heart className="absolute bottom-40 left-40 w-5 h-5 text-pink-500/20 animate-pulse delay-1500" />
//         {isNightTime() ? (
//           <Moon className="absolute top-40 right-40 w-6 h-6 text-pink-500/30 animate-pulse delay-300" />
//         ) : (
//           <Sun className="absolute top-40 right-40 w-6 h-6 text-yellow-300/30 animate-pulse delay-300" />
//         )}
//       </div>

//       {/* Header */}
//       <header className="relative z-10 flex flex-col md:flex-row justify-between items-center p-6 border-b border-pink-500/50 backdrop-blur-sm space-y-4 md:space-y-0">
//         <div className="flex items-center space-x-3">
//           <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
//           <div>
//             <h1 className="text-2xl font-light text-white">Vibe nest</h1>
//             <p className="text-sm text-pink-500">Synce Hearts Share Vibes</p>
//           </div>
//         </div>
//   <div className="flex items-center space-x-4">
//     {/* Notification */}
//     <div className="relative group">
//     <Link to="/Messages" className="relative group">
//   <MessageCircle className="w-6 h-6 text-pink-500 cursor-pointer group-hover:scale-110 transition-all duration-300" />
  
//   {unreadCount > 0 && (
//     <span className="absolute -top-2 -right-2 text-[10px] bg-red-600 text-white rounded-full px-1.5 py-0.5 font-bold">
//       {unreadCount > 9 ? "9+" : unreadCount}
//     </span>
//   )}  
// </Link>

//     </div>

//           <Link to="/profile" className="flex items-center space-x-2 text-pink-500">
//             <User className="w-5 h-5" />
//             <span className="text-sm">{user?.email?.split("@")[0]}</span>
//           </Link>

// <button
//   onClick={() => setSidebarOpen(true)}
//   className="text-pink-500 hover:text-pink-300 transition-colors"
// >
//   <Menu className="w-6 h-6" />
// </button>
//   </div>
//       </header>

//       {/* Sidebar Overlay */}
// {sidebarOpen && (
//   <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setSidebarOpen(false)}></div>
// )}

// {/* Sidebar Panel */}
// <div
//   className={`fixed top-0 right-0 h-full w-64 bg-black border-l border-pink-500 z-50 shadow-lg p-6 space-y-6 transform transition-transform duration-300 ${
//     sidebarOpen ? "translate-x-0" : "translate-x-full"
//   }`}
// >
//   <button
//     onClick={() => setSidebarOpen(false)}
//     className="text-pink-500 text-xl font-bold absolute top-4 right-4"
//   >
//     ✕
//   </button>

//   <h2 className="text-xl font-semibold text-white mt-12">Menu</h2>
//   <Link to="/settings" className="text-pink-400 hover:text-white block">Settings</Link>
//   <Link to="/privacy" className="text-pink-400 hover:text-white block">Privacy Policy</Link>
//   <Link to="/contact" className="text-pink-400 hover:text-white block">Contact Us</Link>

// </div>

//       {/* Welcome and Features */}
//       <main className="relative z-10 p-6 max-w-5xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-light">{getGreeting()}, Soul Seeker ✨</h2>
//           <p className="text-pink-500">
//             {currentTime.toLocaleDateString("en-US", {
//               weekday: "long",
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </p>
//         </div>

// {/* --- Search Section --- */}
// <div className="mt-6 max-w-md mx-auto w-full z-10">
//   <div className="relative w-full">
//     <input
//       type="text"
//       placeholder="Search users by username..."
//       className="w-full px-5 py-3 pl-12 rounded-2xl border border-pink-500 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder:text-pink-300 shadow-md"
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//       onKeyDown={(e) => {
//         if (e.key === "Enter") {
//           e.preventDefault();
//           searchUsers();
//         }
//       }}
//     />
//     <Search className="absolute left-4 top-3.5 text-pink-400 w-5 h-5" />
//   </div>

//   {/* 🔍 Results (Attached Below) */}
//   <div className="mt-3 space-y-1">
//     {searchTerm.trim() !== "" && profiles.length > 0 && (
//       <div className="w-full bg-gray-800 border border-pink-500 rounded-xl overflow-y-auto shadow-md divide-y divide-pink-900/40">
//         {profiles.map((p) => (
//           <div
//             key={p.uid}
//             tabIndex={0}
//             role="button"
//             onClick={() => navigate(`/users/${p.uid}/profile/info`)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") navigate(`/users/${p.uid}/profile/info`);
//             }}
//             className="flex items-center justify-between px-4 py-3 hover:bg-pink-900/10 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400"
//           >
//             <div className="flex items-center gap-3 overflow-hidden">
//               <img
//                 src={p.profilePhotoURL || "/default.png"}
//                 alt={p.fullName || "User"}
//                 className="w-10 h-10 rounded-full object-cover shrink-0"
//               />
//               <div className="min-w-0">
//                 <div className="text-white font-medium truncate max-w-[150px]">
//                   {p.fullName || "Unnamed User"}
//                 </div>
//                 <div className="text-xs text-gray-400 truncate">@{p.username || "unknown"}</div>
//               </div>
//             </div>
//             <span className="text-sm text-pink-400 whitespace-nowrap">{p.city || "🌍"}</span>
//           </div>
//         ))}
//       </div>
//     )}

//     {/* ❌ No Matches */}
//     {searchTerm.trim() !== "" && profiles.length === 0 && (
//       <div className="w-full text-sm text-center text-gray-400 bg-gray-900 border border-pink-500 p-3 rounded-xl shadow-md">
//         No matching users found
//       </div>
//     )}
//   </div>
// </div>


// <br />
// <br />

//         <div className="space-y-10">
//         <FeatureBox
//   icon={<Sparkles className="w-12 h-20 text-pink-500" />}
//   emoji="✨"
//   title="Soul Matches"
//   description="Discover compatible partners based on your vibe and preferences."
//   action="Find Your Matches"
//   route="/RecommendedPage"
// />
// <br></br> <br></br>
//           <FeatureBox
//             icon={<Brain className="w-12 h-20 text-pink-500" />}
//             emoji="🧩"
//             title="Match Quiz"
//             description="🔮 Discover your cosmic compatibility."
//             action="Start Soul Quiz"
//             route="/match-quiz"
//           />
//           <br></br>
//           <br></br>
//           <FeatureBox
//             icon={<Sunrise className="w-12 h-20 text-pink-500" />}
//             emoji="🌅"
//             title="Sunrise Intentions"
//             description="🌞 Set daily goals or moods."
//             action="Set Today's Intention"
//             route="/sunrise-intentions"
//           />
// <br></br>
// <br></br>

//           <FeatureBox
//             icon={<CalendarCheck className="w-12 h-20 text-pink-500" />}
//             emoji="📅"
//             title="Date Readiness Calendar"
//             description="Mark days and manifest vibes."
//             action="Open Calendar"
//             route="/calender"
//           />
// <br></br>
// <br></br>
// <FeatureBox
//   icon={<HeartHandshake className="w-12 h-20 text-pink-500" />}
//   emoji="📖"
//   title="Our Timeline"
//   description="Track every day together and celebrate your milestones."
//   action="Open Timeline"
//   route="/our-timeline"
// />

// {/* <br></br>
// <br></br>
// <FeatureBox
//   icon={<Sparkles className="w-12 h-20 text-pink-500" />}
//   emoji="✨"
//   title="Soul Matches"
//   description="Discover compatible partners based on your vibe and preferences."
//   action="Find Your Matches"
//   route="/RecommendedPage"
// /> */}



//         </div>
//       </main>

//       <footer className="relative z-10 mt-10 text-center py-6 text-sm text-gray-500">
//   © 2025 Vibe nest by Rizfinity. All rights reserved.
// </footer>


//     </div>
//   );
// }

// function FeatureBox({ icon, emoji, title, description, action, route }) {
//   const navigate = useNavigate();
//   return (
//     <div
//       className="group relative w-full bg-pink-500/10 border border-pink-500 rounded-3xl p-10 transition transform hover:scale-[1.02] shadow-xl cursor-pointer"
//       onClick={() => navigate(route)}
//     >
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-6">
//           {icon}
//           <span className="text-3xl">{emoji}</span>
//         </div>
//         <h3 className="text-2xl font-light mb-3">{title}</h3>
//         <p className="text-pink-500 text-sm mb-6">{description}</p>
//         <div className="flex items-center text-pink-500 text-sm group-hover:translate-x-2 transition">
//           <span>{action}</span>
//           <span className="ml-2">→</span>
//         </div>
//       </div>
//     </div>
//   );
// }



















import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import {
  Heart,
  LogOut,
  Brain,
  Sunrise,
  Stars,
  Bell,
  User,
  Sparkles,
  Moon,
  Sun,
  CalendarCheck,
  HeartHandshake,
  MessageCircle,
  Search
} from "lucide-react";
import { Menu, Settings, Shield, Mail } from "lucide-react";
import { auth, db } from "../services/firebase";
import { collection, query, where, onSnapshot, collectionGroup, getDocs } from "firebase/firestore";
import { Helmet } from 'react-helmet';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);


  // Effect to manage the timer
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

useEffect(() => {
  if (!user?.uid) return;

  const q = query(
    collectionGroup(db, "messages"),
    where("recipientId", "==", user.uid),
    where("read", "==", false)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    setUnreadCount(snapshot.size); // 🔢 Sets number of unread messages
  });

  return () => unsubscribe();
}, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };  

const searchUsers = async () => {
  if (!searchTerm.trim()) return;

  console.log("Searching for:", searchTerm);

  const usersRef = collection(db, "users");
  const q = query(
    usersRef,
    where("username", ">=", searchTerm),
    where("username", "<=", searchTerm + "\uf8ff")
  );

  try {
    const querySnapshot = await getDocs(q);
    const matchedProfiles = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      matchedProfiles.push({ uid: doc.id, ...data });
    });

    console.log("Matches found:", matchedProfiles);
    setProfiles(matchedProfiles);
  } catch (error) {
    console.error("Search error:", error);
  }
};




  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const isNightTime = () => {
    const hour = currentTime.getHours();
    return hour >= 18 || hour <= 6;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-pink-500 text-xl animate-pulse">
          ✨ Loading your sacred space...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Reuse your animated backgrounds */}
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
      <header className="relative z-10 flex flex-col md:flex-row justify-between items-center p-6 border-b border-pink-500/50 backdrop-blur-sm space-y-4 md:space-y-0">
        <div className="flex items-center space-x-3">
          <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
          <div>
            <h1 className="text-2xl font-light text-white">Vibe nest</h1>
            <p className="text-sm text-pink-500">Sync Hearts Share Vibes</p>
          </div>
        </div>
  <div className="flex items-center space-x-4">
    {/* Notification */}
    <div className="relative group">
    <Link to="/Messages" className="relative group">
  <MessageCircle className="w-6 h-6 text-pink-500 cursor-pointer group-hover:scale-110 transition-all duration-300" />
  
  {unreadCount > 0 && (
    <span className="absolute -top-2 -right-2 text-[10px] bg-red-600 text-white rounded-full px-1.5 py-0.5 font-bold">
      {unreadCount > 9 ? "9+" : unreadCount}
    </span>
  )}  
</Link>

    </div>

          <Link to="/profile" className="flex items-center space-x-2 text-pink-500">
            <User className="w-5 h-5" />
            <span className="text-sm">{user?.email?.split("@")[0]}</span>
          </Link>

<button
  onClick={() => setSidebarOpen(true)}
  className="text-pink-500 hover:text-pink-300 transition-colors"
>
  <Menu className="w-6 h-6" />
</button>
  </div>
      </header>

      {/* Sidebar Overlay */}
{sidebarOpen && (
  <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setSidebarOpen(false)}></div>
)}

{/* Sidebar Panel */}
<div
  className={`fixed top-0 right-0 h-full w-64 bg-black border-l border-pink-500 z-50 shadow-lg p-6 space-y-6 transform transition-transform duration-300 ${
    sidebarOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <button
    onClick={() => setSidebarOpen(false)}
    className="text-pink-500 text-xl font-bold absolute top-4 right-4"
  >
    ✕
  </button>

  <h2 className="text-xl font-semibold text-white mt-12">Menu</h2>
  <Link to="/settings" className="text-pink-400 hover:text-white block">Settings</Link>
  <Link to="/privacy" className="text-pink-400 hover:text-white block">Privacy Policy</Link>
  <Link to="/contact" className="text-pink-400 hover:text-white block">Contact Us</Link>

</div>

      {/* Welcome and Features */}
      <main className="relative z-10 p-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light">{getGreeting()}, Soul Seeker ✨</h2>
          <p className="text-pink-500">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

{/* --- Search Section --- */}
<div className="mt-6 max-w-md mx-auto w-full z-10">
  <div className="relative w-full">
    <input
      type="text"
      placeholder="Search users by username..."
      className="w-full px-5 py-3 pl-12 rounded-2xl border border-pink-500 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder:text-pink-300 shadow-md"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          searchUsers();
        }
      }}
    />
    <Search className="absolute left-4 top-3.5 text-pink-400 w-5 h-5" />
  </div>

  {/* 🔍 Results (Attached Below) */}
  <div className="mt-3 space-y-1">
    {searchTerm.trim() !== "" && profiles.length > 0 && (
      <div className="w-full bg-gray-800 border border-pink-500 rounded-xl overflow-y-auto shadow-md divide-y divide-pink-900/40">
        {profiles.map((p) => (
          <div
            key={p.uid}
            tabIndex={0}
            role="button"
            onClick={() => navigate(`/users/${p.uid}/profile/info`)}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate(`/users/${p.uid}/profile/info`);
            }}
            className="flex items-center justify-between px-4 py-3 hover:bg-pink-900/10 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src={p.profilePhotoURL || "/default.png"}
                alt={p.fullName || "User"}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="min-w-0">
                <div className="text-white font-medium truncate max-w-[150px]">
                  {p.fullName || "Unnamed User"}
                </div>
                <div className="text-xs text-gray-400 truncate">@{p.username || "unknown"}</div>
              </div>
            </div>
            <span className="text-sm text-pink-400 whitespace-nowrap">{p.city || "🌍"}</span>
          </div>
        ))}
      </div>
    )}

    {/* ❌ No Matches */}
    {searchTerm.trim() !== "" && profiles.length === 0 && (
      <div className="w-full text-sm text-center text-gray-400 bg-gray-900 border border-pink-500 p-3 rounded-xl shadow-md">
        No matching users found
      </div>
    )}
  </div>
</div>


<br />
<br />

        <div className="space-y-10">
        <FeatureBox
  icon={<Sparkles className="w-12 h-20 text-pink-500" />}
  emoji="✨"
  title="Soul Matches"
  description="Discover compatible partners based on your vibe and preferences."
  action="Find Your Matches"
  route="/RecommendedPage"
/>
<br></br> <br></br>
          <FeatureBox
            icon={<Brain className="w-12 h-20 text-pink-500" />}
            emoji="🧩"
            title="Match Quiz"
            description="🔮 Discover your cosmic compatibility."
            action="Start Soul Quiz"
            route="/match-quiz"
          />
          <br></br>
          <br></br>
          <FeatureBox
            icon={<Sunrise className="w-12 h-20 text-pink-500" />}
            emoji="🌅"
            title="Sunrise Intentions"
            description="🌞 Set daily goals or moods."
            action="Set Today's Intention"
            route="/sunrise-intentions"
          />
<br></br>
<br></br>

          <FeatureBox
            icon={<CalendarCheck className="w-12 h-20 text-pink-500" />}
            emoji="📅"
            title="Date Readiness Calendar"
            description="Mark days and manifest vibes."
            action="Open Calendar"
            route="/calender"
          />
<br></br>
<br></br>
<FeatureBox
  icon={<HeartHandshake className="w-12 h-20 text-pink-500" />}
  emoji="📖"
  title="Our Timeline"
  description="Track every day together and celebrate your milestones."
  action="Open Timeline"
  route="/our-timeline"
/>

{/* <br></br>
<br></br>
<FeatureBox
  icon={<Sparkles className="w-12 h-20 text-pink-500" />}
  emoji="✨"
  title="Soul Matches"
  description="Discover compatible partners based on your vibe and preferences."
  action="Find Your Matches"
  route="/RecommendedPage"
/> */}



        </div>
      </main>

      <footer className="relative z-10 mt-10 text-center py-6 text-sm text-gray-500">
  © 2025 Vibe nest by Rizfinity. All rights reserved.
</footer>


    </div>
  );
}

function FeatureBox({ icon, emoji, title, description, action, route }) {
  const navigate = useNavigate();
  return (
    <div
      className="group relative w-full bg-pink-500/10 border border-pink-500 rounded-3xl p-10 transition transform hover:scale-[1.02] shadow-xl cursor-pointer"
      onClick={() => navigate(route)}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          {icon}
          <span className="text-3xl">{emoji}</span>
        </div>
        <h3 className="text-2xl font-light mb-3">{title}</h3>
        <p className="text-pink-500 text-sm mb-6">{description}</p>
        <div className="flex items-center text-pink-500 text-sm group-hover:translate-x-2 transition">
          <span>{action}</span>
          <span className="ml-2">→</span>
        </div>
      </div>
    </div>
  );
}