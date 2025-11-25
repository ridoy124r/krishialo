import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const images = [
  "/images/h6.jpeg",
  "/images/h2.jpg",
  "/images/h3.jpg",
  "/images/h4.jpg",
];

export default function FarmHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Image slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Images with overlay */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          style={{ backgroundImage: `url(${img})` }}
        >
          {/* Dark overlay for every image */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-20">
          <div className="">
            <h1 className="text-white font-bold mb-6 sm:mb-8">
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-snug sm:leading-snug md:leading-tight lg:leading-tight">
                <span className="text-green-100">Digitize</span> Your Farm.
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-snug sm:leading-snug md:leading-tight lg:leading-tight">
                Revolutionize <span className="text-green-100">Your Harvest.</span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-2xl mb-10 sm:mb-12 leading-relaxed max-w-xl">
              Leverage our advanced IoT solutions to get real-time data on soil,
              water, and crop health. Reduce costs, increase yield.
            </p>

            {/* Button */}
   <div className="flex flex-col sm:flex-row sm:space-x-4 md:space-x-6 lg:space-x-8 space-y-4 sm:space-y-0">
  <NavLink to="/services">
    <button
      className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold 
                 text-sm sm:text-base md:text-md lg:text-md rounded-md px-4 sm:px-6 
                 md:px-8 lg:px-10 2xl:px-12 py-3 sm:py-3 md:py-4 lg:py-5 2xl:py-6 
                 uppercase tracking-wide transition-all duration-300 transform hover:scale-105"
    >
      BOOK A SERVICE
    </button>
  </NavLink>
</div>


          </div>
        </div>
      </div>
    </div>
  );
} 