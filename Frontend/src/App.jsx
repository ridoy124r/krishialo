import React, { useLayoutEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// FIX: Added .jsx extension to all local component and page imports
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Public Pages (assuming these paths are correct relative to App.jsx)
import Home from "./pages/Home.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
import Blog from "./pages/Blog.jsx";

// Admin Components
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminServices from "./pages/admin/AdminServices.jsx";
import AdminBookings from "./pages/admin/AdminBookings.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Core Booking & Payment Imports
// NOTE: I've added the .jsx extension explicitly for robustness
import ServiceBookingForm from "./components/ServiceFile/Book.jsx"; 
import PaymentStatus from "./components/Payment/PaymentStatus.jsx"; // <<< New Import

function AnimatedRoutes() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper pt><ContactPage /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper pt><Login /></PageWrapper>} />
        <Route path="/regester" element={<PageWrapper pt><Registration /></PageWrapper>} />
        
        {/* Booking Routes */}
        <Route path="/book" element={<PageWrapper><ServiceBookingForm /></PageWrapper>} />
        
        {/* Payment Confirmation/Return Route (Critical for external payment systems) */}
        {/* This route is where Stripe (or mock-stripe) redirects the user after payment. */}
        <Route path="/payment-status" element={<PageWrapper><PaymentStatus /></PageWrapper>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="bookings" element={<AdminBookings />} />

        </Route>
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
      <div className="app-root min-h-screen flex flex-col">
        <Navbar />
        <main className="grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}