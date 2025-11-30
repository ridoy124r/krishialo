import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';

export const createAdmin = async ({ fullName, email, password }) => {
  if (!fullName || !email || !password) {
    const e = new Error('fullName, email and password required');
    e.status = 400;
    throw e;
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const e = new Error('Email already in use');
    e.status = 400;
    throw e;
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { fullName, email, password: hashed, isAdmin: true }
  });
  return user;
};

export const listAllUsers = async () => {
  return await prisma.user.findMany({
    include: {
      bookings: {
        include: { service: true },
        orderBy: { createdAt: 'desc' }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};

export const getUserWithBookings = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      bookings: {
        include: { service: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  });
};

export const updateProfile = async (userId, { fullName, email, phone, location, profileImage }) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    const e = new Error('User not found');
    e.status = 404;
    throw e;
  }

  // If email is changing, ensure uniqueness
  if (email && email !== user.email) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      const e = new Error('Email already in use');
      e.status = 400;
      throw e;
    }
  }

  const data = {};
  if (fullName !== undefined) data.fullName = fullName;
  if (email !== undefined) data.email = email;
  if (phone !== undefined) data.phone = phone;
  if (location !== undefined) data.location = location;
  if (profileImage !== undefined) data.profileImage = profileImage;

  const updated = await prisma.user.update({
    where: { id: userId },
    data
  });

  return updated;
};
