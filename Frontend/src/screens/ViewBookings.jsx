import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filter, setFilter] = useState("upcoming");
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (userId) fetchBookings();
  }, [userId]);

  useEffect(() => {
    applyFilter();
  }, [filter, bookings]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/services/bookings?userId=${userId}`
      );

      const processedBookings = response.data
        .map((booking) => {
          const [date, time] = booking.timeSlot.split("T");
          const formattedTime = time.slice(0, 5);
          return { ...booking, date, time: formattedTime };
        })
        .sort(
          (a, b) =>
            new Date(a.date + "T" + a.time) - new Date(b.date + "T" + b.time)
        );

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

  const applyFilter = () => {
    const now = new Date();
    const filtered = bookings.filter((booking) => {
      const bookingDateTime = new Date(`${booking.date}T${booking.time}`);
      if (filter === "upcoming") return bookingDateTime >= now;
      if (filter === "completed") return bookingDateTime < now || booking.status === "Approved";
      return true; // for "all"
    });
    setFilteredBookings(filtered);
  };

  const handleAcceptBooking = async (bookingId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/services/bookings/${bookingId}/accept`
      );

      Swal.fire({
        icon: "success",
        title: "Booking Approved!",
        text: response.data.message,
      });

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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Bookings</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="all">All</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {filteredBookings.length > 0 ? (
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
              {filteredBookings.map((booking, index) => (
                <tr key={booking._id} className="text-center border-b hover:bg-gray-50 transition">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{booking.petType || "N/A"}</td>
                  <td className="p-3">{booking.userId?.name || "N/A"}</td>
                  <td className="p-3">{booking.userId?.phoneNumber || "N/A"}</td>
                  <td className="p-3">{booking.address || "N/A"}</td>
                  <td className="p-3">{booking.modeOfService || "N/A"}</td>
                  <td className="p-3">{booking.date || "N/A"}</td>
                  <td className="p-3">{booking.time || "N/A"}</td>
                  <td className="p-3">
                    {booking.status === "Approved" ? (
                      <span className="text-green-500 font-semibold">Approved</span>
                    ) : booking.status === "pending" ? (
                      <span className="text-yellow-500 font-semibold">Pending</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Rejected</span>
                    )}
                  </td>
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
        <p className="text-gray-500 text-center py-10">No bookings found for selected filter.</p>
      )}
    </div>
  );
};

export default ViewBookings;
