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
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">S. No</th>
              
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone Number</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="text-center">
                {/* ✅ Serial Number */}
                <td className="border p-2">{index + 1}</td>

                {/* ✅ Profile Picture */}
                

                {/* ✅ User Info */}
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.phoneNumber}</td>
                <td className="border p-2">{user.location || "N/A"}</td>
                <td className="border p-2">{user.role || "User"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersList;
