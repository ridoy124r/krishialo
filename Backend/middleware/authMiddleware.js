import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config();

export const protect = async (req, res, next) => {
  let token = null;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is invalid' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next();
  return res.status(403).json({ message: 'Admin access required' });
};
