import express from 'express';

import { registerUser, loginUser } from '../controllers/authController.js';
import { validateBody } from '../middleware/validateMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Use multer to parse multipart/form-data (profileImage + fields)
router.post('/register', upload.single('profileImage'), validateBody(['fullName','email','password']), registerUser);
router.post('/login', validateBody(['email','password']), loginUser);

export default router;