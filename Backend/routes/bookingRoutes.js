import express from 'express';
import * as bookingCtrl from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { createPaymentIntent } from '../controllers/paymentsController.js';

const router = express.Router();

// user endpoints
router.get('/', protect, bookingCtrl.listBookingsForUser);
router.post('/', protect, bookingCtrl.createBooking);

// stripe payment route
router.post('/create-payment-intent', protect, createPaymentIntent);

// frontend-confirmation after successful card payment
router.post('/payment-success', protect, bookingCtrl.paymentSuccess);

// debug endpoint to inspect booking and ownership
router.get('/debug/booking/:id', protect, bookingCtrl.debugBooking);

// admin listing
router.get('/all', protect, admin, bookingCtrl.listAllBookings);

export default router;
