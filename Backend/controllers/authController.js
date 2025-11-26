// D:/newPractice/Backend/controllers/authController.js

import * as authService from '../services/authService.js';

// Controller for user registration (POST /api/auth/register)
export const registerUser = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        // Call service layer for registration
        const user = await authService.register({ fullName, email, password });

        // Success response
        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }
};

// Controller for user login (POST /api/auth/login)
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Call service layer for login
        const data = await authService.login({ email, password });

        // Success response with token + user info
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};
