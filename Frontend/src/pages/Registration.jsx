// pages/Registration.jsx
import React, { useState } from "react";
import {
  TrendingUp,
  Leaf,
  Activity,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Camera,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../api/apiServices";

function LeftPanel() {
  return (
    <div className="relative w-full max-w-[765px] h-[845px] rounded-tl-2xl rounded-bl-2xl overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Whisk.jpg')" }}
      />
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
            We integrate smart devices, automation, and drone technology <br />
            to turn traditional farming into a connected, efficient ecosystem.
          </p>
        </div>
        <div className="flex gap-4 flex-wrap">
          <div className="w-[210px] bg-white/10 border border-white/20 backdrop-blur-md p-6 text-white rounded-2xl hover:bg-white/15 transition-all duration-300">
            <TrendingUp className="w-8 h-8 text-white mb-4" strokeWidth={2} />
            <h3 className="font-bold text-xl leading-tight mb-3">Precision Farming</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Optimize resource use with data-driven insights for maximum yield and minimal waste
            </p>
          </div>
          <div className="w-[210px] bg-white/10 border border-white/20 backdrop-blur-md p-6 text-white rounded-2xl hover:bg-white/15 transition-all duration-300">
            <Leaf className="w-8 h-8 text-white mb-4" strokeWidth={2} />
            <h3 className="font-bold text-xl leading-tight mb-3">Sustainable Yields</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Promote eco-friendly practices and enhance crop health for greener future
            </p>
          </div>
          <div className="w-[210px] bg-white/10 border border-white/20 backdrop-blur-md p-6 text-white rounded-2xl hover:bg-white/15 transition-all duration-300">
            <Activity className="w-8 h-8 text-white mb-4" strokeWidth={2} />
            <h3 className="font-bold text-xl leading-tight mb-3">Real-time insights</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Gain immediate access to critical field data to make informed, timely decisions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!acceptTerms) {
      setError("Please accept the Terms and Conditions");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const registrationData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        location: formData.location,
      };


      const response = await authAPI.register(registrationData);

      console.log("Registration successful:", response.data);
      alert("Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[500px] max-w-full h-[845px] rounded-tr-2xl rounded-br-2xl px-10 py-8 flex flex-col justify-between bg-white">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">User Registration</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-2">
            {error}
          </div>
        )}

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-4">
          <label htmlFor="profile-upload" className="cursor-pointer">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
              {profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <Camera className="w-10 h-10 text-white" />
              )}
            </div>
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <p className="mt-2 text-gray-700 font-medium text-sm">Add Photo</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <div className="relative mt-1">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 text-sm"
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-gray-600">Phone Number</label>
              <div className="relative mt-1">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 text-sm"
                />
                <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>
              <div className="relative mt-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="text-sm text-gray-600">Location</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your location"
                  required
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 text-sm"
                />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I accept the{" "}
              <Link to="#" className="text-green-700 underline hover:text-green-600">
                Terms and Conditions
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-gray-600 mt-3">
        Already have an account?{" "}
        <Link to="/login" className="text-red-500 hover:text-red-600 font-medium">
          Sign in here
        </Link>
      </p>
    </div>
  );
}

export default function Registration() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex w-full max-w-[1440px] h-[845px] rounded-2xl overflow-hidden shadow-lg bg-white">
        <div className="hidden xl:flex">
          <LeftPanel />
        </div>
        <div className="flex-1 flex justify-center items-center p-4">
          <UserRegistration />
        </div>
      </div>
    </div>
  );
}
