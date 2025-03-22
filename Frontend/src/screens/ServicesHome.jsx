import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const ServicesPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const [services, setServices] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [serviceType, setServiceType] = useState("");
  const [animalFilter, setAnimalFilter] = useState("");

  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = sessionStorage.getItem("userId");

  const [bookingDetails, setBookingDetails] = useState({
    petType: "",
    modeOfService: "",
    address: "",
    timeSlot: "",
  });

  useEffect(() => {
    const fetchServices = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/services/view-services/${id}`
          );
          setServices(response.data);
        } catch (error) {
          console.error("Failed to fetch services:", error);
        }
      }
    };

    fetchServices();
  }, [id]);

  const filteredServices = services
  .filter((service) =>
    (!serviceType || service.type === serviceType) &&
    (!animalFilter || service.serviceName.toLowerCase().includes(animalFilter.toLowerCase()))
  )
  .sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    setBookingDetails({
      petType: "",
      modeOfService: "",
      address: "",
      timeSlot: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBooking = async () => {
    try {
      if (!userId) {
        alert("User is not logged in!");
        return;
      }

      const payload = {
        userId,
        serviceId: selectedService._id,
        petType: bookingDetails.petType,
        modeOfService: bookingDetails.modeOfService,
        address:
          bookingDetails.modeOfService === "In Home"
            ? bookingDetails.address
            : undefined,
        timeSlot: bookingDetails.timeSlot,
      };

      await axios.post(
        "http://localhost:5000/api/bookingsSP/book-service",
        payload
      );

      alert("Service booked successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to book service!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Navbar />

      {/* Filters Section */}
      <div className="flex gap-4 mb-6">
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
          className="p-2 border rounded-md"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        <input
          type="text"
          placeholder="Filter by Animal , Service , etc"
          value={animalFilter}
          onChange={(e) => setAnimalFilter(e.target.value)}
          className="p-2 border rounded-md"
        />
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredServices.map((service) => (
          <div key={service._id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={`http://localhost:5000/${service.image}`}
              alt="Service Logo"
              className="w-full h-40 object-cover mb-3"
              onError={(e) => (e.target.style.display = "none")}
            />
            <h3 className="text-lg font-semibold">{service.serviceName}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
            <p className="font-bold text-orange-500">₹{service.price}</p>
            <button
              className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
              onClick={() => handleOpenModal(service)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">
              Book {selectedService.serviceName}
            </h3>

            <input
              type="text"
              name="petType"
              value={bookingDetails.petType}
              onChange={handleInputChange}
              placeholder="Pet Type"
              className="w-full p-2 border rounded-md mb-2"
            />

            <select
              name="modeOfService"
              value={bookingDetails.modeOfService}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mb-2"
            >
              <option value="">Select Mode</option>
              <option value="In Home">In Home</option>
              <option value="In Pet Shop">In Pet Shop</option>
            </select>

            {bookingDetails.modeOfService === "In Home" && (
              <input
                type="text"
                name="address"
                value={bookingDetails.address}
                onChange={handleInputChange}
                placeholder="Enter Address"
                className="w-full p-2 border rounded-md mb-2"
              />
            )}

            <input
              type="datetime-local"
              name="timeSlot"
              value={bookingDetails.timeSlot}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mb-2"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
