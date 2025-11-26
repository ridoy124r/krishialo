import express from 'express';
import * as svcCtrl from '../controllers/serviceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes (Read)
router.get('/', svcCtrl.listServices);
router.get('/:id', svcCtrl.getService);

// Admin CRUD routes (Write)
router.post('/', protect, admin, upload.single('image'), svcCtrl.createService);
router.put('/:id', protect, admin, upload.single('image'), svcCtrl.updateService);
router.delete('/:id', protect, admin, svcCtrl.deleteService);

export default router;