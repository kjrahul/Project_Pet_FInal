import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Directly redirect if username and password are 'admin'
    if (formData.username === "admin" && formData.password === "admin") {
      sessionStorage.setItem("token", "admin-token");
      sessionStorage.setItem("userId", "admin");
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome Admin`,
        confirmButtonText: "Continue",
      });
      navigate("/admin");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      const { token, userType, userId } = response.data;

      // ✅ Save token and userId in session storage
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", userId);

      // ✅ Show success message
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${formData.username}`,
        confirmButtonText: "Continue",
      });

      // ✅ Redirect based on userType
      if (userType === "SP") navigate(`/service-provider`);
      else if (userType === "vet") navigate(`/vetdash`);
      else if (userType === "user") navigate("/home");
      else alert("Check your credentials");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <img
          src="/Logo.jpg"
          alt="Pet Logo"
          className="w-24 h-24 mx-auto mb-6"
        />
        <h1 className="text-3xl font-bold text-orange-500 mb-4">
          Welcome to The PetSphere
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Login
          </button>
        </form>

        <button
          onClick={() => navigate("/options")}
          className="mt-4 text-orange-500 font-semibold hover:underline"
        >
          New User? Go to Register Page
        </button>
      </div>
    </div>
  );
};

export default Login;
