import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const userId = sessionStorage.getItem("userId"); // ✅ Get userId from session storage

  useEffect(() => {
    if (userId) fetchBookings();
  }, [userId]);

  const fetchBookings = async () => {
    if (!userId) {
      console.error("User ID not found in session storage");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/services/bookings?userId=${userId}`
      );

      // ✅ Process and filter bookings
      const processedBookings = response.data
        .map((booking) => {
          const [date, time] = booking.timeSlot.split("T");
          const formattedTime = time.slice(0, 5); // Extract HH:MM
          return { ...booking, date, time: formattedTime };
        })
        .filter((booking) => new Date(booking.date) >= new Date()) // ✅ Show only future bookings
        .sort((a, b) => new Date(a.date + "T" + a.time) - new Date(b.date + "T" + b.time)); // ✅ Sort by date & time

      setBookings(processedBookings);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load bookings.",
      });
    }
  };

  // ✅ Accept Booking
  const handleAcceptBooking = async (bookingId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/services/bookings/${bookingId}/accept`
      );

      // ✅ Show success alert
      Swal.fire({
        icon: "success",
        title: "Booking Approved!",
        text: response.data.message,
      });

      // ✅ Refresh booking list
      fetchBookings();
    } catch (error) {
      console.error("Failed to accept booking:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow-md">

      <h2 className="text-2xl font-bold mb-6"> Bookings</h2>

      {bookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-blue-50 text-gray-700">
                <th className="border p-3">S. No</th>
                <th className="border p-3">Pet Type</th>
                <th className="border p-3">Owner Name</th>
                <th className="border p-3">Phone Number</th>
                <th className="border p-3">Location</th>
                <th className="border p-3">Mode Of Service</th>
                <th className="border p-3">Date</th>
                <th className="border p-3">Time</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id} className="text-center border-b hover:bg-gray-50 transition">

                  {/* ✅ S. No */}
                  <td className="p-3">{index + 1}</td>

                  {/* ✅ Pet Type */}
                  <td className="p-3">{booking.petType || "N/A"}</td>

                  {/* ✅ Owner Name */}
                  <td className="p-3">{booking.userId?.name || "N/A"}</td>

                  {/* ✅ Phone Number */}
                  <td className="p-3">{booking.userId?.phoneNumber || "N/A"}</td>

                  {/* ✅ Location */}
                  <td className="p-3">{booking.address || "N/A"}</td>

                  {/* ✅ Mode of Service */}
                  <td className="p-3">{booking.modeOfService || "N/A"}</td>

                  {/* ✅ Date */}
                  <td className="p-3">{booking.date || "N/A"}</td>

                  {/* ✅ Time */}
                  <td className="p-3">{booking.time || "N/A"}</td>

                  {/* ✅ Status */}
                  <td className="p-3">
                    {booking.status === "Approved" ? (
                      <span className="text-green-500 font-semibold">Approved</span>
                    ) : booking.status === "pending" ? (
                      <span className="text-yellow-500 font-semibold">Pending</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Rejected</span>
                    )}
                  </td>

                  {/* ✅ Actions */}
                  <td className="p-3">
                    {booking.status !== "Approved" && (
                      <button
                        onClick={() => handleAcceptBooking(booking._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                      >
                        Accept
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-10">No upcoming bookings found.</p>
      )}
    </div>
  );
};

export default ViewBookings;
