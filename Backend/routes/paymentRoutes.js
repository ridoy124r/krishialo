// routes/paymentRoutes.js
import express from 'express';
import Stripe from 'stripe';
import prisma from '../prismaClient.js';
import { protect } from '../auth.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/payment/create-payment-intent
router.post('/create-payment-intent', protect, async (req, res) => {
  const { serviceId } = req.body;
  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) return res.status(404).json({ error: 'Service not found' });

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(service.price * 100),
      currency: 'usd',
      metadata: { userId: req.user.id, serviceId: service.id },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Payment failed' });
  }
});

export default router;
