import React, { useState } from 'react';
import { Phone } from 'lucide-react';
 
export default function AgriTechContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
 
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
  };
 
  return (
    <div className="flex items-center justify-center p-4 md:p-8 ">
      <div className="w-full max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Section */}
          <div className="flex flex-col items-center lg:items-start space-y-6">
           
            {/* Heading */}
            <h2 className="text-[20px] sm:text-2xl md:text-[35px] lg:text-[30px] xl:text-[42px] font-bold text-gray-900 text-center lg:text-left whitespace-nowrap overflow-x-auto">
              Need Smart Agri-Tech Solutions?
            </h2>
 
            {/* Image */}
            <div className="w-full max-w-lg sm:max-w-xl lg:max-w-[650px] h-auto rounded-3xl overflow-hidden border border-[#009735]">
              <img
                src="/images/contact.jpg"
                alt="Smart Agriculture Technology - Drones monitoring crops"
                className="w-full h-auto object-cover rounded-3xl"
              />
            </div>
          </div>
 
          {/* Right Section - Contact Form */}
          <div className="bg-gray-100 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="space-y-6">
              {/* Form Header */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 text-center lg:text-left">
                  Contact with us
                </h2>
                <p className="text-gray-600 text-sm sm:text-base text-center lg:text-left">
                  Always here — powering your organic needs with smart agri-tech.
                </p>
              </div>
 
              {/* Contact Form */}
              <div className="space-y-5">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-gray-900 font-medium mb-2">
                    Your Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name here"
                    className="w-full px-4 py-3.5 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                </div>
 
                {/* Email and Subject Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-gray-900 font-medium mb-2">
                      Your email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email here"
                      className="w-full px-4 py-3.5 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    />
                  </div>
 
                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-gray-900 font-medium mb-2">
                      Subject*
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter Subject"
                      className="w-full px-4 py-3.5 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    />
                  </div>
                </div>
 
                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-gray-900 font-medium mb-2">
                    Your message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message to us"
                    rows="5"
                    className="w-full px-4 py-3.5 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none"
                  ></textarea>
                </div>
 
                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full sm:w-auto px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 