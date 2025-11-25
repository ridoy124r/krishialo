import React from 'react';

export default function UpcomingProducts() {
  const products = [
    { image: "/images/p1.png", price: "25,000" },
    { image: "/images/p2.png", price: "69,000" },
    { image: "/images/p3.png", price: "80, 000" },
    { image: "/images/p4.png", price: "100.00" },
    { image: "/images/p5.png", price: "51,000" },
    { image: "/images/p6.png", price: "59,000" }
  ];

  // Duplicate products for seamless infinite scroll
  const duplicatedProducts = [...products, ...products, ...products];

  return (
    <div className="w-full bg-[#f5f3e8] py-16 px-4">
      <div className="max-w-[1440px] mx-auto">
        <h1 className="text-5xl font-bold text-center text-[#2d3e50] mb-16">
          Our Upcoming Products
        </h1>

        <div className="relative overflow-hidden">
          {/* Slider Container */}
          <div className="flex animate-infinite-scroll hover:pause-animation">
            {duplicatedProducts.map((product, index) => (
              <div 
                key={index}
                className="flex-shrink-0 px-4"
                style={{ width: '220px' }}
              >
                <div className="flex flex-col items-center">
                  {/* Circle Image Container */}
                  <div className="relative w-44 h-44 rounded-full border-4 border-gray-800 bg-white overflow-hidden mb-4 shadow-lg">
                    <img 
                      src={product.image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Price */}
                  <div className="text-center">
                    <span className="text-2xl font-bold text-[#2d3e50]">
                      ৳{product.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 20s linear infinite;
        }

        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}