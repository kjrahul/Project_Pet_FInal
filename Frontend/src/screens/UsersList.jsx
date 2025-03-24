import { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  // ✅ Fetch All Users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/all-users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      alert("Failed to load users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-5 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Users</h2>

      {users.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No users found.</p>
      ) : (
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-blue-50 text-gray-700">
              <th className="border p-3">S. No</th>
              
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Phone Number</th>
              <th className="border p-3">Location</th>
              <th className="border p-3">Address</th>
              <th className="border p-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="text-center">
                {/* ✅ Serial Number */}
                <td className="border p-3">{index + 1}</td>

                {/* ✅ Profile Picture */}
                

                {/* ✅ User Info */}
                <td className="border p-3">{user.name}</td>
                <td className="border p-3">{user.email}</td>
                <td className="border p-3">{user.phoneNumber}</td>
                <td className="border p-3">{user.location || "N/A"}</td>
                <td className="border p-3">{user.address || "N/A"}</td>
                <td className="border p-3">{user.role || "User"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersList;
