import express from 'express';
import { createAdmin, me, listUsers, updateProfile } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { validateBody } from '../middleware/validateMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/me', protect, me);
router.get('/', protect, admin, listUsers);
router.post('/create-admin', protect, admin, validateBody(['fullName','email','password']), createAdmin);

// Update profile (multipart/form-data with optional 'profileImage')
router.put('/profile', protect, upload.single('profileImage'), updateProfile);

export default router;
