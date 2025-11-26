import Stripe from 'stripe';
import 'dotenv/config.js';
import * as bookingService from '../services/bookingService.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Create a Stripe Payment Intent for a booking
 */
export const createPaymentIntent = async (req, res, next) => {
  try {
    const { bookingId, amount } = req.body;

    if (!bookingId || !amount) {
      return res.status(400).json({ error: 'bookingId and amount are required' });
    }

    console.log(`Creating payment intent for booking: ${bookingId}`);
    // Check if booking already has a stripePaymentId
    const booking = await bookingService.getBookingById(bookingId);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    if (booking.stripePaymentId) {
      try {
        const existingPI = await stripe.paymentIntents.retrieve(booking.stripePaymentId);
        // If existing payment intent is still actionable (not succeeded/canceled), return its client_secret
        if (existingPI && existingPI.status && !['succeeded', 'canceled', 'requires_payment_method'].includes(existingPI.status)) {
          console.log('Re-using existing payment intent:', existingPI.id, 'status:', existingPI.status);
          return res.status(200).json({ clientSecret: existingPI.client_secret, paymentIntentId: existingPI.id, reused: true });
        }
      } catch (err) {
        // If retrieve fails, we'll create a new one below. Log for debugging.
        console.warn('Failed to retrieve existing PaymentIntent, creating a new one', err.message || err);
      }
    }

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // in cents
      currency: 'usd',
      metadata: { bookingId },
    });

    console.log('Payment intent created:', paymentIntent.id);

    // Persist the paymentIntent id on the booking to avoid duplicate intents later
    try {
      await bookingService.setBookingStripePaymentId(bookingId, paymentIntent.id);
    } catch (err) {
      console.warn('Failed to persist paymentIntent id on booking:', err.message || err);
    }

    res.status(200).json({ clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

/**
 * Stripe webhook to handle payment events
 * This ensures bookings are updated even if frontend fails
 */
export const handleStripeWebhook = async (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      const bookingId = paymentIntent.metadata.bookingId;

      if (bookingId) {
        try {
          console.log(`Processing payment success for booking: ${bookingId} (stripe id: ${paymentIntent.id})`);
          const updated = await bookingService.updateBookingPaymentStatus(bookingId, 'PAID', 'CONFIRMED', paymentIntent.id);
          console.log('✅ Booking updated via webhook:', { bookingId: updated.id, paymentStatus: updated.paymentStatus, status: updated.status, stripePaymentId: updated.stripePaymentId });
        } catch (err) {
          console.error('Failed to update booking payment status', err);
        }
      }
      break;

    case 'payment_intent.payment_failed':
      console.warn('Payment failed for:', event.data.object.id);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
};
