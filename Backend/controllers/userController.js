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
    res.json({ id: u.id, fullName: u.fullName, email: u.email, isAdmin: u.isAdmin });
  } catch (err) {
    next(err);
  }
};
