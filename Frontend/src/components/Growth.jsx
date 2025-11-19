
import React, { useEffect, useRef, useState } from 'react';
import { Info } from 'lucide-react';

export default function BusinessGrowthDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the component is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-[1400px]">
      {/* Title */}
      <h2 className="text-3xl text-center sm:text-4xl lg:text-6xl pt-10 pb-5 md:text-5xl font-bold text-teal-900 md:mb-12 ">
        Today's <span className='text-red-600'>Business</span> Growth
      </h2>

      {/* Cards Container */}
      <div className="flex flex-col max-w-7xl lg:flex-row gap-6 md:gap-8 mb-10">
        {/* Traditional Farming Market Card */}
        <div className="flex-1 bg-red-200 rounded-3xl p-6 md:p-8 shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800">
              TRADITIONAL FARMING MARKET
            </h3>
            <div className="bg-white rounded-full px-3 md:px-4 py-1.5 md:py-2 flex items-center gap-2">
              <span className="text-red-600 font-medium text-xs md:text-sm">-125cr. BDT</span>
              <div className="bg-red-500 rounded-full p-1">
                <Info className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-xs md:text-sm text-gray-700 mb-1">Production Today</p>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-600">2.5k TON</p>
            </div>
            <div className="text-right">
              <p className="text-xs md:text-sm text-gray-700 mb-1">Success Rate</p>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-600">10%</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-2.5 md:h-3 bg-red-300 rounded-full overflow-hidden">
              <div
                className={`h-full bg-red-500 rounded-full transition-all duration-1500 ease-out ${
                  isVisible ? 'w-[10%]' : 'w-0'
                }`}
              ></div>
            </div>
            <div
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-1500 ease-out ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ left: isVisible ? '10%' : '0%' }}
            >
              <div className="w-6 h-6 md:w-8 md:h-8 bg-red-600 rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* Krishi ALO's Farming Market Card */}
        <div className="flex-1 bg-green-200 rounded-3xl p-6 md:p-8 shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800">
              KRISHI ALO's FARMING MARKET
            </h3>
            <div className="bg-white rounded-full px-3 md:px-4 py-1.5 md:py-2 flex items-center gap-2">
              <span className="text-green-600 font-medium text-xs md:text-sm">-125cr. BDT</span>
              <div className="bg-green-500 rounded-full p-1">
                <Info className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-xs md:text-sm text-gray-700 mb-1">Production Today</p>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-600">65k TON</p>
            </div>
            <div className="text-right">
              <p className="text-xs md:text-sm text-gray-700 mb-1">Success Rate</p>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-600">10%</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-2.5 md:h-3 bg-green-300 rounded-full overflow-hidden">
              <div
                className={`h-full bg-green-500 rounded-full transition-all duration-1500 ease-out ${
                  isVisible ? 'w-[90%]' : 'w-0'
                }`}
              ></div>
            </div>
            <div
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-1500 ease-out ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ left: isVisible ? '90%' : '0%' }}
            >
              <div className="w-6 h-6 md:w-8 md:h-8 bg-green-600 rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}