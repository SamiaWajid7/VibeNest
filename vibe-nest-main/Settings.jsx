import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronRight,
  LogOut,
  Moon,
  Sun,
  Trash2,
  Lock,
  Mail
} from "lucide-react";
import {
  auth
} from "../services/firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
  updatePassword,
  sendPasswordResetEmail
} from "firebase/auth";

import { Eye, EyeOff } from "lucide-react";
import { Helmet } from 'react-helmet';

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [deletePassword, setDeletePassword] = useState("");
const [deleteError, setDeleteError] = useState("");
const [showDeletePassword, setShowDeletePassword] = useState(false);



  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  const handleSendResetEmail = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      setResetEmailSent(true);
      setTimeout(() => setResetEmailSent(false), 4000);
    } catch (error) {
      console.error("Reset email error:", error);
      alert("Failed to send reset email.");
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      alert("Please enter both current and new password.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      alert("Password updated successfully!");
      setShowChangePassword(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Password update error:", error.message);
      alert("Failed to change password: " + error.message);
    }
  };

const handleDeleteAccount = async () => {
  if (!deletePassword) {
    setDeleteError("Please enter your password.");
    return;
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, deletePassword);
    await reauthenticateWithCredential(user, credential);
    await deleteUser(user);
    alert("Account deleted successfully.");
    navigate("/register");
  } catch (error) {
    console.error("Delete error:", error.message);
    setDeleteError("Failed to delete account: " + error.message);
  }
};


  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
          {/* Back Button Header */}
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
          </div>
        </div>
      </div>

<Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <br></br> <br></br> <br></br>
    
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-6xl font-semibold text-pink-500 mb-6 text-center">
          Settings ⚙️
        </h1>

       
        <br></br> 
        

        {/* Account Section */}
        <section className="bg-gray-900/40 border border-pink-500/30 rounded-2xl p-6 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold">Account</h2>

          {/* Change password */}
          <div
            onClick={() => setShowChangePassword(true)}
            className="flex justify-between items-center cursor-pointer hover:text-pink-400"
          >
            <span className="text-gray-300">Change Password</span>
            <ChevronRight className="w-4 h-4" />
          </div>

          {/* Reset password */}
          <div
            onClick={handleSendResetEmail}
            className="flex justify-between items-center cursor-pointer hover:text-pink-400"
          >
            <span className="text-gray-300">Send Password Reset Email</span>
            <ChevronRight className="w-4 h-4" />
          </div>

          {/* Logout */}
          <div
            onClick={() => setShowLogoutConfirm(true)}
            className="flex justify-between items-center cursor-pointer mt-4 hover:text-pink-500"
          >
            <div className="flex items-center space-x-2">
              <LogOut className="w-5 h-5 text-pink-500" />
              <span className="text-pink-400">Logout</span>
            </div>
            <ChevronRight className="w-4 h-4 text-pink-400" />
          </div>
        </section>

        {/* Danger Zone */}
        
      </div>

      {/* Modals */}
      {showLogoutConfirm && (
        <Modal
          title="Are you sure you want to logout?"
          onCancel={() => setShowLogoutConfirm(false)}
          onConfirm={handleLogout}
        />
      )}

{showDeleteConfirm && (
  <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
    <div className="bg-gray-900 border border-red-600 rounded-2xl p-8 max-w-md w-full space-y-6">
      <h3 className="text-xl font-semibold text-red-400 text-center">Confirm Account Deletion</h3>
      <p className="text-sm text-gray-400 text-center">
        Please enter your password to confirm deletion.
      </p>

<div className="relative group">
  <input
    type={showDeletePassword ? "text" : "password"}
    value={deletePassword}
    onChange={(e) => setDeletePassword(e.target.value)}
    placeholder="Enter your password"
    className="w-full p-3 pr-12 rounded bg-gray-800 text-white border border-gray-700"
  />
  <button
    type="button"
    onClick={() => setShowDeletePassword(!showDeletePassword)}
    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-gray-700/50 hover:bg-pink-600/30 text-gray-400 hover:text-pink-400 transition duration-200"
  >
    {showDeletePassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    <span className="absolute -top-7 right-0 bg-gray-800 text-xs text-gray-300 px-2 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition">
      {showDeletePassword ? "Hide" : "Show"}
    </span>
  </button>
</div>


      {deleteError && (
        <p className="text-sm text-red-500 text-center">{deleteError}</p>
      )}

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => {
            setShowDeleteConfirm(false);
            setDeletePassword("");
            setDeleteError("");
          }}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteAccount}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}


      {showChangePassword && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-gray-900 border border-pink-500 rounded-2xl p-8 max-w-md w-full space-y-6">
            <h3 className="text-xl font-semibold text-white">Change Password</h3>

            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
            />

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowChangePassword(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      )}

      {resetEmailSent && (
        <div className="fixed bottom-6 right-6 bg-pink-600 text-white px-4 py-2 rounded-full shadow-lg">
          Password reset email sent to {user.email}
        </div>
      )}
    </div>
  );
}

function Modal({ title, onCancel, onConfirm, danger = false }) {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-gray-900 border border-pink-500 rounded-2xl p-8 max-w-md w-full space-y-6 text-center">
        <h3 className={`text-xl font-semibold ${danger ? "text-red-400" : "text-white"}`}>
          {title}
        </h3>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-full ${
              danger
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-pink-600 hover:bg-pink-700 text-white"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}