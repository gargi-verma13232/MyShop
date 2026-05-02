import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty, clearCart } from "../redux/Cartslice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity, 0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-5xl">🛒</p>
        <p className="text-xl font-semibold text-gray-600 dark:text-gray-400">Your cart is empty!</p>
        <Link
          to="/"
          className="bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">🛒 Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex gap-4 items-center"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain bg-gray-50 dark:bg-gray-700 rounded-lg p-2"
              />

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{item.category}</p>
                <p className="text-teal-700 dark:text-teal-400 font-bold mt-1">₹{item.price}</p>
                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className="w-7 h-7 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    −
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="w-7 h-7 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Subtotal + Remove */}
              <div className="text-right">
                <div className="font-bold text-teal-700 dark:text-teal-400 text-lg w-24 text-right">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-400 hover:text-red-600 text-sm mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Clear Cart */}
          <button
            onClick={() => dispatch(clearCart())}
            className="text-red-500 hover:text-red-700 text-sm self-start mt-2"
          >
            🗑️ Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-3 text-lg">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400 mb-2">
              <span>Shipping</span>
              <span className="text-green-500">FREE</span>
            </div>
            <hr className="my-4 border-gray-200 dark:border-gray-700" />
            <div className="flex justify-between font-bold text-2xl text-gray-800 dark:text-gray-100 mb-6">
              <span>Total</span>
              <span className="text-teal-700 dark:text-teal-400">₹{total.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold text-center py-3 rounded-xl transition"
            >
              Proceed to Checkout →
            </Link>

            <Link
              to="/"
              className="block w-full text-center text-teal-700 hover:underline mt-3 text-sm"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;