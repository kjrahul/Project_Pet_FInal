import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { IoSchoolSharp } from "react-icons/io5";
import { GiMedal } from "react-icons/gi";
import Navbar from "../components/Navbar";

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
  const [vet, setVet] = useState(null);
  const [user, setUser] = useState(null);

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
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}`
      );
      setFormData(formData => ({
        ...formData,
        ownerName: response.data.name,
        phoneNumber: response.data.phoneNumber,
        location: response.data.location
      }))
    }
    const fetchVetDoctor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/doctor/vet-profile/${vetId}`
        );
        setVet(response.data);

        // ✅ Assign Random Ratings (1 to 5) to Each Vet
        const generatedRatings = {};
        response.data.forEach((vet) => {
          generatedRatings[vet?._id] = (Math.random() * 4 + 1).toFixed(1); // 1 to 5 range
        });
      } catch (error) {
        console.error("Error fetching vet doctors:", error.message);
      }
    };

    fetchVetDoctor();
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-4">
      <Navbar />
      <div className="flex flex-col lg:flex-row items-start justify-center gap-6 w-full max-w-6xl mx-auto mt-6">
        {/* Vet Card - Left */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 border border-gray-200 w-full lg:w-1/2">
          <div className="flex items-center p-6 gap-4">
            {/* Left: Content */}
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold text-gray-800 truncate">{vet?.name}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MdEmail className="text-orange-500" />
                {vet?.email}
              </p>
              <p className="text-sm text-gray-700 flex items-center gap-1">
                <IoSchoolSharp className="text-blue-500" />
                <span className="font-medium">Qual:</span> {vet?.qualification}
              </p>
              <p className="text-sm text-gray-700 flex items-center gap-1">
                <GiMedal className="text-green-500" />
                <span className="font-medium">Exp:</span> {vet?.experience} yrs
              </p>
              <p className="text-sm text-gray-700 flex items-center gap-1">
                <MdLocationOn className="text-red-500" />
                {vet?.location}
              </p>
              <p className="text-sm text-gray-700 flex items-center gap-1">
                <MdPhone className="text-orange-500" />
                {vet?.phoneNumber}
              </p>
            </div>

            {/* Right: Image */}
            <div className="flex-shrink-0">
              <img
                src={`http://localhost:5000/${vet?.logo}`}
                alt={vet?.name}
                className="w-24 h-24 object-cover rounded-full border border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Booking Form - Right */}
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full lg:w-1/2">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Book a Veterinary Appointment
          </h2>

          {message && (
            <p
              className={`mb-4 text-center text-sm font-medium ${message.includes("successfully") ? "text-green-500" : "text-red-500"
                }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Pet Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Pet Type</label>
              <input
                type="text"
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Owner Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Owner Name</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Pet Disease */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Pet Disease</label>
              <input
                type="text"
                name="petDisease"
                value={formData.petDisease}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Vaccinated */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="vaccinated"
                checked={formData.vaccinated}
                onChange={handleChange}
                className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400"
              />
              <label htmlFor="vaccinated" className="text-sm text-gray-700">
                Vaccinated
              </label>
            </div>

            {/* Time of Booking */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Time of Booking</label>
              <input
                type="datetime-local"
                name="timeOfBooking"
                value={formData.timeOfBooking}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-orange-600 transition"
              >
                {loading ? "Booking..." : "Book Appointment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>


  );
};

export default BookingPage;
