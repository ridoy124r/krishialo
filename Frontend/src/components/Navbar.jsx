import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const menuItems = ["Home", "About Us", "Services", "Blog", "Contact"];

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${isScrolled ? 'bg-white/70 shadow-md' : 'bg-white/60 '}
      `}
    >
      <div className="w-full max-w-[1440px] mx-auto py-4 px-6 lg:px-[120px]">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/images/logo.png"
              alt="logo"
              className="object-contain h-12 w-auto sm:h-14 lg:h-16"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
                onClick={() => setActiveMenu(item)}
                className={`
                  pb-1 transition-all duration-200 ease-out
                  ${
                    activeMenu === item
                      ? "text-green-700 border-b-2 border-green-700 font-medium scale-110"
                      : "text-gray-700 border-b-2 border-transparent hover:text-green-700 hover:border-green-700 hover:scale-105"
                  }
                `}
                style={{ display: "inline-block" }} 
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="flex items-center px-6 py-3 text-white text-sm font-medium bg-green-800 rounded-lg hover:bg-green-900 transition">
              <span>Get Started</span>
            </button>

            <button className="px-6 py-3 text-gray-800 text-sm font-medium border-2 border-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="p-2 rounded-lg hover:bg-gray-100 transition lg:hidden">
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-800" />
            ) : (
              <Menu className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed top-0 right-0 h-screen w-72 flex flex-col bg-white border-l border-gray-200 shadow-xl"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <img src="/images/logo.png" alt="Logo" className="h-8 w-auto" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 text-2xl font-bold hover:text-red-600"
              >
                ×
              </button>
            </div>

            {/* Mobile Menu */}
            <nav className="flex-1 px-4 py-4 overflow-y-auto">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
                  onClick={() => {
                    setActiveMenu(item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    block py-2 text-lg font-medium transition-all duration-300 ease-out
                    ${
                      activeMenu === item
                        ? "text-green-700 scale-110"
                        : "text-gray-700 hover:text-green-700 hover:scale-105"
                    }
                  `}
                  style={{ display: "inline-block" }}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="px-4 py-4 mt-auto space-y-3 border-t">
              <button className="flex items-center justify-center w-full px-6 py-3 text-white font-medium bg-green-800 rounded-lg hover:bg-green-900 transition">
                Get Started
              </button>

              <button className="w-full px-6 py-3 text-gray-800 font-medium border-2 border-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition">
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
