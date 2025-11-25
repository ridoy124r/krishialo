import React from 'react';

export default function CoreValues() {
  const values = [
    {
      icon: '/images/s.png',
      title: 'Safety Matters',
      description: 'Uncompromising standards in operations and compliance',
    },
    {
      icon: '/images/i.png',
      title: 'Innovation',
      description: 'Cutting-edge technology and continuous improvement',
    },
    {
      icon: '/images/c.png',
      title: 'Customer Focus',
      description: 'Tailored solutions for every client need',
    }
  ];

  return (
    <div className="w-full flex justify-center py-16 px-4 bg-white">
      <div className="w-full max-w-[1440px]">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Our Core Values
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-[#F5F7FA] rounded-2xl p-8 text-center transition-transform duration-300 hover:scale-105"
            >
              {/* Icon with background */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#E6F6EB] rounded-xl flex items-center justify-center">
                  <img src={value.icon} alt={value.title} className="w-8 h-8 md:w-12 md:h-12" />
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                {value.title}
              </h3>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
