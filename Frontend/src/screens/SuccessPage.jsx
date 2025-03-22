import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-green-500">🎉 Purchase Successful!</h1>
      <p className="mt-4">Thank you for your order. You will receive a confirmation soon.</p>
      <button
        onClick={() => navigate("/products")}
        className="mt-6 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default SuccessPage;
