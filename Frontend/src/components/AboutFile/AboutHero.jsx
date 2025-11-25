import React from "react";

export default function WhoWeAreHero() {
  return (
    <div className="relative min-h-screen w-full flex justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
        style={{ backgroundImage: "url('/images/A BG.jpg')" }}
      ></div>

      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center w-full max-w-[1440px] px-8 sm:px-16 md:px-24 py-20 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Who We Are
          </h1>
          <p className="text-xl sm:text-2xl md:text-2xl lg:text-2xl text-white leading-relaxed font-[400px]">
            We connect traditional farming with modern <br/> IoT technology to build a
            smarter agri-ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
}
