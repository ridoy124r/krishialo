// src/api/apiServices.js
import api from './api';

// ============= AUTH APIs =============
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
};

// ============= USER APIs =============
export const userAPI = {
  getUsers: () => api.get('/users'),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

// ============= SERVICE APIs =============
export const serviceAPI = {
  getServices: (params) => api.get('/services', { params }),
  getService: (id) => api.get(`/services/${id}`),
  createService: (formData) => api.post('/services', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateService: (id, formData) => api.put(`/services/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteService: (id) => api.delete(`/services/${id}`),
};

// ============= BOOKING APIs =============
export const bookingAPI = {
  getBookings: (params) => api.get('/bookings', { params }),
  getBooking: (id) => api.get(`/bookings/${id}`),
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  updateBooking: (id, data) => api.put(`/bookings/${id}`, data),
  cancelBooking: (id) => api.delete(`/bookings/${id}`),
  getUserBookings: () => api.get('/bookings/my-bookings'),
};

// ============= PAYMENT APIs =============
export const paymentAPI = {
  initiatePayment: (bookingId, paymentData) => 
    api.post(`/payments/initiate/${bookingId}`, paymentData),
  verifyPayment: (paymentId) => api.get(`/payments/verify/${paymentId}`),
  getPaymentHistory: () => api.get('/payments/history'),
};

// Export all
export default {
  auth: authAPI,
  user: userAPI,
  service: serviceAPI,
  booking: bookingAPI,
  payment: paymentAPI,
};