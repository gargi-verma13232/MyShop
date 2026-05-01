import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../redux/Wishlistslice";
import { addToCart } from "../redux/Cartslice";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-5xl">❤️</p>
        <p className="text-xl font-semibold text-gray-600">Your wishlist is empty!</p>
        <Link
          to="/"
          className="bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">❤️ Your Wishlist</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col">
            <Link to={`/product/${item.id}`}>
              <div className="h-48 flex items-center justify-center p-4 bg-gray-50 rounded-t-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full object-contain hover:scale-105 transition"
                />
              </div>
            </Link>

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
                {item.title}
              </h3>
              <p className="text-teal-700 font-bold text-lg mb-4">
                ${item.price}
              </p>

              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => dispatch(addToCart(item))}
                  className="flex-1 bg-amber-400 hover:bg-amber-500 text-gray-900 text-sm font-semibold py-2 rounded-lg transition"
                >
                  🛒 Add to Cart
                </button>
                <button
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  className="px-3 py-2 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;