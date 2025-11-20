import React from 'react';
import { Leaf, Handshake, ArrowRight } from 'lucide-react';

export default function AgriSolutions() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 md:px-8 lg:px-0">
      <div className="w-full max-w-[1440px] py-10 md:py-16 lg:py-[60px] lg:min-h-[1024px]">
        {/* Header Text */}
        <div className="mb-3 text-center lg:text-left">
          <p className="text-gray-600 text-sm md:text-base">
            Delivering sustainable and innovative agriculture solutions
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-[40px] items-start">
          {/* Left Column */}
          <div className="space-y-8 pl-4 md:pl-6 lg:pl-8">
            {/* Main Heading */}
            <h1 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold text-gray-900 leading-tight">
              Our commitment is dual-fold: To produce quality crops today, while
              empowering the future of food production tomorrow.
            </h1>

            {/* Image */}
            <div className="rounded-3xl overflow-hidden border border-[#009735] w-full">
              <img
                src="/images/Commitment.jpg"
                alt="Agricultural innovation with technology"
                className="w-full h-[200px] md:h-[300px] lg:h-[360px] object-cover rounded-3xl"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Top Description */}
            <div className="space-y-6">
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                We equip farmers and consumers with technology to safely protect
                crops and ecosystems from threats, ensuring a sound, sustainable,
                and environmentally responsible food production.
              </p>

              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                With 5 years of focused experience, we utilize deep industry
                knowledge, fresh insights, and innovation expertise to create
                impactful solutions for tomorrow.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-6">
              {/* Card 1 */}
              <div className="border-t border-gray-300 pt-6">
                <div className="flex gap-4 md:gap-6 items-start">
                  <div className="shrink-0">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-green-50 rounded-lg flex items-center justify-center">
                      <Handshake className="w-7 h-7 md:w-8 md:h-8 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                      Focus on Partnership & Dedication
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      Empowering farmers to strengthen their soil health is key,
                      directly resulting in increased crop yields and greater
                      profitability.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="border-t border-gray-300 pt-6">
                <div className="flex gap-4 md:gap-6 items-start">
                  <div className="shrink-0">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-green-50 rounded-lg flex items-center justify-center">
                      <Leaf className="w-7 h-7 md:w-8 md:h-8 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                      Focus on Partnership & Dedication
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      Empowering farmers to strengthen their soil health is key,
                      directly resulting in increased crop yields and greater
                      profitability.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Description */}
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Sitting at the heart of the global supply chain, we connect
              farmers, manufacturers, and retailers to source, create, and
              deliver the vital products essential for modern living.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg">
                More About Us
                <ArrowRight className="w-4 h-4" />
              </button>

              <button className="bg-white hover:bg-gray-50 text-gray-900 px-6 md:px-8 py-3 rounded-lg font-medium border-2 border-gray-300 transition-colors duration-200 shadow-sm">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
