import React, { useState } from "react";
import {
  TrendingUp,
  Leaf,
  Activity,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Login submitted:", { email, password, rememberPassword });
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {/* Wrapper – Only width fixed */}
      <div className="flex w-full max-w-[1440px] rounded-2xl overflow-hidden shadow-lg bg-white flex-col xl:flex-row">

        {/* Left Panel */}
        <div className="hidden xl:flex relative w-full max-w-[765px] min-h-[500px] rounded-tl-2xl rounded-bl-2xl overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/images/Whisk.jpg')" }}
          />
          <div className="absolute inset-0 bg-[#0E6F4D96]" />

          <div className="relative flex flex-col justify-between px-12 py-12 text-white h-full">
            <div className="w-[139px] h-[57px] flex items-center">
              <img
                src="/images/image 4.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
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
                We integrate smart devices, automation, and drone technology to
                turn traditional farming into a connected, efficient ecosystem.
              </p>
            </div>

            <div className="flex gap-4 flex-wrap">
              <div className="w-[210px] bg-white/10 border border-white/20 backdrop-blur-md p-6 text-white rounded-2xl hover:bg-white/15 transition-all duration-300">
                <TrendingUp className="w-8 h-8 text-white mb-4" />
                <h3 className="font-bold text-xl mb-3">Precision Farming</h3>
                <p className="text-sm opacity-90">
                  Optimize resource use with data-driven insights for maximum
                  yield.
                </p>
              </div>

              <div className="w-[210px] bg-white/10 border border-white/20 backdrop-blur-md p-6 text-white rounded-2xl hover:bg-white/15 transition-all duration-300">
                <Leaf className="w-8 h-8 text-white mb-4" />
                <h3 className="font-bold text-xl mb-3">Sustainable Yields</h3>
                <p className="text-sm opacity-90">
                  Promote eco-friendly practices and enhance crop health.
                </p>
              </div>

              <div className="w-[210px] bg-white/10 border border-white/20 backdrop-blur-md p-6 text-white rounded-2xl hover:bg-white/15 transition-all duration-300">
                <Activity className="w-8 h-8 text-white mb-4" />
                <h3 className="font-bold text-xl mb-3">Real-time Insights</h3>
                <p className="text-sm opacity-90">
                  Get immediate access to critical field data.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-[575px] rounded-tr-2xl rounded-br-2xl px-[40px] sm:px-[70px] md:px-[90px] xl:px-[107px] py-12 flex flex-col justify-center bg-white gap-[30px]">

            <h1 className="text-2xl font-bold text-center text-gray-800">
              User Log in
            </h1>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Enter your Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email Here"
                  className="w-full px-4 py-3 bg-green-50 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-700"
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">
                Enter your Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password Here"
                  className="w-full px-4 py-3 bg-green-50 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-700"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberPassword}
                onChange={(e) => setRememberPassword(e.target.checked)}
                className="w-4 h-4 text-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember Password?
              </label>
            </div>

            {/* Login */}
            <button
              onClick={handleSubmit}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Log In
            </button>

            {/* Register */}
            <p className="text-center text-sm text-gray-600">
              Don't Have an Account?{" "}
              <Link
                to="/register"
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Register now
              </Link>
            </p>

<div className="flex justify-center gap-4 mt-4">
  {/* Facebook */}
  <button className="w-12 h-12 bg-[#E6F6EB] hover:bg-green-600 text-white rounded-lg flex items-center justify-center transition">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="w-6 h-6">
      <path fill="#1877f2" d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"></path>
      <path fill="#fff" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"></path>
    </svg>
  </button>

  {/* Instagram */}
  <button className="w-12 h-12 bg-[#E6F6EB] hover:bg-green-600 text-white rounded-lg flex items-center justify-center transition">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
      <linearGradient id="a" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#feda75"/>
        <stop offset=".5" stopColor="#fa7e1e"/>
        <stop offset="1" stopColor="#d62976"/>
      </linearGradient>
      <path fill="url(#a)" d="M349.33 69.33H162.67C104.33 69.33 69.33 104.33 69.33 162.67v186.66c0 58.34 35 93.34 93.34 93.34h186.66c58.34 0 93.34-35 93.34-93.34V162.67c0-58.34-35-93.34-93.34-93.34zm62 280c0 34.38-27.94 62.33-62.33 62.33H162.67c-34.39 0-62.33-27.95-62.33-62.33V162.67c0-34.38 27.94-62.33 62.33-62.33h186.66c34.39 0 62.33 27.95 62.33 62.33v186.66z"/>
      <circle fill="#fff" cx="256" cy="256" r="80"/>
      <circle fill="#fff" cx="390.67" cy="121.33" r="20"/>
    </svg>
  </button>

  {/* Google */}
  <button className="w-12 h-12 bg-[#E6F6EB] hover:bg-green-600 text-white rounded-lg flex items-center justify-center transition">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="w-6 h-6">
      <path fill="#f44336" d="M488 261.8c0-17.5-1.6-34.5-4.7-51H249v97h134.1c-5.8 31.2-23.7 57.6-50.6 75v62.3h81.6c47.8-44.1 75.9-109 75.9-183.3z"/>
      <path fill="#ffc107" d="M249 512c67.2 0 123.7-22.4 164.9-60.9l-81.6-62.3c-22.7 15.2-51.7 24.2-83.3 24.2-63.9 0-118-43-137.3-100.6H29.1v63.2C70.4 459 152 512 249 512z"/>
      <path fill="#448aff" d="M111.7 303.6c-4.3-12.7-6.7-26.3-6.7-40.6s2.4-27.9 6.7-40.6V158.2H29.1c-17.8 35.5-28.1 75.1-28.1 117.2s10.3 81.7 28.1 117.2l82.6-64.0z"/>
      <path fill="#43a047" d="M249 101.1c35.8 0 68.1 12.3 93.5 32.4l70-70C366.5 23.9 308.2 0 249 0 152 0 70.4 53 29.1 158.2l82.6 64.0c19.3-57.5 73.4-100.6 137.3-100.6z"/>
    </svg>
  </button>
</div>

          </div>
        </div>
      </div>
    </div>
  );
}
