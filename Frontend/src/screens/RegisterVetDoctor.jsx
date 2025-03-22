import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterVetDoctor = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address:"",
    phoneNumber: "",
    qualification: "",
    location:"",
    experience: "",
    password: "",
    certificate: null,
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, // ✅ Handles file uploads for both certificate and logo
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register-vet",
        form
      );
  
      // ✅ Show SweetAlert with username after successful registration
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        html: `<p>Your Veterinary Doctor username is: <strong>${response.data.username}</strong></p>
               <p>Please save it for future login.</p>`,
        confirmButtonText: 'OK'
      });
  
      // ✅ Redirect to login page after closing the alert
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo */}
        <img
          src="/Logo.jpg"
          alt="Pet Logo"
          className="w-24 h-24 mx-auto mb-4"
        />

        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Register as Veterinary Doctor
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
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
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

<input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
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
            type="text"
            name="qualification"
            placeholder="Qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            name="experience"
            placeholder="Experience (in years)"
            value={formData.experience}
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

          {/* Certificate Upload */}
          <div>
            <label
              htmlFor="certificate"
              className="block text-gray-600 mb-1 font-medium"
            >
              Upload Certificate
            </label>
            <input
              type="file"
              name="certificate"
              id="certificate"
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none"
            />
          </div>

          {/* Logo Upload */}
<div>
  <label
    htmlFor="logo"
    className="block text-gray-600 mb-1 font-medium"
  >
    Upload Logo
  </label>
  <input
    type="file"
    name="logo"
    id="logo"
    onChange={handleChange}
    required
    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none"
  />
</div>


          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-700 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-gray-500 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-orange-500 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterVetDoctor;
