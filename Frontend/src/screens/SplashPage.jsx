import { useNavigate } from "react-router-dom";
import { FaUser, FaBriefcase, FaStethoscope, FaHandsHelping, FaUserMd } from "react-icons/fa";

const SplashPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-orange-500 mb-6">
          Welcome to The PetSphere
        </h1>
        <img
          src="/Logo.jpg"
          alt="Pet Logo"
          className="w-24 h-24 mx-auto mb-8"
        />

        {/* Horizontal options */}
        <div className="flex justify-center gap-4">
          {/* User Option */}
          <div
            onClick={() => navigate("/userreg")}
            className="cursor-pointer bg-orange-500 text-white flex flex-col items-center justify-center p-4 rounded-lg shadow-md w-32 h-32 hover:bg-orange-700 transition"
          >
            <FaUser size={32} />
            <span className="mt-2 font-medium">User</span>
          </div>

          {/* Service Provider Option */}
          <div
            onClick={() => navigate("/SPreg")}
            className="cursor-pointer bg-orange-500 text-white flex flex-col items-center justify-center p-4 rounded-lg shadow-md w-32 h-32 hover:bg-orange-700 transition"
          >
            <FaHandsHelping size={32} />
            <span className="mt-2 font-medium">Service Provider</span>
          </div>

          {/* Vet Doctor Option */}
          <div
            onClick={() => navigate("/vetReg")}
            className="cursor-pointer bg-orange-500 text-white flex flex-col items-center justify-center p-4 rounded-lg shadow-md w-32 h-32 hover:bg-orange-700 transition"
          >
            <FaUserMd size={32} />
            <span className="mt-2 font-medium">Vet Doctor</span>
          </div>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-gray-500">
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

export default SplashPage;
