import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { IoSchoolSharp } from "react-icons/io5";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 text-gray-800 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ✅ Vet Profile Card */}
        {vetProfile && (
          <div className="bg-white shadow-lg rounded-2xl p-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src={`http://localhost:5000/${vetProfile.logo}`}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-orange-500"
              />
              <div className="text-gray-700 space-y-1">
                <h2 className="text-2xl font-semibold text-gray-900">{vetProfile.name}</h2>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MdEmail className="text-orange-500" />
                  <span>{vetProfile.email}</span>
                  <span className="mx-2">|</span>
                  <MdLocationOn className="text-red-500" />
                  <span>{vetProfile.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <IoSchoolSharp className="text-blue-500" />
                  <span>{vetProfile.qualification}</span>
                  <span className="mx-2">|</span>
                  <MdPhone className="text-orange-500" />
                  <span>{vetProfile.phoneNumber}</span>
                </div>
              </div>

            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow"
            >
              Logout
            </button>
          </div>
        )}

        {/* ✅ Search Input */}
        <div>
          <input
            type="text"
            placeholder=" Search by Owner Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>

        {/* ✅ Bookings Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-orange-500 text-white text-sm">
              <tr>
                <th className="p-3 text-left">S. No</th>
                <th className="p-3 text-left">Pet Type</th>
                <th className="p-3 text-left">Owner</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Disease</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Vaccinated</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {filteredBookings.map((booking, index) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{booking.petType}</td>
                  <td className="p-3">{booking.ownerName}</td>
                  <td className="p-3">{booking.phoneNumber}</td>
                  <td className="p-3">{booking.address}</td>
                  <td className="p-3">{booking.location}</td>
                  <td className="p-3">{booking.petDisease}</td>
                  <td className="p-3">
                    {new Date(booking.timeOfBooking).toLocaleString()}
                  </td>

                  {/* Vaccinated Badge */}
                  <td className="p-3">
                    {booking.vaccinated ? (
                      <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        Vaccinated
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                        Not Vaccinated
                      </span>
                    )}
                  </td>

                  {/* Status Badge */}
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${booking.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {booking.status || "Pending"}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="p-3 space-x-2">
                    {booking.status !== "Approved" && (
                      <button
                        onClick={() => updateStatus(booking._id, "Approved")}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                      >
                        Approve
                      </button>
                    )}
                    {booking.status !== "Rejected" && (
                      <button
                        onClick={() => updateStatus(booking._id, "Rejected")}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* No Bookings Message */}
          {filteredBookings.length === 0 && (
            <div className="p-4 text-center text-gray-500">No bookings available.</div>
          )}
        </div>
      </div>
    </div>

  );
};

export default VetDashboard;
