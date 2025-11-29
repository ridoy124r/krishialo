import React, { useLayoutEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Context
import { AuthProvider } from "./context/AuthContext"; // Removed .jsx

// Components
import Navbar from "./components/Navbar"; // Removed .jsx
import Footer from "./components/Footer"; // Removed .jsx
import ProtectedRoute from "./components/ProtectedRoute"; // Removed .jsx

// Pages
import Home from "./pages/Home"; // Removed .jsx
import ContactPage from "./pages/ContactPage"; // Removed .jsx
import Services from "./pages/Services"; // Removed .jsx
import About from "./pages/About"; // Removed .jsx
import Login from "./pages/Login"; // Removed .jsx
import Registration from "./pages/Registration"; // Removed .jsx
import Blog from "./pages/Blog"; // Removed .jsx

// Admin Components
import AdminLayout from "./pages/admin/AdminLayout"; // Removed .jsx
import AdminDashboard from "./pages/admin/AdminDashboard"; // Removed .jsx
import AdminUsers from "./pages/admin/AdminUsers"; // Removed .jsx
import AdminServices from "./pages/admin/AdminServices"; // Removed .jsx
import AdminBookings from "./pages/admin/AdminBookings"; // Removed .jsx

import BookingSuccess from "./pages/booking/BookingSuccess"; // Removed .jsx
import BookingCancelled from "./pages/booking/BookingCancelled"; // Removed .jsx

import ServiceBookingForm from "./components/ServiceFile/Book"; // Removed .jsx
import PaymentStatus from "./components/Payment/PaymentStatus"; // Removed .jsx
import UserProfile from "./pages/UserProfile/UserProfile"; // Removed .jsx


function AnimatedRoutes() {
  const location = useLocation();

  // Scrolls to top on route change
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    // AnimatePresence for page transitions
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper pt><ContactPage /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper pt><Login /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper pt><Registration /></PageWrapper>} />


        {/* User Profile (Protected) */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <PageWrapper pt><UserProfile /></PageWrapper>
            </ProtectedRoute>
          } 
        />
        
        {/* Booking Routes */}
        <Route path="/book" element={<PageWrapper pt><ServiceBookingForm /></PageWrapper>} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/booking-cancelled" element={<BookingCancelled />} />
        <Route path="/payment-status" element={<PageWrapper><PaymentStatus /></PageWrapper>} />
        
        {/* Admin Routes (Protected) */}
        <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminLayout /></ProtectedRoute>}>
          <Route index element={<PageWrapper pt><AdminDashboard /></PageWrapper>} />
          <Route path="dashboard" element={<PageWrapper pt><AdminDashboard /></PageWrapper>} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="bookings" element={<AdminBookings />} />
        </Route>
        
        {/* 404 Not Found Route */}
        <Route path="*" element={<PageWrapper pt><div>404 Page Not Found</div></PageWrapper>} /> 

      </Routes>
    </AnimatePresence>
  );
}

// Wrapper for motion animations
const PageWrapper = ({ children, pt = false }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.5 }}
    className={pt ? "pt-28 lg:pt-32 sm:pt-20" : ""}
  >
    {children}
  </motion.div>
);

export default function App() {
  return (
    <Router>
      {/* 1. AuthProvider MUST be inside the Router */}
      <AuthProvider> 
        <div className="app-root min-h-screen flex flex-col">
          <Navbar />
          <main className="grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}