import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/Cartslice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [form, setForm] = useState({
    name: "", email: "", address: "", city: "", zip: "", card: "",
  });
  const [ordered, setOrdered] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    if (!form.name || !form.email || !form.address || !form.card) {
      alert("Please fill all fields!");
      return;
    }
    dispatch(clearCart());
    setOrdered(true);
  };

  if (ordered) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <p className="text-6xl">🎉</p>
        <h2 className="text-3xl font-bold text-teal-700">Order Placed!</h2>
        <p className="text-gray-500">Thank you, {form.name}! Your order is confirmed.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">📦 Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form */}
        <div className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Delivery Details</h2>

          {[
            { name: "name", placeholder: "Full Name" },
            { name: "email", placeholder: "Email Address" },
            { name: "address", placeholder: "Street Address" },
            { name: "city", placeholder: "City" },
            { name: "zip", placeholder: "ZIP Code" },
          ].map((field) => (
            <input
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-teal-500"
            />
          ))}

          <h2 className="text-xl font-bold text-gray-700 mt-4 mb-2">Payment</h2>
          <input
            name="card"
            placeholder="Card Number (16 digits)"
            value={form.card}
            onChange={handleChange}
            maxLength={16}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-teal-500"
          />
        </div>

        {/* Summary */}
        <div className="w-full lg:w-80">
          <div className="bg-white rounded-xl shadow p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-gray-600 mb-2">
                <span className="line-clamp-1 flex-1">{item.title}</span>
                <span className="ml-2 font-medium">x{item.quantity}</span>
              </div>
            ))}

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg text-gray-800 mb-6">
              <span>Total</span>
              <span className="text-teal-700">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleOrder}
              className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition"
            >
              Place Order 🎉
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;