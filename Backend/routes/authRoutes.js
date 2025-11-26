import express from 'express';

import { registerUser, loginUser } from '../controllers/authController.js';
import { validateBody } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.post('/register', validateBody(['fullName','email','password']), registerUser);
router.post('/login', validateBody(['email','password']), loginUser);

export default router;