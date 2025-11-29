import express from 'express';
import Stripe from 'stripe';
import 'dotenv/config.js'; // Ensure environment variables are loaded

// Initialize Stripe with your Secret Key from the .env file
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16', // Use a recent stable API version
});

const router = express.Router();

// --- MOCK DATABASE/BOOKING LOGIC (REPLACE WITH YOUR ACTUAL DB) ---
// This assumes your actual booking data is stored here, linked by bookingId
const mockBookings = {};

// Placeholder function to simulate fetching booking details from DB
const getBooking = (bookingId) => {
    // In production, this would be a real DB lookup
    return mockBookings[bookingId];
};

// Placeholder function to simulate updating booking status in DB
const updateBookingStatus = (bookingId, status, paymentIntentId) => {
    console.log(`[DB] Booking ${bookingId} status updated to: ${status} with PI: ${paymentIntentId}`);
    if (mockBookings[bookingId]) {
        mockBookings[bookingId].status = status;
        mockBookings[bookingId].paymentIntentId = paymentIntentId;
    }
};

// --- ROUTES ---

// 1. Create Payment Intent Route (Called by Frontend)
router.post('/create-intent', async (req, res) => {
    try {
        const { bookingId, amount, currency } = req.body;

        // CRITICAL: In a real app, you must fetch the booking from your DB
        // using bookingId and verify that the 'amount' requested by the client 
        // matches the true amount stored in your secure database.
        
        // Mock validation: 
        if (!bookingId || !amount || amount <= 0) {
            return res.status(400).send({ message: 'Invalid booking details or amount.' });
        }
        
        // Create the PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Amount in cents/paisa
            currency: currency || 'bdt',
            // Pass the booking ID to Stripe metadata for easier webhook processing
            metadata: { booking_id: bookingId } 
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });

    } catch (error) {
        console.error('Error creating Payment Intent:', error);
        res.status(500).send({ message: error.message });
    }
});


// 2. Webhook Handler (Called by Stripe)
// IMPORTANT: This route MUST use raw body parsing, NOT express.json()
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    // Verify the event signature
    try {
        // REPLACE with your actual webhook secret (whsec_...) from the Stripe CLI or Dashboard
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET; 
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.log(`❌ Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            const bookingId = paymentIntent.metadata.booking_id;
            
            console.log(`✅ PaymentIntent Succeeded for Booking ID: ${bookingId}`);
            
            // FULFILL THE ORDER HERE:
            // 1. Fetch booking from your database using bookingId
            // 2. Check if booking status is already 'paid' (to prevent double-processing)
            // 3. Update the booking status to 'confirmed' / 'paid'
            updateBookingStatus(bookingId, 'confirmed', paymentIntent.id);
            break;
            
        case 'payment_intent.payment_failed':
            const failedPaymentIntent = event.data.object;
            const failedBookingId = failedPaymentIntent.metadata.booking_id;
            
            console.log(`❌ PaymentIntent Failed for Booking ID: ${failedBookingId}`);
            // NOTIFY USER/ADMIN: Update booking status to 'failed'
            updateBookingStatus(failedBookingId, 'failed', failedPaymentIntent.id);
            break;

        default:
            // Unexpected event type
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 to acknowledge receipt of the event
    res.json({ received: true });
});


export default router;