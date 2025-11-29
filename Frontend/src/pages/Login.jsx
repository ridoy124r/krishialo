// pages/Login.jsx
import React, { useState, useEffect } from "react";
import { TrendingUp, Leaf, Activity, Mail, Eye, EyeOff, Facebook, Instagram } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../api/apiServices";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) setEmail(rememberedEmail);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authAPI.login({ email, password });
      
      // Save token 
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

     
      if (rememberPassword) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

     
      if (response.data.user.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/"); 
      }

      console.log("Login successful:", response.data);
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex w-full max-w-[1440px] h-[845px] rounded-2xl overflow-hidden shadow-lg bg-white">

        {/* Left Panel */}
        <div className="hidden xl:flex relative w-full max-w-[765px] h-full rounded-tl-2xl rounded-bl-2xl overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/Whisk.jpg')" }} />
          <div className="absolute inset-0" style={{ backgroundColor: "#0E6F4D96" }} />
          <div className="relative flex flex-col justify-between px-12 py-12 text-white h-full">
            <div className="w-[139px] h-[57px] flex items-center">
              <img src="/images/image 4.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col gap-6 max-w-[661px]">
              <h1 className="text-5xl font-bold leading-tight">
                You grow the fields,
                <br />
                we power them with
                <br />
                SMART tech.
              </h1>
              <p className="text-base opacity-90 leading-relaxed">
                We integrate smart devices, automation, and drone , <br />
                technology to turn traditional farming into a connected,
                <br /> efficient ecosystem.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-[575px] h-[845px] rounded-tr-2xl rounded-br-2xl px-[107px] py-12 flex flex-col justify-center bg-white gap-[30px]">
            <h1 className="text-2xl font-bold text-center text-gray-800">User Log in</h1>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="flex flex-col gap-2 mb-6">
                <label className="text-sm text-gray-600">Enter your Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email Here"
                    required
                    className="w-full px-4 py-3 bg-green-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  />
                  <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2 mb-6">
                <label className="text-sm text-gray-600">Enter your Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password Here"
                    required
                    className="w-full px-4 py-3 bg-green-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <div className="flex items-center gap-2 mb-6">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberPassword}
                  onChange={(e) => setRememberPassword(e.target.checked)}
                  className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="remember" className="text-sm text-gray-700">Remember Email?</label>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600">
              Don't Have an Account?{" "}
              <Link to="/regester" className="text-red-500 hover:text-red-600 font-medium">
                Register now
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
