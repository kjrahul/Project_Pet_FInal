import { useEffect, useState } from "react";
import axios from "axios";

const AdminStats = () => {
  const [stats, setStats] = useState({});

  // ✅ Fetch Admin Stats
  const fetchStats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Failed to fetch admin stats:", error);
      alert("Failed to load stats.");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-5 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ✅ Total Users */}
        <div className="bg-blue-100 p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">{stats.totalUsers || 0}</p>
        </div>

        {/* ✅ Total Adoptions */}
        <div className="bg-green-100 p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Adoptions</h3>
          <p className="text-2xl font-bold">{stats.totalAdoptions || 0}</p>
        </div>

        {/* ✅ Completed Adoptions */}
        <div className="bg-orange-100 p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Completed Adoptions</h3>
          <p className="text-2xl font-bold">{stats.completedAdoptions || 0}</p>
        </div>

        {/* ✅ Pending Adoptions */}
        <div className="bg-yellow-100 p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Pending Adoptions</h3>
          <p className="text-2xl font-bold">{stats.pendingAdoptions || 0}</p>
        </div>

        {/* ✅ Total Service Providers */}
        <div className="bg-purple-100 p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Service Providers</h3>
          <p className="text-2xl font-bold">{stats.totalServiceProviders || 0}</p>
        </div>

        {/* ✅ Approved Service Providers */}
        <div className="bg-teal-100 p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Approved Service Providers</h3>
          <p className="text-2xl font-bold">{stats.approvedServiceProviders || 0}</p>
        </div>

        {/* ✅ Total Vets */}
        <div className="bg-pink-100 p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Vets</h3>
          <p className="text-2xl font-bold">{stats.totalVets || 0}</p>
        </div>

        {/* ✅ Approved Vets */}
        <div className="bg-indigo-100 p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Approved Vets</h3>
          <p className="text-2xl font-bold">{stats.approvedVets || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
