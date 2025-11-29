// src/pages/admin/AdminLayout.jsx
import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, Users, Settings, ClipboardList, CreditCard } from "lucide-react";


import { AuthContext } from "../../context/AuthContext";


import apiServices from "../../api/apiServices";
const { authAPI } = apiServices;

const AdminLayout = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext); 

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <Home className="w-5 h-5" /> },
    { name: "Users", path: "/admin/users", icon: <Users className="w-5 h-5" /> },
    { name: "Services", path: "/admin/services", icon: <ClipboardList className="w-5 h-5" /> },
    { name: "Bookings", path: "/admin/bookings", icon: <CreditCard className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 mt-25 bg-white shadow-md flex flex-col">
        <div className="h-20 flex items-center justify-center font-bold text-xl border-b">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-green-100 ${
                location.pathname === item.path ? "bg-green-200 font-semibold" : ""
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

     
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
