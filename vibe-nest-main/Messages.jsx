import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  getDoc,
  getDocs,
  collectionGroup
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

export default function Messages() {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [unreadCounts, setUnreadCounts] = useState({});


const handleSearch = async () => {
  if (!searchTerm.trim()) {
    setSearchResults([]);
    return;
  }

  


  const q = query(
    collection(db, "users"),
    where("username", ">=", searchTerm),
    where("username", "<=", searchTerm + "\uf8ff")
  );

  try {
    const snapshot = await getDocs(q);
    const results = snapshot.docs
      .filter((docSnap) => docSnap.id !== user.uid)
      .map((docSnap) => {
        const data = docSnap.data();
        return {
          uid: docSnap.id,
          fullName: data.fullName || "",
          username: data.username || "",
          profilePhotoURL: data.profilePhotoURL || "/default.png",
        };
      });

    console.log("Search results:", results);
    setSearchResults(results);
  } catch (error) {
    console.error("Search error:", error);
  }
};


useEffect(() => {
  const delaySearch = setTimeout(() => {
    handleSearch();
  }, 300); // debounce

  return () => {
    clearTimeout(delaySearch);
  };
}, [searchTerm]);



  // ✅ Load Recent Chats
useEffect(() => {
  if (!user) return;

  const q = query(
    collection(db, "chats"),
    where("participants", "array-contains", user.uid),
    orderBy("updatedAt", "desc")
  );

  const unsubscribe = onSnapshot(q, async (snapshot) => {
    const chatsData = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const chat = docSnap.data();
        const otherUserId = chat.participants.find((id) => id !== user.uid);

        const userRef = doc(db, "users", otherUserId);
        const userSnap = await getDoc(userRef);
        const userInfo = userSnap.exists() ? userSnap.data() : {};

        return {
          id: docSnap.id,
          lastMessage: chat.lastMessage || "Say hi 👋",
          updatedAt: chat.updatedAt?.toDate()  || null,
          recipientId: otherUserId,
          fullName: userInfo.fullName || "Unknown",
          photo: userInfo.profilePhotoURL || "/default.png",
        };
      })
    );

    setChats(chatsData);
  });

  return () => unsubscribe();
}, [user]);


useEffect(() => {
  if (!user?.uid) return;

  const q = query(
  collectionGroup(db, "messages"),
  where("recipientId", "==", user.uid),
  where("read", "==", false)
)


  const unsubscribe = onSnapshot(
    collectionGroup(db, "messages"), // ✅ for all chats/messages
    (snapshot) => {
      const counts = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.recipientId === user.uid && data.read === false) {
          const senderId = data.senderId;
          counts[senderId] = (counts[senderId] || 0) + 1;
        }
      });
      setUnreadCounts(counts); // { uid1: 2, uid2: 1 }
    }
  );

  return () => unsubscribe();
}, [user]);

function formatTime(timestamp) {
  if (!timestamp) return "";

  const now = new Date();
  const messageTime = new Date(timestamp);
  const diffInHours = (now - messageTime) / (1000 * 60 * 60);

  if (diffInHours <= 24) {
    return messageTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  return messageTime.toLocaleDateString("en-GB"); // DD/MM/YYYY
}


  useEffect(() => {
    if (!user?.uid) return;

    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();
        }
      });
    });

    return () => unsubscribe();
  }, [user?.uid]);

  return (


    
    <div className="p-6 text-white bg-black min-h-screen">


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
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

<h1 className="text-4xl mb-6 text-pink-500">Messages</h1>
      

      {/* 🔍 Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
onChange={(e) => {
  setSearchTerm(e.target.value);
}}
          placeholder="Search users..."
          className="w-full p-3 rounded-lg bg-gray-900 text-white placeholder-gray-500 border border-gray-700"
        />
      </div>

      {/* 🔍 Search Results */}
{searchResults.length > 0 && (
  <div className="mb-8">
    <h2 className="text-xl mb-2 text-pink-400">Search Results</h2>
    {searchResults.map((user) => (
      <div
        key={user.uid}
        className="p-4 border border-gray-700 mb-3 rounded-lg flex items-center cursor-pointer hover:bg-gray-800"
        onClick={() =>
          navigate(`/msg/${user.uid}`, {
            state: {
              user: {
                uid: user.uid,
                name: user.fullName,
                username: user.username,
                photo: user.profilePhotoURL,
              },
            },
          })
        }
      >
        <img
          src={user.profilePhotoURL}
          alt={user.fullName}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div>
          <p className="text-white font-semibold">{user.fullName}</p>
          <p className="text-gray-400 text-sm">@{user.username}</p>
        </div>
      </div>
    ))}
  </div>
)}


      {/* 💬 Recent Chats */}
      <h2 className="text-xl mb-2 text-pink-400">Recent Chats</h2>
      {chats.length === 0 ? (
        <p className="text-gray-400">No messages yet.</p>
      ) : (
        chats.map((chat) => (
          <div
            key={chat.id}
            className="p-4 border border-pink-500 mb-4 rounded-xl cursor-pointer hover:bg-pink-900/10 flex items-center gap-4"
            onClick={() =>
              navigate(`/msg/${chat.recipientId}`, {
                state: {
                  user: {
                    uid: chat.recipientId,
                    name: chat.fullName,
                    photo: chat.photo,
                  },
                },
              })
            }
          >
            <img
              src={chat.photo}
              alt={chat.fullName}
              className="w-10 h-10 rounded-full object-cover"
            />
<div className="flex-1 relative">
  <p className="text-lg font-semibold">{chat.fullName}</p>
  <p className="text-sm text-gray-400">{chat.lastMessage}</p>

<div className="flex flex-col items-end gap-1 absolute top-1 right-2">
  {/* 🔴 Unread badge */}
  {unreadCounts[chat.recipientId] > 0 && (
    <span className="bg-red-600 text-white text-[11px] min-w-[20px] h-[20px] flex items-center justify-center rounded-full font-bold shadow-md">
      {unreadCounts[chat.recipientId]}
    </span>
  )}

  {/* 🕒 Time/Date */}
  <span className="text-[11px] text-gray-400">
    {formatTime(chat.updatedAt)}
  </span>
</div>

</div>

          </div>
        ))
      )}
    </div>
  );
}
