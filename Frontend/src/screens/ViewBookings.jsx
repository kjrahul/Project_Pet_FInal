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
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {bookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="border border-gray-300 px-4 py-2">S. No</th>
                <th className="border border-gray-300 px-4 py-2">Pet Type</th>
                <th className="border border-gray-300 px-4 py-2">Owner Name</th>
                <th className="border border-gray-300 px-4 py-2">Phone Number</th>
                <th className="border border-gray-300 px-4 py-2">Location</th>
                <th className="border border-gray-300 px-4 py-2">Mode Of Service</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id} className="hover:bg-gray-50 text-center">
                  {/* ✅ S. No */}
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>

                  {/* ✅ Pet Type */}
                  <td className="border border-gray-300 px-4 py-2">{booking.petType || "N/A"}</td>

                  {/* ✅ Owner Name */}
                  <td className="border border-gray-300 px-4 py-2">{booking.userId?.name || "N/A"}</td>

                  {/* ✅ Phone Number */}
                  <td className="border border-gray-300 px-4 py-2">{booking.userId?.phoneNumber || "N/A"}</td>

                  {/* ✅ Location */}
                  <td className="border border-gray-300 px-4 py-2">{booking.address || "N/A"}</td>

                  {/* ✅ Mode of Service */}
                  <td className="border border-gray-300 px-4 py-2">{booking.modeOfService || "N/A"}</td>

                  {/* ✅ Date */}
                  <td className="border border-gray-300 px-4 py-2">{booking.date || "N/A"}</td>

                  {/* ✅ Time */}
                  <td className="border border-gray-300 px-4 py-2">{booking.time || "N/A"}</td>

                  {/* ✅ Status */}
                  <td className="border border-gray-300 px-4 py-2">
                    {booking.status === "Approved" ? (
                      <span className="text-green-500 font-semibold">Approved</span>
                    ) : booking.status === "Pending" ? (
                      <span className="text-yellow-500 font-semibold">Pending</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Rejected</span>
                    )}
                  </td>

                  {/* ✅ Actions */}
                  <td className="border border-gray-300 px-4 py-2">
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
        <p className="text-gray-500">No upcoming bookings found.</p>
      )}
    </div>
  );
};

export default ViewBookings;
