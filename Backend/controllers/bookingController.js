import * as bookingService from '../services/bookingService.js';

export const listBookingsForUser = async (req, res, next) => {
  try {
    const bookings = await bookingService.listBookingsForUser(req.user.id);
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    // ✅ Pass the entire req.body object, not just serviceId
    const booking = await bookingService.createBooking(req.user.id, req.body);
    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};

export const listAllBookings = async (req, res, next) => {
  // admin endpoint
  try {
    const bookings = await bookingService.listAllBookings();
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

/**
 * Called by frontend after a successful Stripe payment confirmation.
 * Accepts { bookingId } in the body and updates booking payment/status.
 */
export const paymentSuccess = async (req, res, next) => {
  try {
    const { bookingId } = req.body;
    if (!bookingId) return res.status(400).json({ message: 'bookingId is required' });

    // Fetch and verify booking ownership
    const booking = await bookingService.listBookingsForUser(req.user.id).then(bs => bs.find(b => b.id === bookingId));

    // If booking not found for this user, it could be admin or mismatch
    if (!booking && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized or booking not found' });
    }

    console.log(`Processing payment success for booking: ${bookingId}`);

    const updated = await bookingService.updateBookingPaymentStatus(bookingId, 'PAID', 'CONFIRMED');

    console.log('✅ Booking payment updated successfully:', {
      bookingId: updated.id,
      paymentStatus: updated.paymentStatus,
      status: updated.status,
    });

    res.json({ message: 'Payment recorded successfully', booking: updated });
  } catch (err) {
    next(err);
  }
};

/**
 * Temporary debug endpoint - returns booking and whether current user matches owner
 */
export const debugBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const booking = await bookingService.getBookingById ? await bookingService.getBookingById(bookingId) : null;

    // fallback if service doesn't expose getBookingById
    if (!booking) {
      // attempt raw prisma fetch via service: listAllBookings and find
      const all = await bookingService.listAllBookings();
      const found = all.find(b => b.id === bookingId);
      return res.json({ booking: found || null, userId: req.user.id, matches: found ? found.userId === req.user.id : false });
    }

    res.json({ booking, userId: req.user.id, matches: booking.userId === req.user.id });
  } catch (err) {
    next(err);
  }
};