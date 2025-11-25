import React from 'react';

export default function ServicesCards() {
    const services = [
        {
            title: "Smart Carping",
            coverage: "Minimum Coverage- 1.5 Acre",
            price: "15",
            unit: "BDT (Per Sqft)",
            image: "/images/e1.jpg"
        },
        {
            title: "Soil Analysis",
            coverage: "Minimum Coverage- 1.5 Acre",
            price: "12",
            unit: "BDT (Per Sqft)",
            image: "/images/e2.jpg"
        },
        {
            title: "Digital Surveying",
            coverage: "Minimum Load- 1.5 TONs",
            price: "18",
            unit: "BDT (Per KG)",
            image: "/images/e3.jpg"
        }
    ];

    return (
        <div className="m bg-white py-16 px-4">
            <div className="max-w-[1440px] mx-auto">
                <h1 className="text-5xl font-bold text-center text-[#2d3e50] mb-16">
                    Explore our other services
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-[#EEF5FB] p-4 rounded-2xl overflow-hidden shadow-md flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative h-52 rounded-3xl overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="px-6 pt-6 pb-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-3xl font-bold text-[#0d5a3c] mb-2">
                                        {service.title}
                                    </h2>

                                    <p className="text-gray-400 text-base mb-6">
                                        {service.coverage}
                                    </p>

                                    <div className="flex items-end mb-6">
                                        <span className="text-2xl text-[#0d5a3c] font-black self-start">৳</span>
                                        <span className="text-5xl font-bold text-[#0d5a3c] ml-1">{service.price}</span>
                                        <span className="text-sm text-gray-500 ml-2 font-medium">{service.unit}</span>
                                    </div>
                                </div>

                                {/* Button */}
                                <div className="pb-6">
                                    <button className="w-full bg-[#22c55e] hover:bg-[#1fb054] text-white font-semibold text-lg py-4 rounded-full transition-all duration-300 shadow-sm">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
