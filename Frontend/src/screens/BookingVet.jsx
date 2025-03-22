import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const vetId = searchParams.get("id"); // Extract vetId from query parameter
  const userId = sessionStorage.getItem("userId"); // ✅ Get userId from session storage

  const [formData, setFormData] = useState({
    vetId: vetId || "",
    userId: userId || "", // ✅ Include userId from session storage
    petType: "",
    ownerName: "",
    phoneNumber: "",
    location: "",
    petDisease: "",
    vaccinated: false,
    timeOfBooking: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    try {
      const response = await axios.post(
        `http://localhost:5000/api/bookings/book-vet`, // ✅ No need to pass it in the URL
        formData
      );
  
      setMessage(response.data.message);
      setFormData({
        vetId: vetId || "",
        userId: userId || "",
        petType: "",
        ownerName: "",
        phoneNumber: "",
        location: "",
        petDisease: "",
        vaccinated: false,
        timeOfBooking: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Book a Veterinary Appointment
        </h2>

        {/* ✅ Success or Error Message */}
        {message && (
          <p
            className={`mb-4 text-center ${
              message.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ✅ Pet Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pet Type
            </label>
            <input
              type="text"
              name="petType"
              value={formData.petType}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-orange-400"
            />
          </div>

          {/* ✅ Owner Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Owner Name
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-orange-400"
            />
          </div>

          {/* ✅ Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-orange-400"
            />
          </div>

          {/* ✅ Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-orange-400"
            />
          </div>

          {/* ✅ Pet Disease */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pet Disease
            </label>
            <input
              type="text"
              name="petDisease"
              value={formData.petDisease}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-orange-400"
            />
          </div>

          {/* ✅ Vaccinated Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="vaccinated"
              checked={formData.vaccinated}
              onChange={handleChange}
              className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400"
            />
            <label
              htmlFor="vaccinated"
              className="ml-2 block text-sm text-gray-700"
            >
              Vaccinated
            </label>
          </div>

          {/* ✅ Time of Booking */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time of Booking
            </label>
            <input
              type="datetime-local"
              name="timeOfBooking"
              value={formData.timeOfBooking}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-orange-400"
            />
          </div>

          {/* ✅ Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
              disabled={loading}
            >
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
