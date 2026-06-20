
import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";
import EmojiPicker from 'emoji-picker-react';

import { MoreVertical } from "lucide-react";
import { Helmet } from 'react-helmet';

import { 
  addDoc, 
  collection, 
  serverTimestamp, 
  query, 
  orderBy, 
  onSnapshot,
  doc,
  where,
  deleteDoc,
  getDoc,
  setDoc,
  updateDoc,
  getDocs
} from "firebase/firestore";
import { db } from "../services/firebase";
import { Send, ArrowLeft, ImageIcon, FileText } from "lucide-react";
import { useAuth } from "../context/AuthContext";


const uploadImageToCloudinary = async (file) => {
  const cloudName = "dpvsmzplh";
  const unsignedPreset = "unsigned_preset"; // ⚠️ Replace with your actual unsigned preset name
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", unsignedPreset); // Only unsigned preset required for upload
  data.append("folder", "chat_images"); // Optional: saves uploads in 'chat_images' folder

  try {
    const res = await fetch(url, {
      method: "POST",
      body: data,
    });

    const result = await res.json();

    if (result.secure_url) {
      return result.secure_url;
    } else {
      console.error("Cloudinary response error:", result);
      return null;
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};


const Chat = () => {
  const { user: currentUser } = useAuth(); // ✅ Proper way to access current user
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recipient, setRecipient] = useState(null);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
const [showMenu, setShowMenu] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false); // ✅ Bi-directional check result
  const [blockedByMe, setBlockedByMe] = useState(false);
  const [blockedByThem, setBlockedByThem] = useState(false);



  const chatId = [currentUser?.uid, userId].sort().join("_");

  
useEffect(() => {
  const fetchCurrentUserDetails = async () => {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      console.log("🎯 Firestore user doc:", userSnap.data());
    } else {
      console.log("⚠️ User document not found in Firestore");
    }
  };

  fetchCurrentUserDetails();
}, [currentUser]);


useEffect(() => {
  const checkBlockStatus = async () => {
    if (!currentUser?.uid || !recipient?.uid) return;

    const [userA, userB] = [currentUser.uid, recipient.uid].sort();
    const blockId = `${userA}_${userB}`;
    const blockDoc = await getDoc(doc(db, "blockedUsers", blockId));

    if (blockDoc.exists()) {
      const blockData = blockDoc.data();
      const blockedByMe = blockData.blockedBy === currentUser.uid;
      const blockedByThem = blockData.blockedBy === recipient.uid;

      setIsBlocked(true);
      setBlockedByMe(blockedByMe);
      setBlockedByThem(blockedByThem);
    } else {
      setIsBlocked(false);
      setBlockedByMe(false);
      setBlockedByThem(false);
    }
  };

  checkBlockStatus();
}, [currentUser, recipient]);



  // Fetch recipient details
  useEffect(() => {
  const fetchRecipient = async () => {
    try {
      if (location.state?.user) {
        const { uid, fullName, profilePhotoURL } = location.state.user;

        // If fullName or photo is missing, fetch from Firestore
        if (!fullName || !profilePhotoURL) {
          const userRef = doc(db, "users", userId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setRecipient({
              uid: userId,
              name: userData.fullName,
              photo: userData.profilePhotoURL || "/default.png",
            });
          }
        } else {
          setRecipient({
            uid,
            name: fullName,
            photo: profilePhotoURL || "/default.png",
          });
        }
      } else {
        // Fallback if location.state is completely absent
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setRecipient({
            uid: userId,
            name: userData.fullName,
            photo: userData.profilePhotoURL || "/default.png",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching recipient:", error);
    }
  };

  fetchRecipient();
}, [userId, location.state]);


  // Real-time chat listener
 useEffect(() => {
    if (!currentUser || !userId) return;
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
      setLoading(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });

    return () => unsubscribe();
  }, [currentUser, userId]);

 useEffect(() => {
    const typingRef = doc(db, "chats", chatId);
    const unsubscribe = onSnapshot(typingRef, (docSnap) => {
      const data = docSnap.data();
      if (data?.typing === userId) {
        setTyping(true);
      } else {
        setTyping(false);
      }
    });
    return () => unsubscribe();
  }, [chatId, userId]);

// const handleSendMessage = async (e) => {
//   e.preventDefault();
//   if (!message.trim() || !currentUser || !userId) return;

//   const chatId = [currentUser.uid, userId].sort().join("_");

//   try {
//     // 1. Add message to subcollection
//     await addDoc(collection(db, "chats", chatId, "messages"), {
//       text: message,
//       senderId: currentUser.uid,
//       recipientId: userId,
//       timestamp: serverTimestamp(),
//       read: false
//     });

//     // ✅ 2. Update parent chat doc with latest message
//     const chatRef = doc(db, "chats", chatId);
// await setDoc(doc(db, "chats", chatId), {
//   participants: [currentUser.uid, userId],
//   updatedAt: serverTimestamp(),
//   lastMessage: message,
// }, { merge: true });

       
//     setMessage(""); // Clear input
//   } catch (error) {
//     console.error("Error sending message:", error);
//   }
// };

  useEffect(() => {
  const markMessagesAsRead = async () => {
    if (!currentUser || !userId || messages.length === 0) return;

    const unreadMessages = messages.filter(
      (msg) => msg.recipientId === currentUser.uid && !msg.read
    );

    const batch = await Promise.all(
      unreadMessages.map(async (msg) => {
        const msgRef = doc(db, "chats", chatId, "messages", msg.id);
        return updateDoc(msgRef, { read: true });
      })
    );
  };

  markMessagesAsRead();
}, [messages, currentUser, userId]);

const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!message.trim() || !currentUser || !userId) return;

  if (isBlocked) {
    alert("Messaging is disabled between blocked users.");
    return;
  }

  try {
    await addDoc(collection(db, "chats", chatId, "messages"), {
      text: message,
      senderId: currentUser.uid,
      recipientId: userId,
      timestamp: serverTimestamp(),
      read: false,
    });

    await setDoc(doc(db, "chats", chatId), {
      participants: [currentUser.uid, userId],
      updatedAt: serverTimestamp(),
      lastMessage: message,
      typing: null,
    }, { merge: true });

    setMessage("");
  } catch (error) {
    console.error("Error sending message:", error);
  }
};


