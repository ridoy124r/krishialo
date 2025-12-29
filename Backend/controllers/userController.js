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
    const u = req.user;
    res.json({ id: u.id, fullName: u.fullName, email: u.email, isAdmin: u.isAdmin, phone: u.phone, location: u.location, createdAt: u.createdAt });
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

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { fullName, email, phone, location } = req.body;
    
    // Validate required fields
    if (!fullName || !email || !phone || !location) {
      const err = new Error('fullName, email, phone, and location are required');
      err.status = 400;
      throw err;
    }

    const updatedUser = await userService.updateUserProfile(userId, {
      fullName,
      email,
      phone,
      location
    });

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        location: updatedUser.location,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt
      }
    });
  } catch (err) {
    next(err);
  }
};
