// routes/bookingRoutes.js
import express from 'express';
import {
  listBookingsForUser,
  createBooking,
  listAllBookings,
  debugBooking,
  createCheckoutSession,  // ✅ NEW
  handleStripeWebhook,    // ✅ NEW
  verifyPayment,          // ✅ NEW
} from '../controllers/bookingController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ NEW: Stripe Checkout Session (protected route)
router.post('/create-checkout-session', protect, createCheckoutSession);

// ✅ NEW: Verify payment after redirect (protected route)
router.get('/verify-payment', protect, verifyPayment);

// Standard booking routes
router.post('/', protect, createBooking);
router.get('/me', protect, listBookingsForUser);
router.get('/debug/:id', protect, debugBooking);
router.get('/', protect, admin, listAllBookings);

export default router;