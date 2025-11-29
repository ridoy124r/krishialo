import prisma from '../config/db.js';

/**
 * List bookings for a specific user
 */
export const listBookingsForUser = async (userId) => {
  return await prisma.booking.findMany({
    where: { userId },
    include: { service: true },
    orderBy: { createdAt: 'desc' },
  });
};

/**
 * Create a booking
 */
export const createBooking = async (userId, data) => {
  const { serviceId, startTime, endTime, clientNotes, amount } = data;

  if (!serviceId || !startTime || !endTime) {
    throw new Error('serviceId, startTime, and endTime are required');
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (end <= start) throw new Error('End time must be after start time');

  // Ensure the service exists. If it doesn't exist in the DB but matches
  // one of the known seed IDs used by the frontend, upsert it automatically.
  const FALLBACK_SERVICES = {
    '550e8400-e29b-41d4-a716-446655440000': {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Drone Surveillance',
      description: 'Advanced aerial surveillance for crop monitoring',
      price: 1.0,
      duration: 60,
      type: 'area',
      categoryId: 'cat-monitoring',
    },
    '550e8400-e29b-41d4-a716-446655440002': {
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'IoT Implementation',
      description: 'Smart IoT sensors for agriculture',
      price: 1.0,
      duration: 120,
      type: 'area',
      categoryId: 'cat-technology',
    },
    '550e8400-e29b-41d4-a716-446655440003': {
      id: '550e8400-e29b-41d4-a716-446655440003',
      name: 'Soil Analysis',
      description: 'Comprehensive soil health assessment',
      price: 1.0,
      duration: 90,
      type: 'area',
      categoryId: 'cat-analysis',
    },
    '550e8400-e29b-41d4-a716-446655440004': {
      id: '550e8400-e29b-41d4-a716-446655440004',
      name: 'Crop Monitoring',
      description: 'Real-time crop health monitoring',
      price: 1.0,
      duration: 60,
      type: 'area',
      categoryId: 'cat-monitoring',
    },
    '550e8400-e29b-41d4-a716-446655440005': {
      id: '550e8400-e29b-41d4-a716-446655440005',
      name: 'Logistics Service',
      description: 'Farm-to-market logistics solutions',
      price: 2.0,
      duration: 240,
      type: 'logistics',
      categoryId: 'cat-logistics',
    },
    '550e8400-e29b-41d4-a716-446655440006': {
      id: '550e8400-e29b-41d4-a716-446655440006',
      name: 'Digital Surveying',
      description: 'Precision land surveying services',
      price: 1.0,
      duration: 180,
      type: 'area',
      categoryId: 'cat-surveying',
    },
  };

  let service = await prisma.service.findUnique({ where: { id: serviceId } });

  if (!service) {
    // If we have a known fallback entry for this service id, upsert it.
    const fallback = FALLBACK_SERVICES[serviceId];
    if (fallback) {
      service = await prisma.service.upsert({
        where: { id: fallback.id },
        update: fallback,
        create: fallback,
      });
    } else {
      throw new Error(`Service not found with id: ${serviceId}`);
    }
  }

  // Check for time conflicts
  const conflict = await prisma.booking.findFirst({
    where: {
      serviceId,
      AND: [
        { endTime: { gt: start } },
        { startTime: { lt: end } }
      ],
    },
  });
  if (conflict) throw new Error('Selected time slot overlaps with an existing booking');

  return await prisma.booking.create({
    data: {
      userId,
      serviceId,
      startTime: start,
      endTime: end,
      clientNotes: clientNotes ? JSON.stringify(clientNotes) : null,
      totalCost: amount || 0
    },
    include: { service: true, user: true },
  });
};

/**
 * Get booking by ID
 */
export const getBookingById = async (bookingId) => {
  return await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { service: true, user: true },
  });
};

/**
 * Update payment status
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
 * List all bookings (admin)
 */
export const listAllBookings = async () => {
  return await prisma.booking.findMany({
    include: {
      service: true,
      user: { select: { id: true, fullName: true, email: true, phone: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};
