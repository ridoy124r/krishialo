import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';

export const createAdmin = async ({ fullName, email, password }) => {
  if (!fullName || !email || !password) {
    const e = new Error('fullName, email and password required');
    e.status = 400;
    throw e;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existing = await prisma.user.findFirst({
    where: {
      email: {
        equals: normalizedEmail,
        mode: 'insensitive'
      }
    }
  });

  if (existing) {
    const e = new Error('Email already in use');
    e.status = 400;
    throw e;
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashed,
      isAdmin: true
    }
  });

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    isAdmin: user.isAdmin
  };
};
