import React from "react";
import { motion } from "framer-motion";

const StatsSection = () => {
  const boxVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section
      className="bg-green-700 bg-repeat px-4 py-8 md:py-12 mb-20"
      style={{
        backgroundImage: "url('/images/cl bg.png')",
        backgroundSize: "auto",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
        {/* Left Box (Client Info) */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={boxVariants}
          className="md:col-span-1 lg:col-span-2 bg-white border-2 border-green-900 rounded-lg flex flex-col items-center justify-center gap-2 px-4 py-4 md:py-6 text-center shadow-lg"
        >
          <div className="flex -space-x-3 mb-2 justify-center">
            <motion.img
              initial={{ scale: 0, x: -20 }}
              whileInView={{ scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="avatar1"
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
            <motion.img
              initial={{ scale: 0, y: -20 }}
              whileInView={{ scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
              src="https://randomuser.me/api/portraits/men/45.jpg"
              alt="avatar2"
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
            <motion.img
              initial={{ scale: 0, x: 20 }}
              whileInView={{ scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              src="https://randomuser.me/api/portraits/men/77.jpg"
              alt="avatar3"
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
            <motion.button
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center border-2 border-white text-xl font-bold"
            >
              +
            </motion.button>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-green-900 font-black text-xl md:text-2xl mt-2 leading-tight"
          >
            10k+ Exclusive Client
          </motion.h2>
        </motion.div>

        {/* Middle Logo */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={boxVariants}
          className="md:col-span-1 lg:col-span-2 flex justify-center"
        >
          <div className="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full border-4 border-white flex items-center justify-center bg-white shadow-xl">
            <motion.img
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.4 }}
              src="/images/ka bg.png"
              alt="Middle Logo"
              className="max-w-[70%] max-h-[70%] object-contain"
            />
          </div>
        </motion.div>

        {/* Right Boxes */}
        <div className="md:col-span-1 lg:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={boxVariants}
              className="bg-white border-2 border-green-900 rounded-lg p-4 text-center w-full shadow-md"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
                className="text-green-900 mb-2"
              >
                <motion.svg
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </motion.svg>
              </motion.div>
              <h3 className="md:text-md text-green-900 font-black text-2xl">368</h3>
              <p className="text-green-900 text-sm mt-1">Happy Clients</p>
            </motion.div>

            <motion.div
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={boxVariants}
              className="bg-white border-2 border-green-900 rounded-lg p-4 text-center w-full shadow-md"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
                className="md:text-md text-green-900 mb-2"
              >
                <motion.svg
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z"
                  />
                </motion.svg>
              </motion.div>
              <h3 className="text-green-900 font-black text-2xl">100</h3>
              <p className="text-green-900 text-sm mt-1">Projects Completed</p>
            </motion.div>

            <motion.div
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={boxVariants}
              className="bg-white border-2 border-green-900 rounded-lg p-4 text-center w-full col-span-2 lg:col-span-1 md:col-span-1 sm:col-span-1 shadow-md"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0, duration: 0.5, type: "spring" }}
                className="text-green-900 mb-2"
              >
                <motion.svg
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto w-7 h-7"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.4 15A7.969 7.969 0 0121 12c0-4.418-3.582-8-8-8s-8 3.582-8 8c0 1.333.418 2.567 1.122 3.6"
                  />
                </motion.svg>
              </motion.div>
              <h3 className="text-green-900 font-black text-2xl">438</h3>
              <p className="text-green-900 text-sm mt-1">IoT Products Sold</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;