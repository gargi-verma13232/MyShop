
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/Cartslice";
import { useNavigate, Link } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [form, setForm] = useState({
    name: "", email: "", address: "", city: "", zip: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [ordered, setOrdered] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 3000);
  };

  const handleOrder = () => {
    if (!form.name || !form.email || !form.address) {
      alert("Please fill all delivery details!");
      return;
    }
    if (paymentMethod === "card" && (!card.number || !card.expiry || !card.cvv)) {
      alert("Please fill card details!");
      return;
    }
    if (paymentMethod === "qr" && !scanned) {
      alert("Please scan the QR code first!");
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
        <p className="text-sm text-gray-400">
          Payment via {paymentMethod === "card" ? "💳 Card" : paymentMethod === "qr" ? "📱 QR Scan" : "💵 Cash on Delivery"}
        </p>
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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">📦 Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Delivery Details */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-100 mb-4">🚚 Delivery Details</h2>
            <div className="flex flex-col gap-3">
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
                  className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-teal-500"
                />
              ))}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-100 mb-4">💳 Payment Method</h2>

            <div className="flex gap-3 mb-6">
              {[
                { id: "card", label: "💳 Card", },
                { id: "qr", label: "📱 QR Pay", },
                { id: "cod", label: "💵 Cash on Delivery", },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border-2 transition ${
                    paymentMethod === method.id
                      ? "border-teal-600 bg-teal-50 dark:bg-teal-900 text-teal-700 dark:text-teal-300"
                      : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-teal-300 dark:hover:border-teal-500"
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>

            {/* Card Payment */}
            {paymentMethod === "card" && (
              <div className="flex flex-col gap-3">
                <input
                  placeholder="Card Number (16 digits)"
                  maxLength={16}
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: e.target.value })}
                  className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-teal-500"
                />
                <div className="flex gap-3">
                  <input
                    placeholder="MM/YY"
                    maxLength={5}
                    value={card.expiry}
                    onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                    className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-teal-500"
                  />
                  <input
                    placeholder="CVV"
                    maxLength={3}
                    value={card.cvv}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                    className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-teal-500"
                  />
                </div>

                {/* Card Preview */}
                <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl p-5 text-white mt-2">
                  <p className="text-xs opacity-70 mb-4">ShopMe Debit Card</p>
                  <p className="text-lg font-mono tracking-widest mb-4">
                    {card.number
                      ? card.number.replace(/(.{4})/g, "$1 ").trim()
                      : "**** **** **** ****"}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span>{form.name || "YOUR NAME"}</span>
                    <span>{card.expiry || "MM/YY"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* QR Payment */}
            {paymentMethod === "qr" && (
              <div className="flex flex-col items-center gap-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                  Scan the QR code below using any UPI app
                  <br />(GPay, PhonePe, Paytm, etc.)
                </p>

                {/* QR Code Box */}
                <div className="relative border-4 border-teal-600 rounded-2xl p-4 bg-white">
                  {/* Fake QR using CSS grid */}
                  <div className="w-48 h-48 grid grid-cols-10 gap-px bg-white">
                    {Array.from({ length: 100 }).map((_, i) => {
                      const pattern = [
                        0,1,2,3,4,5,6,10,16,20,26,30,36,40,
                        46,50,56,60,63,64,65,66,67,68,69,
                        7,17,27,37,47,57,70,80,90,
                        14,24,34,44,54,77,87,97,
                        11,12,13,21,22,23,31,32,33,
                        41,42,43,51,52,53,61,62,
                        71,72,73,81,82,83,91,92,93,
                        74,75,76,84,85,86,94,95,96,
                        8,9,18,19,28,29,38,39,48,49,58,59,
                        78,79,88,89,98,99,15,25,35,45,55,65
                      ];
                      return (
                        <div
                          key={i}
                          className={`${
                            pattern.includes(i) ? "bg-gray-900" : "bg-white dark:bg-gray-200"
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Scanning animation */}
                  {scanning && (
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <div className="w-full h-1 bg-teal-500 opacity-80 animate-bounce" />
                    </div>
                  )}

                  {/* Scanned checkmark */}
                  {scanned && (
                    <div className="absolute inset-0 bg-teal-600 bg-opacity-90 rounded-xl flex items-center justify-center">
                      <div className="text-white text-center">
                        <p className="text-5xl">✅</p>
                        <p className="font-bold mt-2">Payment Done!</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <p className="text-teal-700 font-bold text-xl">₹{(total * 1.05).toFixed(2)}</p>
                  <p className="text-xs text-gray-400">UPI ID: shopme@upi</p>
                </div>

                {!scanned && (
                  <button
                    onClick={handleScan}
                    disabled={scanning}
                    className={`px-8 py-3 rounded-xl font-semibold transition ${
                      scanning
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-teal-700 text-white hover:bg-teal-800"
                    }`}
                  >
                    {scanning ? "⏳ Scanning..." : "📱 Simulate Scan"}
                  </button>
                )}
              </div>
            )}

            {/* Cash on Delivery */}
            {paymentMethod === "cod" && (
              <div className="flex flex-col items-center gap-3 py-4">
                <p className="text-6xl">💵</p>
                <p className="text-gray-600 dark:text-gray-300 font-semibold">Pay when your order arrives</p>
                <p className="text-sm text-gray-400 text-center">
                  Our delivery partner will collect
                  <span className="text-teal-700 dark:text-teal-400 font-bold"> ₹{total.toFixed(2)} </span>
                  at your doorstep
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/50 rounded-xl px-4 py-3 text-sm text-amber-700 dark:text-amber-400 text-center">
                  ⚠️ Please keep exact change ready
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">🧾 Order Summary</h2>

            <div className="max-h-48 overflow-y-auto mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span className="line-clamp-1 flex-1">{item.title}</span>
                  <span className="ml-2 font-medium">x{item.quantity}</span>
                </div>
              ))}
            </div>

            <hr className="my-3 border-gray-200 dark:border-gray-700" />
            <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm mb-2">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm mb-2">
              <span>Shipping</span>
              <span className="text-green-500">FREE</span>
            </div>
            <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm mb-4">
              <span>Tax (5%)</span>
              <span>₹{(total * 0.05).toFixed(2)}</span>
            </div>
            <hr className="mb-4 border-gray-200 dark:border-gray-700" />
            <div className="flex justify-between font-bold text-lg text-gray-800 dark:text-gray-100 mb-6">
              <span>Total</span>
              <span className="text-teal-700 dark:text-teal-400">
                ₹{(total * 1.05).toFixed(2)}
              </span>
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