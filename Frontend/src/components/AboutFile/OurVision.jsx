import React from 'react';

export default function OurVision() {
  const visionItems = [
    {
      icon: '/images/o1.png',
      title: 'Farm Development',
      description:
        'We use IoT-driven data to guide complete farm development—from identifying which soil suits which crop to monitoring growth, resources, and overall productivity. Every step is optimized through real-time insights to ensure smarter, efficient, and sustainable farming.',
    },
    {
      icon: '/images/o2.png',
      title: 'Crop Management',
      description:
        'Our IoT-powered Crop Management system tracks crop health, growth stages, soil conditions, and resource needs in real time. From planting to harvesting, every decision is optimized with data to ensure higher yield, reduced waste, and smarter farming.',
    },
    {
      icon: '/images/o3.png',
      title: 'Soil Restoration',
      description:
        'Our IoT-based Soil Restoration process identifies nutrient loss, monitors soil health, and guides precise treatments to revive fertility. Through data-driven actions, we rebuild soil strength, improve productivity, and support long-term sustainable farming.',
    },
  ];

  return (
    <div className="w-full flex justify-center py-16 px-4 bg-gray-50">
      <div className="w-full max-w-[1440px]">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-green-900 mb-16">
          Our Vision
        </h2>

        {/* Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visionItems.map((item, index) => (
            <div key={index} className="text-left">
              {/* Icon */}
              <div className="mb-6 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-14 h-14 md:w-20 md:h-20"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
