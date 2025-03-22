import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FaPaw } from "react-icons/fa";

const AdoptionRequestPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Extract petId from query params
  const params = new URLSearchParams(location.search);
  const petId = params.get("petId");

  const [formData, setFormData] = useState({
    userName: "",
    userAge: "",
    phoneNumber: "",
    hasOtherPets: false,
    adoptionReason: "",
    idProof: null,
  });

  useEffect(() => {
    if (!petId) {
      alert("Invalid request!");
      navigate("/adoption");
    }
  }, [petId, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to continue.");
      navigate("/");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("adoptionPostId", petId);
    formDataToSend.append("userId", userId);
    formDataToSend.append("userName", formData.userName);
    formDataToSend.append("userAge", formData.userAge);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("hasOtherPets", formData.hasOtherPets);
    formDataToSend.append("adoptionReason", formData.adoptionReason);
    if (formData.idProof) {
      formDataToSend.append("idProof", formData.idProof);
    }

    try {
      const res = await axios.post("http://localhost:5000/api/adoptions/adoption-requests", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        alert("Adoption request submitted successfully!");
        navigate("/adoptionhome");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert(`Failed to submit request: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6 flex justify-center items-center">
      <Navbar />
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-3 mb-2">
            <FaPaw className="text-4xl text-orange-500" />
            <h2 className="text-2xl font-bold text-center mb-4">
              Adoption Request
            </h2>
          </div>
          {/* <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mt-2 rounded-full" /> */}
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            type="number"
            name="userAge"
            value={formData.userAge}
            onChange={handleChange}
            placeholder="Your Age"
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full p-2 border rounded-md"
          />
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Upload ID Proof
            </label>
            <input
              type="file"
              name="idProof"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="hasOtherPets"
              checked={formData.hasOtherPets}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-sm">Do you have other pets?</label>
          </div>
          <textarea
            name="adoptionReason"
            value={formData.adoptionReason}
            onChange={handleChange}
            placeholder="Reason for Adoption"
            required
            className="w-full p-2 border rounded-md"
          />
          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-md">
              Submit
            </button>
            <button type="button" onClick={() => navigate("/adoption")} className="bg-gray-400 text-white px-4 py-2 rounded-md">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptionRequestPage;
