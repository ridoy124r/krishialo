import React from "react";
import { ArrowRight } from "lucide-react";
import { Icon } from "@iconify/react";

export default function AgriSolutions() {
  return (
    <div className="min-h-screen bg-white flex justify-center px-4 md:px-8 lg:px-0">
      <div className="w-full max-w-[1440px] py-10 md:py-16 lg:py-[60px]">

        {/* Header Text */}
        <div className="mb-3 pl-4 md:pl-6 lg:pl-8 text-center lg:text-left">
          <p className="text-gray-600 text-sm md:text-base">
            Excited to know how we work? Here is the secret.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">

          {/* Left Column */}
          <div className="space-y-8 pl-4 md:pl-6 lg:pl-8">

            {/* Main Heading */}
            <h1 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold text-gray-900 leading-tight">
              Digital Agriculture Services: Precision Yield Management and
              Future Food System Empowerment.
            </h1>

            {/* Image */}
            <div className="rounded-3xl overflow-hidden border border-[#009735] w-full">
              <img
                src="/images/A COMMIT.jpg"
                alt="Agricultural innovation with technology"
                className="
                  w-full 
                  h-[260px] 
                  md:h-[380px] 
                  lg:h-[460px] 
                  xl:h-[520px] 
                  object-cover 
                  rounded-3xl
                "
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">

            {/* Top Description */}
            <div className="space-y-6">
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Krishi Alo utilizes digital and technological resources at every
                step of the process, from before the crop is planted right up to
                when it reaches the consumer. It ensures crop security and makes
                farming digital and simpler.
              </p>

              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Krishi Alo guides the farmer's journey with digital technology,
                making every step efficient and simple. Let's take a look at how
                Krishi Alo works, step-by-step.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-6">

              {/* Card 1 */}
              <div className="border-t border-gray-300 pt-6">
                <div className="flex gap-4 md:gap-6 items-start">
                  <div className="shrink-0">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-green-50 rounded-lg flex items-center justify-center">
                      <Icon
                        icon="material-symbols:search-insights"
                        className="w-8 h-8 text-green-600"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                      Data Collection & Insight
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      We replace guesswork with data. Our IoT sensors deliver
                      real-time field intelligence—the foundation for every
                      smart decision you make.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="border-t border-gray-300 pt-6">
                <div className="flex gap-4 md:gap-6 items-start">
                  <div className="shrink-0">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-green-50 rounded-lg flex items-center justify-center">
                      <Icon
                        icon="mdi:arrow-decision-outline"
                        className="w-8 h-8 text-green-600"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                      Precision Decision Making
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      Smart analytics predict future needs, telling you
                      precisely when, where, and how much to apply. Zero waste,
                      maximum yield.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="border-t border-gray-300 pt-6">
                <div className="flex gap-4 md:gap-6 items-start">
                  <div className="shrink-0">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-green-50 rounded-lg flex items-center justify-center">
                      <Icon
                        icon="fluent:sparkle-action-20-regular"
                        className="w-8 h-8 text-green-600"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                      Automated Intervention & Action
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      We turn insights into action. Technology automates the
                      execution, ensuring the right resource reaches the right
                      plant, effortlessly and efficiently.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Description */}
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Central to the global supply chain, we offer comprehensive
              services connecting farmers, manufacturers, and retailers to
              source and deliver essential products. Our dedicated team is
              continuously innovating to advance and uplift the entire
              agricultural sector.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg">
                More About Us
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
