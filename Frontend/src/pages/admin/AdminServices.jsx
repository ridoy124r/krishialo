import React, { useEffect, useState } from "react";
import { adminAPI } from "../../api/adminAPI";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await adminAPI.getAllServices();
        setServices(response.data || []);
      } catch (err) {
        console.error("Failed to load services", err);
        setError(err.response?.data?.message || err.message || "Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Services Management</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        {loading ? (
          <p className="text-gray-500">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-gray-500">No services found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="text-sm text-gray-600 border-b">
                  <th className="py-3 px-4">Service Name</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Duration (min)</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Created</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{service.name || "—"}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{service.description ? service.description.substring(0, 50) + "..." : "—"}</td>
                    <td className="py-3 px-4 font-semibold">৳{service.price || "0"}</td>
                    <td className="py-3 px-4">{service.duration || "—"}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {service.category?.name || "—"}
                      </span>
                    </td>
                    <td className="py-3 px-4">{service.type || "—"}</td>
                    <td className="py-3 px-4">{new Date(service.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
