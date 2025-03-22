import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VetDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [vetProfile, setVetProfile] = useState(null);
  const [search, setSearch] = useState("");
  const vetId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (vetId) {
      fetchBookings();
      fetchProfile();
    } else {
      alert("Please log in to access the dashboard.");
      navigate("/");
    }
  }, [vetId, navigate]);

  // ✅ Fetch Vet Profile
  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/doctor/vet-profile/${vetId}`
      );
      setVetProfile(response.data);
    } catch (error) {
      console.error("Error fetching vet profile:", error);
    }
  };

  // ✅ Fetch Bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/doctor/vet-bookings/${vetId}`
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // ✅ Update Booking Status
  const updateStatus = async (bookingId, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/doctor/update-booking/${bookingId}`,
        { status }
      );
      fetchBookings();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    navigate("/");
  };

  // ✅ Filter out past accepted bookings and sort
  const currentTime = new Date();
  const filteredBookings = bookings
    .filter(
      (booking) =>
        !(
          booking.status === "Approved" &&
          new Date(booking.timeOfBooking) < currentTime
        )
    )
    .sort((a, b) => {
      // ✅ Sort by status: Pending & Rejected first, Accepted last
      if (a.status === "Approved" && b.status !== "Approved") return 1;
      if (a.status !== "Approved" && b.status === "Approved") return -1;
      return new Date(a.timeOfBooking) - new Date(b.timeOfBooking);
    })
    .filter((booking) =>
      booking.ownerName.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* ✅ Profile Section */}
        {vetProfile && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={`http://localhost:5000/${vetProfile.logo}`}
                alt="Profile"
                className="w-20 h-20 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {vetProfile.name}
                </h2>
                <p className="text-gray-600">
                  📧 {vetProfile.email} | 📍 {vetProfile.location}
                </p>
                <p className="text-gray-600">
                  🎓 {vetProfile.qualification} | 📞 {vetProfile.phoneNumber}
                </p>
              </div>
            </div>
            {/* ✅ Logout Button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}

        {/* ✅ Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Owner Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* ✅ Bookings Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-3 text-left">S. No</th>
                <th className="p-3 text-left">Pet Type</th>
                <th className="p-3 text-left">Owner</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Disease</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Vaccinated</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <tr key={booking._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{booking.petType}</td>
                  <td className="p-3">{booking.ownerName}</td>
                  <td className="p-3">{booking.phoneNumber}</td>
                  <td className="p-3">{booking.petDisease}</td>
                  <td className="p-3">
                    {new Date(booking.timeOfBooking).toLocaleString()}
                  </td>
                  {/* ✅ Vaccinated Column */}
                  <td className="p-3">
                    {booking.vaccinated ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md">
                        Vaccinated
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-md">
                        Not Vaccinated
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-md ${
                        booking.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status || "Pending"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    {/* ✅ Approve Button */}
                    {booking.status !== "Approved" && (
                      <button
                        onClick={() =>
                          updateStatus(booking._id, "Approved")
                        }
                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        Approve
                      </button>
                    )}
                    {/* ✅ Reject Button */}
                    {booking.status !== "Rejected" && (
                      <button
                        onClick={() =>
                          updateStatus(booking._id, "Rejected")
                        }
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredBookings.length === 0 && (
            <p className="text-center p-4 text-gray-500">
              No bookings available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VetDashboard;
