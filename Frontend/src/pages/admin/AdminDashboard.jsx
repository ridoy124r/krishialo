import React, { useEffect, useState } from "react";
import { Users, ClipboardList, CreditCard, Home } from "lucide-react";
import { adminAPI } from "../../api/adminAPI";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [uRes, bRes] = await Promise.all([
          adminAPI.getAllUsers(),
          adminAPI.getAllBookings(),
        ]);

        setUsers(uRes.data || []);
        setBookings(bRes.data || []);
      } catch (err) {
        console.error("Failed to load admin data", err);
        setError(err.response?.data?.message || err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const totalRevenue = bookings.reduce((s, b) => s + (b.totalCost || 0), 0);

  const stats = [
    { title: "Users", value: users.length, icon: <Users className="w-6 h-6 text-white" /> },
    { title: "Services", value: new Set(bookings.map(b => b.service?.id)).size || 0, icon: <ClipboardList className="w-6 h-6 text-white" /> },
    { title: "Bookings", value: bookings.length, icon: <CreditCard className="w-6 h-6 text-white" /> },
    { title: "Revenue", value: `৳${totalRevenue.toLocaleString()}`, icon: <Home className="w-6 h-6 text-white" /> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-green-500 p-4 rounded-lg shadow-md flex items-center gap-4">
            <div className="bg-green-700 p-3 rounded-full">{stat.icon}</div>
            <div>
              <p className="text-white text-lg font-semibold">{stat.value}</p>
              <p className="text-green-100">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>

        {loading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="text-sm text-gray-600">
                  <th className="py-2 px-3">User</th>
                  <th className="py-2 px-3">Email</th>
                  <th className="py-2 px-3">Service</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Booked At</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-t">
                    <td className="py-2 px-3">{b.user?.fullName || '—'}</td>
                    <td className="py-2 px-3">{b.user?.email || '—'}</td>
                    <td className="py-2 px-3">{b.service?.name || '—'}</td>
                    <td className="py-2 px-3">{b.totalCost ? `৳${b.totalCost}` : '৳0'}</td>
                    <td className="py-2 px-3">{b.status || '—'}</td>
                    <td className="py-2 px-3">{new Date(b.createdAt).toLocaleString()}</td>
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

export default AdminDashboard;
