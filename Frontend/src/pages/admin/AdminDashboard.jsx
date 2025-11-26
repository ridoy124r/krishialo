import React from "react";
import { Users, ClipboardList, CreditCard, Home } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { title: "Users", value: 120, icon: <Users className="w-6 h-6 text-white" /> },
    { title: "Services", value: 45, icon: <ClipboardList className="w-6 h-6 text-white" /> },
    { title: "Bookings", value: 87, icon: <CreditCard className="w-6 h-6 text-white" /> },
    { title: "Revenue", value: "$12,450", icon: <Home className="w-6 h-6 text-white" /> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
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

      {/* Optional section for charts or tables */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        <p className="text-gray-500">You can add a table here showing latest bookings.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
