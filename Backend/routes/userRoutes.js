import express from 'express';
import { createAdmin, me, listUsers } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { validateBody } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.get('/me', protect, me);
router.get('/', protect, admin, listUsers);
router.post('/create-admin', protect, admin, validateBody(['fullName','email','password']), createAdmin);

export default router;
