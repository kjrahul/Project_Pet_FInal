import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("purchases");

  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      alert("Please log in to access profile");
      navigate("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/profile/${userId}`
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, navigate]);

  if (loading) return <div className="text-center mt-20">Loading profile...</div>;
  if (!profileData) return <div className="text-center mt-20">No profile data found.</div>;

  const { user, purchases, userServiceBookings, acceptedVetBookings, adoptionRequests } = profileData;

  // Function to sort pending statuses first
  const sortByPendingStatus = (list) => {
    return [...list].sort((a, b) => (a.status === "pending" ? -1 : 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <Navbar />

      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3 bg-white shadow-md rounded-lg p-4">
          <h3 className="font-bold text-xl mb-4">Dashboard</h3>
          <ul className="space-y-2">
            {[
              { key: "purchases", label: "Purchase History" },
              { key: "bookings", label: "Service Bookings" },
              { key: "vetAppointments", label: "Vet Appointments" },
              { key: "adoption", label: "Adoption Requests" },
            ].map((tab) => (
              <li
                key={tab.key}
                className={`cursor-pointer p-2 rounded-md text-lg font-medium ${
                  selectedTab === tab.key
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedTab(tab.key)}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold">{user?.name || "User"}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-600">Phone: {user?.phoneNumber || "N/A"}</p>
          </div>

          <div className="mt-6 bg-white shadow-md rounded-lg p-6">
            {selectedTab === "purchases" && (
              <>
                <h3 className="font-bold text-xl mb-4">Purchase History</h3>
                {purchases.length > 0 ? (
                  purchases.slice(0, 5).map((purchase) => (
                    <div key={purchase._id} className="border-b py-2">
                      <p className="font-semibold">
                        {purchase.products[0]?.productName} (x{purchase.products[0]?.quantity})
                      </p>
                      <p className="text-gray-500">
                        {new Date(purchase.dateOfPurchase).toLocaleDateString()}
                      </p>
                      <p className="font-bold">₹{purchase.totalPrice}</p>
                    </div>
                  ))
                ) : (
                  <p>No purchase history found.</p>
                )}
              </>
            )}

            {selectedTab === "bookings" && (
              <>
                <h3 className="font-bold text-xl mb-4">My Service Bookings</h3>
                {userServiceBookings.length > 0 ? (
                  sortByPendingStatus(userServiceBookings).map((booking) => (
                    <div key={booking._id} className="border p-4 mb-2 rounded-lg shadow-md">
                      <p><strong>Service:</strong> {booking?.serviceId?.serviceName}</p>
                      <p><strong>Provider:</strong> {booking?.serviceId?.serviceProvider?.orgName || "N/A"}</p>
                      <p><strong>Location:</strong> {booking?.serviceId?.serviceProvider?.orgLocation || "N/A"}</p>
                      <p><strong>Mode:</strong> {booking.modeOfService}</p>
                      <p><strong>Status:</strong> 
                        <span className={booking.status === "Approved" ? "text-green-500" : "text-yellow-500"}>
                          {booking.status}
                        </span>
                      </p>
                      <p><strong>Date:</strong> {new Date(booking.timeSlot).toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <p>No service bookings found.</p>
                )}
              </>
            )}

            {selectedTab === "vetAppointments" && (
              <>
                <h3 className="font-bold text-xl mb-4">Vet Appointments</h3>
                {acceptedVetBookings.length > 0 ? (
                  sortByPendingStatus(acceptedVetBookings).map((booking) => (
                    <div key={booking._id} className="border p-4 mb-2 rounded-lg shadow-md">
                      <p><strong>Vet:</strong> {booking.vetId.name} ({booking.vetId.qualification})</p>
                      <p><strong>Pet Type:</strong> {booking.petType}</p>
                      <p><strong>Pet Disease:</strong> {booking.petDisease}</p>
                      <p><strong>Date:</strong> {new Date(booking.timeOfBooking).toLocaleString()}</p>
                      <p><strong>Status:</strong> 
                        <span className={booking.status === "Approved" ? "text-green-500" : "text-yellow-500"}>
                          {booking.status}
                        </span>
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No vet appointments found.</p>
                )}
              </>
            )}

            {selectedTab === "adoption" && (
              <>
                <h3 className="font-bold text-xl mb-4">Adoption Requests</h3>
                {adoptionRequests.length > 0 ? (
                  sortByPendingStatus(adoptionRequests).map((adoption) => (
                    <div key={adoption._id} className="border p-4 mb-2 rounded-lg shadow-md">
                      <img
                        src={`http://localhost:5000/${adoption.adoptionPostId?.image.replace(/\\/g, "/")}`}
                        alt="Pet"
                        className="w-24 h-24 object-cover rounded-md mb-2"
                      />
                      <p><strong>Pet Type:</strong> {adoption.adoptionPostId?.petType}</p>
                      <p><strong>Age:</strong> {adoption.adoptionPostId?.petAge} years</p>
                      <p><strong>Status:</strong> 
                        <span className={
                          adoption.status === "accepted" ? "text-green-500" :
                          adoption.status === "pending" ? "text-yellow-500" :
                          "text-red-500"
                        }>
                          {adoption.status}
                        </span>
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No adoption requests found.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
