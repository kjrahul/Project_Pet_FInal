import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterServiceProvider = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    orgName: "",
    orgLocation: "",
    orgAddress: "",
    orgRegId: "",
    email: "",
    phoneNumber: "",
    password: "",
    logo: null, 
    license: null, // ✅ Added license state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0], // Assigning file to respective state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("orgName", formData.orgName);
      formDataToSend.append("orgLocation", formData.orgLocation);
      formDataToSend.append("orgAddress", formData.orgAddress);
      formDataToSend.append("orgRegId", formData.orgRegId);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("password", formData.password);
      if (formData.logo) {
        formDataToSend.append("logo", formData.logo);
      }
      if (formData.license) {
        formDataToSend.append("license", formData.license); // ✅ Added license to form data
      }

      const response = await axios.post(
        "http://localhost:5000/api/users/register-sp",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        html: `<p>Your Service Provider username is: <strong>${response.data.username}</strong></p>
               <p>Please save it for future login.</p>`,
        confirmButtonText: "OK",
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <img
          src="/Logo.jpg"
          alt="Pet Logo"
          className="w-24 h-24 mx-auto mb-4"
        />

        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Register as Service Provider
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="orgName"
            placeholder="Organization Name"
            value={formData.orgName}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            name="orgLocation"
            placeholder="Location"
            value={formData.orgLocation}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            name="orgAddress"
            placeholder="Address"
            value={formData.orgAddress}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            name="orgRegId"
            placeholder="Registration ID"
            value={formData.orgRegId}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* ✅ Logo Upload Field */}
          <div>
            <label className="text-gray-600 font-semibold">Upload Logo</label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* ✅ License Upload Field */}
          <div>
            <label className="text-gray-600 font-semibold">Upload License</label>
            <input
              type="file"
              name="license"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-700 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-gray-500 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-orange-500 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterServiceProvider;
