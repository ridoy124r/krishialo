// src/components/Navbar.jsx
import React, { useState, useEffect, useContext } from "react";
import { Menu, X, User, LogOut, UserCircle } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  const handleLogout = () => {
    if (logout) {
      logout();
    }
    setShowUserMenu(false);
    navigate("/");
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);

  const desktopLinkClass = ({ isActive }) =>
    `pb-1 transition-all duration-200 ease-out ${
      isActive
        ? "text-green-700 border-b-2 border-green-700 font-medium scale-110"
        : "text-gray-700 border-b-2 border-transparent hover:text-green-700 hover:border-green-700 hover:scale-105"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block py-2 text-lg font-medium transition-all duration-300 ease-out ${
      isActive ? "text-green-700 scale-110" : "text-gray-700 hover:text-green-700 hover:scale-105"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/70 shadow-md" : "bg-white/60"
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto py-4 px-6 lg:px-[120px]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/">
              <img
                src="/images/ka bg.png"
                alt="logo"
                className="object-contain h-12 w-auto sm:h-14 lg:h-16"
              />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={desktopLinkClass}
                end={item.path === "/"}
              >
                <span style={{ display: "inline-block" }}>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle className="w-8 h-8 text-gray-600" />
                  )}
                  <span className="text-gray-800 font-medium">{user?.fullName}</span>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <NavLink
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </NavLink>
                    {user?.isAdmin && (
                      <NavLink
                        to="/admin/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <UserCircle className="w-4 h-4" />
                        Admin Dashboard
                      </NavLink>
                    )}
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to="/register"
                  className="flex items-center px-6 py-3 text-white text-sm font-medium bg-green-800 rounded-lg hover:bg-green-900 transition"
                >
                  Get Started
                </NavLink>

                <NavLink
                  to="/login"
                  className="px-6 py-3 text-gray-800 text-sm font-medium border-2 border-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition flex items-center justify-center"
                >
                  Sign In
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg hover:bg-gray-100 transition lg:hidden"
            aria-label="Toggle menu"
          >
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
              <NavLink to="/">
                <img src="/images/ka bg.png" alt="Logo" className="h-8 w-auto" />
              </NavLink>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 text-2xl font-bold hover:text-red-600"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            {/* User Info (Mobile) */}
            {user && (
              <div className="px-4 py-4 border-b bg-gray-50">
                <div className="flex items-center gap-3">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle className="w-12 h-12 text-gray-600" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{user.fullName}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Menu */}
            <nav className="flex-1 px-4 py-4 overflow-y-auto">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={mobileLinkClass}
                  end={item.path === "/"}
                >
                  <span style={{ display: "inline-block" }}>{item.name}</span>
                </NavLink>
              ))}

              {user && (
                <>
                  <NavLink
                    to="/profile"
                    className={mobileLinkClass}
                  >
                    <span style={{ display: "inline-block" }}>My Profile</span>
                  </NavLink>
                  {user?.isAdmin && (
                    <NavLink
                      to="/admin/dashboard"
                      className={mobileLinkClass}
                    >
                      <span style={{ display: "inline-block" }}>Admin Dashboard</span>
                    </NavLink>
                  )}
                </>
              )}
            </nav>

            {/* Mobile Bottom Buttons */}
            <div className="px-4 py-4 mt-auto space-y-3 border-t">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 text-white font-medium bg-red-600 rounded-lg hover:bg-red-700 transition"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              ) : (
                <>
                  <NavLink
                    to="/register"
                    className="flex items-center justify-center w-full px-6 py-3 text-white font-medium bg-green-800 rounded-lg hover:bg-green-900 transition"
                  >
                    Get Started
                  </NavLink>

                  <NavLink
                    to="/login"
                    className="w-full px-6 py-3 text-gray-800 font-medium border-2 border-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition flex items-center justify-center"
                  >
                    Sign In
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;