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

export const updateUserProfile = async (userId, { fullName, email, phone, location }) => {
  const existing = await prisma.user.findUnique({ where: { id: userId } });
  if (!existing) {
    const e = new Error('User not found');
    e.status = 404;
    throw e;
  }

  // Check if email is being changed and if new email is already in use
  if (email !== existing.email) {
    const emailExists = await prisma.user.findUnique({ where: { email } });
    if (emailExists) {
      const e = new Error('Email already in use');
      e.status = 400;
      throw e;
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      fullName,
      email,
      phone,
      location
    }
  });

  return updatedUser;
};
