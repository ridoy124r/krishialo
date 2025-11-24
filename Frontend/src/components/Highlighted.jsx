import React from "react";
import { Tv, Wifi, Truck } from "lucide-react";
import { motion } from "framer-motion";
 
const ServiceCard = ({ icon: Icon, title, description, image, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
    >
      <motion.div
        whileHover={{ scale: 1.05, rotateX: 6, rotateY: -6 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative group rounded-2xl overflow-hidden shadow-xl max-w-sm w-full
                   border border-white/10 backdrop-blur-xl
                   [clip-path:polygon(0%_12%,15%_0,100%_0,100%_100%,0_100%)]
                   bg-white/90"
      >
        {/* Light Sweep */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
                          translate-x-[-200%] group-hover:translate-x-[200%] duration-700 ease-out"></div>
        </div>
 
        {/* Glow Bottom */}
        <div className="absolute -bottom-6 left-6 w-[80%] h-10 blur-2xl rounded-full bg-green-500/20 group-hover:bg-green-500/40 transition-all duration-500"></div>
 
        {/* Image */}
        <div className="h-56 relative overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 duration-500" />
        </div>
 
        {/* Floating Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: delay + 0.3 }}
          className="absolute z-10 top-50 left-6 bg-green-900 p-4 rounded-xl
                     shadow-xl border-2 border-white"
        >
          <Icon className="w-5 h-5 text-white" strokeWidth={3} />
        </motion.div>
 
        {/* Content */}
        <div className="bg-white p-7 pt-15  relative ">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-5 leading-relaxed">{description}</p>
 
          {/* --- ORANGE HOVER BUTTON (UPDATED) --- */}
          <a
            href="#"
            className="text-orange-500 font-semibold text-sm inline-flex items-center gap-1
                       group-hover:text-orange-600 hover:translate-x-1
                       transition-all duration-300 relative"
          >
            Learn More →
            <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-orange-500
                             group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};
 
export default function HighlightedServices({ backgroundImage = "/images/bg pic.png" }) {
  const services = [
    {
      id: 1,
      icon: Tv,
      title: "Drone Surveillance",
      description: "Monitor fields in real-time with automated drone coverage.",
      image: "/images/card1.png",
    },
    {
      id: 2,
      icon: Wifi,
      title: "IoT Implementation",
      description: "Turn farms smart with fully integrated IoT ecosystems.",
      image: "/images/card2.png",
    },
    {
      id: 3,
      icon: Truck,
      title: "Smart Logistics",
      description: "Seamless supply chain tracking with real-time smart sensors.",
      image: "/images/card3.png",
    },
  ];
 
  return (
    <div className="w-full py-20 flex justify-center items-center relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      ></div>
      <div className="absolute inset-0 bg-[#1E522C66]"></div>
 
      <div className="w-full max-w-[1400px] relative z-10 px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                     font-bold text-white text-center mb-20"
        >
          Our <span className="text-green-300">Highlighted</span> Services
        </motion.h2>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              image={service.image}
              delay={index * 0.3}
            />
          ))}
        </div>
      </div>
    </div>
  );
}