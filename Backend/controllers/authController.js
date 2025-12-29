

import * as authService from '../services/authService.js';


export const registerUser = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        const user = await authService.register({ fullName, email, password });

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

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const data = await authService.login({ email, password });
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};
