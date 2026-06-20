import { Link, useNavigate } from "react-router-dom";
import { Heart, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: " + error.message);
    }
  };

  const handleForgotPassword = async () => {
  if (!email) {
    alert("Please enter your email to receive a reset link.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent. Check your inbox!");
  } catch (error) {
    console.error("Password reset error:", error);
    alert("Failed to send reset email: " + error.message);
  }
};

  return (
    <div className="min-h-screen w-screen flex items-center justify-center relative overflow-hidden bg-black text-white">
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-40 h-40 bg-pink-500/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-60 h-60 bg-pink-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-24 left-24 w-4 h-4 text-pink-500/20 animate-pulse" />
        <Heart className="absolute bottom-24 right-24 w-3 h-3 text-pink-400/30 animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-8">
        <div className="flex items-center justify-center space-x-2 mb-12">
          <Heart className="w-8 h-8 text-pink-500" />
          <span className="text-4xl font-large text-white">Vibe nest</span>
        </div>

        <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-light text-white">Welcome Back</h1>
            <p className="text-gray-400 text-sm">Sync Hearts Share Vibes</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-4 rounded-2xl bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full p-4 pr-12 rounded-2xl bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pink-500 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2 text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-pink-500 bg-transparent border-gray-600 rounded focus:ring-pink-500"
                />
                <span>Remember me</span>
              </label>
<Link
  to="/forgot-password"
  className="text-pink-500 hover:text-pink-400 transition-colors duration-300"
>
  Forgot Password?
</Link>


            </div>

            <button
              type="submit"
              className="group w-full bg-pink-500 text-black font-medium py-4 px-12 rounded-full hover:bg-pink-400 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </form>

          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative bg-gray-900 px-4 text-gray-500 text-sm">or</div>
          </div>

          <div className="text-center mt-4 text-pink-300">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-pink-500 font-semibold hover:text-pink-300">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
