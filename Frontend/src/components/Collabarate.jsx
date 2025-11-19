import React from 'react';

export default function CollaborationSlider() {
  // Partner logos data
  const partners = [
    { id: 1, name: "Campbell's", logo: "/images/1.png" },
    { id: 2, name: "Celanese", logo: "images/2.png" },
    { id: 3, name: "AXON", logo: "images/3.png" },
    { id: 4, name: "Air Products", logo: "/images/4.png" },
  ];

  // Duplicate partners for seamless infinite loop
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <div className="w-full bg-white py-16 px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-green-900 text-center mb-12">
          We are Proud to Collaborate with
        </h2>

        {/* Slider Container */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Sliding Content */}
          <div className="flex animate-scroll">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 flex items-center justify-center px-12 md:px-16"
                style={{ width: '300px' }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* fkldjfkl */}

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll {
          animation: scroll 5s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}