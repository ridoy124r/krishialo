import React from "react";

const StatsSection = () => {
  return (
    <section
      className="bg-green-700 bg-repeat px-4 py-8"
      style={{
        backgroundImage: "url('/images/cl bg.png')",
        backgroundSize: "auto",
      }}
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center text-center md:text-left">
        {/* Left Box */}
        <div className="md:col-span-1 lg:col-span-2 bg-white border-2 border-green-900 rounded-lg flex flex-col items-center justify-center gap-2 px-4 py-3">
          <div className="flex -space-x-3 mb-2 justify-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="avatar1"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              alt="avatar2"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://randomuser.me/api/portraits/men/77.jpg"
              alt="avatar3"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center border-2 border-white text-xl font-bold">
              +
            </button>
          </div>
          <h2 className="text-green-900 font-black text-lg md:text-xl mt-2">
            10k+ Exclusive Client
          </h2>
        </div>

        {/* Center Circle */}
        <div className="md:col-span-1 lg:col-span-2 flex justify-center">
          <div className="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full border-2 border-green-900 flex items-center justify-center bg-white">
            <img
              src="/images/ka bg.png"
              alt="Middle Logo"
              className="max-w-[70%] max-h-[70%]"
            />
          </div>
        </div>

        {/* Right 3 Boxes */}
        <div className="md:col-span-1 lg:col-span-2 flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
          {/* Box 1 */}
          <div className="bg-white border-2 border-green-900 rounded-lg p-4 text-center w-full">
            <div className="text-green-900 mb-2 text-4xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                style={{ width: "1.75rem", height: "1.75rem" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-green-900 font-black text-xl">368</h3>
            <p className="text-green-900 text-sm mt-1">Happy Clients</p>
          </div>

          {/* Box 2 */}
          <div className="bg-white border-2 border-green-900 rounded-lg p-4 text-center w-full">
            <div className="text-green-900 mb-2 text-4xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                style={{ width: "1.75rem", height: "1.75rem" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z"
                />
              </svg>
            </div>
            <h3 className="text-green-900 font-black text-xl">100</h3>
            <p className="text-green-900 text-sm mt-1">Project Completed</p>
          </div>

          {/* Box 3 */}
          <div className="bg-white border-2 border-green-900 rounded-lg p-4 text-center w-full">
            <div className="text-green-900 mb-2 text-4xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                style={{ width: "1.75rem", height: "1.75rem" }}
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
            <h3 className="text-green-900 font-black text-xl">438</h3>
            <p className="text-green-900 text-sm mt-1">IoT Products Sold</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;