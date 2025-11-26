import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/helpers.js';

// Helper for throwing HTTP errors
const throwError = (message, status = 400) => {
    const err = new Error(message);
    err.status = status;
    throw err;
};

/**
 * REGISTER USER
 */
export const register = async ({ fullName, email, password }) => {
    if (!fullName || !email || !password) {
        throwError('fullName, email and password are required', 400);
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user exists
    const existing = await prisma.user.findUnique({
        where: { email: normalizedEmail }
    });

    if (existing) {
        throwError('Email already in use', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            fullName,
            email: normalizedEmail,
            password: hashedPassword
        }
    });

    return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        isAdmin: user.isAdmin
    };
};

/**
 * LOGIN USER
 */
export const login = async ({ email, password }) => {
    if (!email || !password) {
        throwError('email and password required', 400);
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Case-insensitive email lookup
    const user = await prisma.user.findFirst({
        where: {
            email: {
                equals: normalizedEmail,
                mode: 'insensitive'
            }
        }
    });

    if (!user) {
        throwError('Invalid credentials', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throwError('Invalid credentials', 401);
    }

    const token = generateToken({
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin
    });

    return {
        token,
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            isAdmin: user.isAdmin
        }
    };
};
