import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function KrishiAloFooter() {
  return (
    <div className="w-full bg-gradient-to-b from-gray-900 to-black">
      {/* CTA Section */}
      <div className="flex justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-[1440px]">
          <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Let's book a Service!
            </h2>
            <p className="text-white text-base md:text-lg lg:text-xl max-w-5xl mx-auto mb-8 leading-relaxed">
              Get cutting-edge drone services tailored for your needs — from agriculture and construction to energy, safety, and more. Our certified pilots and advanced technology ensure accuracy, efficiency, and safety every time. Book today and experience the future of aerial solutions.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              BOOK A SERVICE
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-4 py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <img 
                src="/images/logo.png" 
                alt="Krishi Alo - Smart Agriculture" 
                className="h-16 w-auto"
              />
              <p className="text-gray-300 text-base leading-relaxed">
                Professional drone services for agriculture, construction, energy, and more. Trusted by enterprises across India.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Service Links */}
            <div>
              <h3 className="text-white text-xl font-bold mb-6">Service</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-500 transition-colors">
                    Agriculture & Farming
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-500 transition-colors">
                    Construction
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-500 transition-colors">
                    Energy & Utilities
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-500 transition-colors">
                    Public Safety
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white text-xl font-bold mb-6">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-500 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-500 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white text-xl font-bold mb-6">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>Mirpur, Dhaka, Bangladesh</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <a href="tel:+8801718814372" className="hover:text-green-500 transition-colors">
                    +880 1718814372
                  </a>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <a href="mailto:info@krishialo.com" className="hover:text-green-500 transition-colors">
                    info@krishialo.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 KrishiAlo Bangladesh. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}