import prisma from '../config/db.js';

/**
 * List bookings for a specific user.
 */
export const listBookingsForUser = async (userId) => {
  return await prisma.booking.findMany({
    where: { userId },
    include: { service: true }, // No user info needed here for user dashboard
    orderBy: { createdAt: 'desc' },
  });
};

/**
 * Create a new booking with proper time overlap validation.
 */
export const createBooking = async (userId, data) => {
  const { serviceId, startTime, endTime, clientNotes } = data;
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (end <= start) throw new Error('End time must be after start time.');

  // The Service ID from the client is a String UUID, matching the Service model's 'id' field.
  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  
  if (!service) {
    // This confirms the serviceId sent by the client does not match any record in the database.
    console.error(`[BookingService Error] Failed to find service. ID received: ${serviceId}`);
    throw new Error('Service not found.');
  }

  const conflict = await prisma.booking.findFirst({
    where: {
      serviceId,
      AND: [{ endTime: { gt: start } }, { startTime: { lt: end } }],
    },
  });
  if (conflict) throw new Error('The selected time slot overlaps with an existing booking.');

  return await prisma.booking.create({
    data: { userId, serviceId, startTime: start, endTime: end, clientNotes },
    include: { service: true, user: true },
  });
};

/**
 * List all bookings (Admin only) with user info.
 */
export const listAllBookings = async () => {
  return await prisma.booking.findMany({
    include: {
      service: true,
      user: {
        select: { id: true, fullName: true, email: true, phone: true }, // include phone
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};

/**
 * Update booking payment and status.
 */
export const updateBookingPaymentStatus = async (bookingId, paymentStatus = 'PAID', status = 'CONFIRMED', stripePaymentId = null) => {
  const existing = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!existing) throw new Error('Booking not found');

  return await prisma.booking.update({
    where: { id: bookingId },
    data: { paymentStatus, status, ...(stripePaymentId ? { stripePaymentId } : {}) },
    include: { service: true, user: true },
  });
};

/**
 * Get booking by ID.
 */
export const getBookingById = async (bookingId) => {
  return await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { service: true, user: true },
  });
};