const handleSendImage = async (file) => {
  if (isBlocked) {
  alert("Cannot send images to a blocked user.");
  return;
}

  if (!file || !currentUser || !userId) return;
  
  const chatId = [currentUser.uid, userId].sort().join("_");
  const imageUrl = await uploadImageToCloudinary(file);

  if (!imageUrl) return;

  

  await addDoc(collection(db, "chats", chatId, "messages"), {
    imageUrl,
    senderId: currentUser.uid,
    recipientId: userId,
    timestamp: serverTimestamp(),
    read: false,
  });

  await setDoc(
    doc(db, "chats", chatId),
    {
      participants: [currentUser.uid, userId],
      updatedAt: serverTimestamp(),
      lastMessage: "📷 Image",
    },
    { merge: true }
  );
};

  const handleTyping = async (e) => {
    setMessage(e.target.value);
    await setDoc(doc(db, "chats", chatId), {
      typing: currentUser.uid,
    }, { merge: true });
    setTimeout(() => {
      setDoc(doc(db, "chats", chatId), { typing: null }, { merge: true });
    }, 3000);
  };

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert("📦 File upload feature coming soon: " + file.name);
    }
  };



const handleBlockToggle = async () => {
  const [userA, userB] = [currentUser.uid, userId].sort();
  const blockId = `${userA}_${userB}`;
  const blockRef = doc(db, "blockedUsers", blockId);

  try {
    if (isBlocked) {
      await deleteDoc(blockRef);
      setIsBlocked(false);
    } else {
      await setDoc(blockRef, {
        userA,
        userB,
        blockedBy: currentUser.uid,
        timestamp: Date.now()
      });
      setIsBlocked(true);
    }
  } catch (err) {
    console.error("Block toggle error:", err);
  }

  setShowBlockModal(false);
};

  const formatTime = (timestamp) => {
    if (!timestamp?.toDate) return "";
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (loading && messages.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse">Loading chat...</div>
      </div>
    );
  }

  if (!recipient) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>User not found</div>
      </div>
    );
  }

  const handleEmojiSelect = (emoji) => {
  setMessage((prev) => prev + emoji.native); // append emoji to message
};


