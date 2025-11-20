import React from "react";

const StatsSection = () => {
  return (
    <section
      className="bg-green-700 bg-repeat px-4 py-8 md:py-12"
      style={{
        backgroundImage: "url('/images/cl bg.png')",
        backgroundSize: "auto",
        backgroundBlendMode: "overlay", // Optional: Helps make the text readable
      }}
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
        
        {/* 1. Left Box (Client Info) */}
        {/* Occupies 1 column on MD, 2 columns on LG */}
        <div className="md:col-span-1 lg:col-span-2 bg-white border-2 border-green-900 rounded-lg flex flex-col items-center justify-center gap-2 px-4 py-4 md:py-6 text-center shadow-lg">
          <div className="flex -space-x-3 mb-2 justify-center">
            {/* Avatars */}
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="avatar1"
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              alt="avatar2"
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
            <img
              src="https://randomuser.me/api/portraits/men/77.jpg"
              alt="avatar3"
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
            {/* Plus Button */}
            <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center border-2 border-white text-xl font-bold">
              +
            </button>
          </div>
          <h2 className="text-green-900 font-black text-xl md:text-2xl mt-2 leading-tight">
            10k+ Exclusive Client
          </h2>
        </div>

        {/* 2. Center Circle (Logo/KA BG) */}
        {/* Occupies 1 column on MD, 2 columns on LG */}
        <div className="md:col-span-1 lg:col-span-2 flex justify-center">
          <div className="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full border-4 border-white flex items-center justify-center bg-white shadow-xl">
            <img
              src="/images/ka bg.png"
              alt="Middle Logo"
              className="max-w-[70%] max-h-[70%] object-contain"
            />
          </div>
        </div>

        {/* 3. Right 3 Boxes (Stats) */}
        {/* Occupies 1 column on MD, 2 columns on LG */}
        {/* Changed default (mobile) behavior to a 2-column grid and added md:col-span-1 for clarity */}
        <div className="md:col-span-1 lg:col-span-2">
          
          {/* Mobile/Small Screens: 2 Columns. Medium/Large Screens: 3 Columns. */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            
            {/* Box 1 (Happy Clients) - Use w-full and p-4 consistently */}
            <div className="bg-white border-2 border-green-900 rounded-lg p-4 text-center w-full shadow-md">
              <div className="text-green-900 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto w-7 h-7" // Set size using utility classes
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-green-900 font-black text-2xl">368</h3>
              <p className="text-green-900 text-sm mt-1">Happy Clients</p>
            </div>

            {/* Box 2 (Projects Completed) - Use w-full and p-4 consistently */}
            <div className="bg-white border-2 border-green-900 rounded-lg p-4 text-center w-full shadow-md">
              <div className="text-green-900 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto w-7 h-7" // Set size using utility classes
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z"
                  />
                </svg>
              </div>
              <h3 className="text-green-900 font-black text-2xl">100</h3>
              <p className="text-green-900 text-sm mt-1">Projects Completed</p>
            </div>

            {/* Box 3 (IoT Products Sold) - Use w-full and p-4 consistently */}
            {/* Added a break point (sm:col-span-1) to ensure proper flow across different screen sizes */}
            <div className="bg-white border-2 border-green-900 rounded-lg p-4 text-center w-full col-span-2 lg:col-span-1 md:col-span-1 sm:col-span-1 shadow-md">
              <div className="text-green-900 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto w-7 h-7" // Set size using utility classes
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.4 15A7.969 7.969 0 0121 12c0-4.418-3.582-8-8-8s-8 3.582-8 8c0 1.333.418 2.567 1.122 3.6"
                  />
                </svg>
              </div>
              <h3 className="text-green-900 font-black text-2xl">438</h3>
              <p className="text-green-900 text-sm mt-1">IoT Products Sold</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;