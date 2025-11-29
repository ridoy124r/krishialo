

import * as authService from '../services/authService.js';


export const registerUser = async (req, res, next) => {
    try {
       
        console.log('--- RegisterUser incoming request ---');
        console.log('Content-Type:', req.headers['content-type']);
        console.log('Parsed body keys:', Object.keys(req.body));
        console.log('Parsed body preview:', {
            fullName: req.body.fullName,
            email: req.body.email && req.body.email.slice ? req.body.email.slice(0,100) : req.body.email,
        });
        if (req.file) console.log('Uploaded file:', { fieldname: req.file.fieldname, originalname: req.file.originalname, size: req.file.size });

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
        console.error('RegisterUser error:', error.message);
       
        if (error.stack) console.error(error.stack);
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
