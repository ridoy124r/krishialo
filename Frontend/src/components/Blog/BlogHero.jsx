import React from "react";

export default function BlogHero() {
    return (
        <div className="relative w-full h-[388px] flex justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
                style={{ backgroundImage: "url('/images/Blog.jpg')" }}
            ></div>

            {/* Dark overlay for better readability */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

            {/* Content */}
            <div className="relative z-10 flex items-center w-full max-w-[1440px] px-6 sm:px-12 md:px-16 lg:px-24">
                <div className="max-w-2xl">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                        Blogs
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-xl text-white leading-relaxed font-normal">
                        Read the blogs to learn how to keep your soil fertile and grow crops easily.
                    </p>
                </div>
            </div>
        </div>
    );
}