import { useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./screens/AdminDashboard";
import ServiceProviderDashboard from "./screens/ServiceProviderDashboard";
import SplashPage from "./screens/SplashPage";
import Login from "./screens/Login";
import RegisterUser from "./screens/RegisterUser";
import RegisterServiceProvider from "./screens/RegisterServiceProvider";
import RegisterVetDoctor from "./screens/RegisterVetDoctor";
import Homepage from "./screens/Homepage";
import ProductList from "./screens/ProductList";
import ServicesPage from "./screens/ServicesHome";
import ServiceProvidersPage from "./screens/ServiceProvidersHome";
import AdoptionPage from "./screens/AdoptionPageHome";
import AdoptionRequestPage from "./screens/AdoptionRequest";
import VeterinaryListPage from "./screens/VeterinaryListPage";
import CheckoutPage from "./screens/CheckoutPage";
import SuccessPage from "./screens/SuccessPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdoptionRequests from "./screens/AdoptionRequests";
import AdoptionAdmin from "./screens/AdoptionAdmin";
import AdminProducts from "./screens/AdminProducts";
import BookingPage from "./screens/BookingVet";
import VetDashboard from "./screens/VetDashboard";
import ProfilePage from "./screens/ProfilePage";
import SplashScreen from "./screens/SplashScreen";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Check if the session (like a JWT token) exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <Routes>
      {/* ✅ Public Routes */}
      <Route path="/options" element={<SplashPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/userreg" element={<RegisterUser />} />
      <Route path="/SPreg" element={<RegisterServiceProvider />} />
      <Route path="/vetReg" element={<RegisterVetDoctor />} />

      {/* ✅ Protected Routes */}
      <Route path="/home" element={<ProtectedRoute element={<Homepage />} />} />
      <Route path="/products" element={<ProtectedRoute element={<ProductList />} />} />
      <Route path="/services" element={<ProtectedRoute element={<ServicesPage />} />} />
      <Route path="/serviceprovidershome" element={<ProtectedRoute element={<ServiceProvidersPage />} />} />
      <Route path="/adoptionhome" element={<ProtectedRoute element={<AdoptionPage />} />} />
      <Route path="/adoptionform" element={<ProtectedRoute element={<AdoptionRequestPage />} />} />
      <Route path="/vetlist" element={<ProtectedRoute element={<VeterinaryListPage />} />} />
      <Route path="/checkout" element={<ProtectedRoute element={<CheckoutPage />} />} />
      <Route path="/service-provider" element={<ProtectedRoute element={<ServiceProviderDashboard />} />} />
      <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} />} />
      <Route path="/adop-request" element={<ProtectedRoute element={<AdoptionRequests />} />} />
      <Route path="/adop-view" element={<ProtectedRoute element={<AdoptionAdmin />} />} />
      <Route path="/admin-pro" element={<ProtectedRoute element={<AdminProducts />} />} />
      <Route path="/bookvet" element={<ProtectedRoute element={<BookingPage />} />} />
      <Route path="/vetdash" element={<ProtectedRoute element={<VetDashboard />} />} />
      <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/" element={<SplashScreen/>} />
    </Routes>
  );
}

export default App;
