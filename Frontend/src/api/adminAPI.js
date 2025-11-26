// src/api/adminAPI.js
import api from "./api";

export const adminAPI = {
  getAllUsers: () => api.get("/users"),
  getAllServices: () => api.get("/services"),
  getAllBookings: () => api.get("/bookings"),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  updateService: (id, data) => api.put(`/services/${id}`, data),
  cancelBooking: (id) => api.delete(`/bookings/${id}`),
};
