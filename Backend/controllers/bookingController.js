// controllers/bookingController.js
import * as bookingService from '../services/bookingService.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * List bookings for the current logged-in user
 */
export const listBookingsForUser = async (req, res, next) => {
  try {
    const bookings = await bookingService.listBookingsForUser(req.user.id);
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

/**
 * Create a new booking
 */
export const createBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.createBooking(req.user.id, req.body);
    res.status(201).json(booking);
  } catch (err) {
    console.error('Error creating booking:', err);
    next(err);
  }
};

/**
 * List all bookings (admin only)
 */
export const listAllBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.listAllBookings();
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

/**
 * ✅ NEW: Create Stripe Checkout Session
 */
export const createCheckoutSession = async (req, res, next) => {
  try {
    const { bookingId, amount } = req.body;

    if (!bookingId) {
      return res.status(400).json({ message: 'bookingId is required' });
    }

    // Validate booking exists and belongs to user
    const booking = await bookingService.getBookingById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'bdt', // Bangladeshi Taka
            product_data: {
              name: booking.service.name,
              description: `Booking for ${booking.service.name}`,
              images: ['https://via.placeholder.com/300'], // Replace with actual image
            },
            unit_amount: Math.round(booking.totalCost * 100), // Convert to paisa (cents)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/booking-cancelled`,
      client_reference_id: bookingId,
      metadata: {
        bookingId: bookingId,
        userId: req.user.id,
      },
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error('Stripe Checkout Error:', err);
    next(err);
  }
};

/**
 * ✅ NEW: Handle Stripe Webhook Events
 */
export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const bookingId = session.client_reference_id || session.metadata.bookingId;

      console.log('✅ Payment successful for booking:', bookingId);

      try {
        // Update booking status
        await bookingService.updateBookingPaymentStatus(
          bookingId,
          'PAID',
          'CONFIRMED',
          session.payment_intent
        );

        console.log('✅ Booking updated successfully');
      } catch (err) {
        console.error('❌ Error updating booking:', err);
      }
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object;
      const bookingId = session.client_reference_id || session.metadata.bookingId;

      console.log('⚠️ Payment session expired for booking:', bookingId);

      try {
        await bookingService.updateBookingPaymentStatus(bookingId, 'FAILED', 'CANCELLED');
      } catch (err) {
        console.error('❌ Error updating expired booking:', err);
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      console.log('❌ Payment failed:', paymentIntent.id);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
};

/**
 * ✅ NEW: Verify payment after redirect (optional - webhook is primary)
 */
export const verifyPayment = async (req, res, next) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ message: 'session_id is required' });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);
    const bookingId = session.client_reference_id || session.metadata.bookingId;

    const booking = await bookingService.getBookingById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({
      success: true,
      paymentStatus: session.payment_status,
      booking: booking,
    });
  } catch (err) {
    console.error('Payment verification error:', err);
    next(err);
  }
};

/**
 * Debug endpoint
 */
export const debugBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const booking = await bookingService.getBookingById(bookingId);

    if (!booking) {
      const all = await bookingService.listAllBookings();
      const found = all.find(b => b.id === bookingId);
      return res.json({
        booking: found || null,
        userId: req.user.id,
        matches: found ? found.userId === req.user.id : false
      });
    }

    res.json({
      booking,
      userId: req.user.id,
      matches: booking.userId === req.user.id
    });
  } catch (err) {
    next(err);
  }
};