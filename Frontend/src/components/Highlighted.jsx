import React from "react";
import { Tv, Wifi, Truck } from "lucide-react";

const ServiceCard = ({ icon: Icon, title, description, image }) => {
  return (
    <div
      className="relative group rounded-2xl overflow-hidden shadow-xl 
                 border-b-4 border-transparent transition-all duration-300
                 hover:border-red-500 max-w-sm w-full
                 [clip-path:polygon(0%_12%,15%_0,100%_0,100%_100%,0_100%)]"
    >
      {/* Top Image */}
      <div className="h-56 overflow-hidden"> {/* Increased height */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Icon */}
      <div className="absolute top-32 left-6 bg-green-900 p-3 rounded-xl shadow-lg border-4 border-white">
        <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
      </div>

      {/* Card Content */}
      <div className="bg-white p-6 pt-8 "> {/* Increased padding */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>

        <a
          href="#"
          className="text-orange-500 font-semibold text-sm inline-flex items-center 
                     hover:text-orange-600 transition-colors"
        >
          Learn More →
        </a>
      </div>
    </div>
  );
};

export default function HighlightedServices({
  backgroundImage = "/images/bg pic.png",
}) {
  const services = [
    {
      id: 1,
      icon: Tv,
      title: "Drone Surveillance",
      description:
        "Optimize routes, track shipments in real-time, and boost supply chain efficiency using smart IoT logistics.",
      image: "/images/card1.png",
    },
    {
      id: 2,
      icon: Wifi,
      title: "IoT Implementation",
      description:
        "Optimize routes, track shipments in real-time, and boost supply chain efficiency using smart IoT logistics.",
      image: "/images/card2.png",
    },
    {
      id: 3,
      icon: Truck,
      title: "Smart Logistics",
      description:
        "Optimize routes, track shipments in real time, and boost supply chain efficiency using smart IoT logistics.",
      image: "/images/card3.png",
    },
  ];

  return (
    <div className="w-full py-16 flex justify-center items-center relative">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      ></div>
      <div
        className="absolute inset-0"
        style={{ backgroundColor: '#1E522C66' }} // 40% shade overlay
      ></div>

      {/* Content */}
      <div className="w-full max-w-[1400px] relative z-10 rounded-3xl overflow-hidden px-6 md:px-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl pt-3 pb-7 font-bold text-white text-center mt-0 mb-20">
          Our <span className="">Highlighted</span> Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              image={service.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