return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="bg-gray-900 border-b border-pink-500/30 p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4 p-1 rounded-full hover:bg-gray-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center">
          <img src={recipient.photo} alt={recipient.name} className="w-10 h-10 rounded-full object-cover mr-3" />
          <div>
            <h2 className="font-semibold">{recipient.name}</h2>
            <p className="text-xs text-gray-400">
              {messages.length > 0 ? (typing ? "Typing..." : "Online") : "Offline"}
            </p>
          </div>
        </div>
        
        <Helmet>
                <meta name="robots" content="noindex,nofollow" />
              </Helmet>

<div className="ml-auto relative">
  <button onClick={() => setShowMenu(!showMenu)} className="p-1 text-white hover:text-pink-400">
    <MoreVertical className="w-5 h-5" />
  </button>

  {showMenu && (
    <div className="absolute right-0 mt-2 bg-gray-800 border border-gray-600 rounded shadow-lg z-50">
      <button
        onClick={() => {
          setShowBlockModal(true);
          setShowMenu(false);
        }}
        className="block px-4 py-2 text-white hover:bg-gray-700 w-full text-left"
      >
        {isBlocked ? "Unblock" : "Block"}
      </button>
    </div>
  )}
</div>


</div>

   


<div className="flex-1 overflow-y-auto p-4 space-y-3">
  {messages.length === 0 ? (
    <div className="h-full flex items-center justify-center text-gray-500">
      No messages yet. Say hello!
    </div>
  ) : (
    messages.map((msg) => (
      <div
        key={msg.id}
        className={`flex transition-all duration-300 ${
          msg.senderId === currentUser?.uid ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-lg ${
            msg.senderId === currentUser?.uid
              ? "bg-pink-500 text-black rounded-br-none animate-fade-in-right"
              : "bg-gray-800 text-white rounded-bl-none animate-fade-in-left"
          }`}
        >
          {/* 🖼️ Render image if present */}
          {msg.imageUrl ? (
            <img
              src={msg.imageUrl}
              alt="Sent"
              className="rounded-md mb-2 max-h-64 object-cover transition hover:scale-105 cursor-pointer"
              onClick={() => window.open(msg.imageUrl, "_blank")}
            />
          ) : (
            <div className="text-sm">{msg.text}</div>
          )}

          <div
            className={`text-xs mt-1 text-right ${
              msg.senderId === currentUser?.uid ? "text-pink-100" : "text-gray-400"
            }`}
          >
            {formatTime(msg.timestamp)}
          </div>
        </div>
      </div>
    ))
  )}
  <div ref={messagesEndRef} />
</div>


<div className="p-4 border-t border-pink-500/30">
  {isBlocked ? (
    <div className="bg-gray-800 text-center text-gray-400 text-sm py-3 rounded-lg">
      {blockedByMe
        ? "You have blocked this user. Unblock to start chat."
        : "You are blocked by this user."}
    </div>
  ) : (
<form onSubmit={handleSendMessage} className="p-4 border-t border-pink-500/30">
  <div className="relative">
    {/* 🔤 Input and buttons */}
    <div className="flex items-center bg-gray-900 rounded-full px-4 gap-2">
          <input
            type="text"
            value={message}
            onChange={handleTyping}
            placeholder="Type a message..."
            className="flex-1 bg-transparent py-3 outline-none text-white placeholder-gray-500"
            autoFocus
          />

      {/* 😊 Emoji Button */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="text-pink-400 hover:text-pink-300"
          >
            😊
          </button>

      {/* 📷 Image Upload */}

          <label className="cursor-pointer">
            <ImageIcon className="w-5 h-5 text-pink-500 hover:text-pink-400" />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) handleSendImage(file);
              }}
            />
          </label>

      {/* ➤ Send */}
          <button
            type="submit"
            disabled={!message.trim()}
            className="p-2 rounded-full text-pink-500 hover:text-pink-400 disabled:opacity-30"
          >
            <Send className="w-5 h-5" />
          </button>
    </div>

    {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-16 left-4 z-50">
<EmojiPicker
  onEmojiClick={(emojiObject) =>
    setMessage((prev) => prev + emojiObject.emoji)
  }
/>

          </div>
        )}
         </div>
    </form>
  )}
</div>

{showBlockModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-gray-900 p-6 rounded-lg text-center w-80">
      <p className="text-white mb-4">
        Are you sure you want to {isBlocked ? "unblock" : "block"} {recipient.name}?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleBlockToggle}
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
        >
          {isBlocked ? "Unblock" : "Block"}
        </button>
        <button
          onClick={() => setShowBlockModal(false)}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}



    </div>
  );
};

export default Chat;
