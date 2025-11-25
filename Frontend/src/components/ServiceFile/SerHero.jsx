import React from "react";

export default function SerHero() {
    return (
        <div className="relative min-h-screen w-full flex justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
                style={{ backgroundImage: "url('/images/serhero.jpg')" }}
            ></div>

            {/* Dark overlay for better readability */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

            {/* Content */}
            <div className="relative z-10 flex items-center w-full max-w-[1440px] px-8 sm:px-16 md:px-24 py-20 md:py-32">
                <div className="max-w-2xl">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Top Services for You
                    </h1>
                    <p className="text-xl sm:text-2xl md:text-2xl lg:text-2xl text-white leading-normal font-[400px]">
                        We deliver excellence, innovation, and measurable results.<br/>
                        Your success is our service standard.
                    </p>
                </div>
            </div>
        </div>
    );
}
