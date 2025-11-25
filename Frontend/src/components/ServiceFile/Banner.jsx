import React from 'react';

export default function HeroBanner() {
  return (
    <div className="w-full bg-white">
      <div className="relative w-full">
        <img 
          src="/images/Banner.jpg"
          alt="Smart IoT Products Banner"
          className="w-full  object-cover"
        />
      </div>
    </div>
  );
}
