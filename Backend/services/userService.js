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
