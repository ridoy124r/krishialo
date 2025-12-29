import React, { useEffect, useState } from "react";
import { adminAPI } from "../../api/adminAPI";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await adminAPI.getAllBookings();
        setBookings(response.data || []);
      } catch (err) {
        console.error("Failed to load bookings", err);
        setError(err.response?.data?.message || err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await adminAPI.cancelBooking(bookingId);
      setBookings(bookings.filter((b) => b.id !== bookingId));
      alert("Booking cancelled successfully");
    } catch (err) {
      console.error("Failed to cancel booking", err);
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Manage Bookings</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        {loading ? (
          <p className="text-gray-500">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="text-sm text-gray-600 border-b">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Start Time</th>
                  <th className="py-3 px-4">End Time</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{booking.user?.fullName || "—"}</td>
                    <td className="py-3 px-4">{booking.user?.email || "—"}</td>
                    <td className="py-3 px-4">{booking.service?.name || "—"}</td>
                    <td className="py-3 px-4 text-sm">{new Date(booking.startTime).toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm">{new Date(booking.endTime).toLocaleString()}</td>
                    <td className="py-3 px-4 font-semibold">৳{booking.totalCost || "0"}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === "CONFIRMED"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {booking.status || "—"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.paymentStatus === "PAID"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}>
                        {booking.paymentStatus || "—"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {booking.status !== "CANCELLED" && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
