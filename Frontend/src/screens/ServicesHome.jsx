import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FaBuilding, FaEnvelope, FaHandsHelping, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

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
    durationDays: 1,
  });
  const [serviceProvider, setServiceProvider] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      const userId = sessionStorage.getItem("userId");

      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}`
      );
      setBookingDetails(bookingDetails => ({
        ...bookingDetails,
        address: response.data.address
      }))
    }

    const fetchServiceProviderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/services/service-provider/${id}`
        );
        setServiceProvider(response.data);
        console.log(response.data);

      } catch (error) {
        console.error("Failed to fetch service provider details:", error);
      }
    };
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
    fetchUser();

    fetchServices();
    fetchServiceProviderDetails();

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
      durationDays: 1,

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
        durationDays: selectedService.serviceType === 'Boarding' ? bookingDetails.durationDays : undefined
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <Navbar />
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-3 mb-2">
          <FaHandsHelping className="text-4xl text-orange-500" />
          <h2 className="text-4xl font-extrabold text-gray-800">
            Service Provider
          </h2>
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mt-2 rounded-full" />
      </div>
      {/* Provider Info Card */}
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 border border-gray-200 w-full lg:w-1/2 mx-auto p-6 flex flex-col sm:flex-row gap-6 mb-8">

        {/* ✅ Provider Details */}
        <div className="flex-1 space-y-2">
          <h3 className="text-xl font-semibold truncate mb-2 text-gray-800">
            {serviceProvider?.orgName}
          </h3>

          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <FaMapMarkerAlt className="text-orange-400" />
            <span>{serviceProvider?.orgLocation}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <FaBuilding className="text-blue-500" />
            <span>{serviceProvider?.orgAddress || "Not Available"}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <FaEnvelope className="text-green-500" />
            <span>{serviceProvider?.email}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 mb-3">
            <FaPhone className="text-red-400" />
            <span>{serviceProvider?.phoneNumber}</span>
          </div>
        </div>

        {/* ✅ Logo Section */}
        <div className="flex-shrink-0">
          {serviceProvider?.logo ? (
            <img
              src={`http://localhost:5000/${serviceProvider.logo}`}
              alt={serviceProvider?.orgName}
              className="w-24 h-24 object-cover rounded-full border border-gray-300"
            />
          ) : (
            <span className="text-gray-400">No Logo Available</span>
          )}
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex justify-end gap-4 mb-6">
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
          placeholder="Filter by Animal, Service, etc"
          value={animalFilter}
          onChange={(e) => setAnimalFilter(e.target.value)}
          className="p-2 border rounded-md"
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service._id}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <img
              src={`http://localhost:5000/${service.image}`}
              alt="Service Logo"
              className="w-full h-40 object-cover mb-3"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <h3 className="text-lg font-semibold">{service.serviceName}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
            <p className="font-bold text-green-500">{service.serviceType}</p>
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
              min={new Date().toISOString().slice(0, 16)}
            />
            {selectedService.serviceType === "Boarding" &&

              <input
                type="number"
                name="durationDays"
                value={bookingDetails.durationDays}
                onChange={handleInputChange}
                placeholder="Duration in days"
                className="w-full p-2 border rounded-md mb-2"
                min={1}
                required
              />}

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
