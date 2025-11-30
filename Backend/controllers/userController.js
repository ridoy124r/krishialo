import * as userService from '../services/userService.js';

export const createAdmin = async (req, res, next) => {
  try {
    const admin = await userService.createAdmin(req.body);
    res.status(201).json({ message: 'Admin created', admin: { id: admin.id, email: admin.email } });
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res, next) => {
  try {
    // Fetch fresh user from DB including bookings and related service info
    const user = await userService.getUserWithBookings(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Return commonly used fields plus bookings
    res.json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone || null,
      location: user.location || null,
      profileImage: user.profileImage || null,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      bookings: user.bookings || []
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Debug: log incoming body and file info to help diagnose 500 errors
    console.log('updateProfile called for user:', req.user?.id);
    console.log('Request body keys:', Object.keys(req.body || {}));
    // don't log full body values (privacy), but show a preview
    console.log('Request body preview:', {
      fullName: req.body?.fullName,
      email: req.body?.email && req.body.email.slice ? req.body.email.slice(0,100) : req.body?.email,
    });
    if (req.file) console.log('Uploaded file:', { fieldname: req.file.fieldname, originalname: req.file.originalname, size: req.file.size });

    const { fullName, email, phone, location } = req.body;

    // If a file was uploaded, set profileImage path
    let profileImage = undefined;
    if (req.file) {
      profileImage = `/uploads/${req.file.filename}`;
    }

    const updated = await userService.updateProfile(userId, {
      fullName,
      email,
      phone,
      location,
      profileImage,
    });

    // Return updated user (same shape as /me)
    const fresh = await userService.getUserWithBookings(updated.id);
    res.json({
      id: fresh.id,
      fullName: fresh.fullName,
      email: fresh.email,
      phone: fresh.phone || null,
      location: fresh.location || null,
      profileImage: fresh.profileImage || null,
      isAdmin: fresh.isAdmin,
      createdAt: fresh.createdAt,
      bookings: fresh.bookings || []
    });
  } catch (err) {
    next(err);
  }
};

export const listUsers = async (req, res, next) => {
  try {
    const users = await userService.listAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};
