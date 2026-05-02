import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/Cartslice";
import { addToWishlist, removeFromWishlist } from "../redux/Wishlistslice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition duration-200 flex flex-col">
      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div className="h-48 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-t-xl">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain hover:scale-105 transition duration-200"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 hover:text-teal-700 dark:hover:text-teal-400 mb-1">
            {product.title}
          </h3>
        </Link>

        <p className="text-xs text-gray-400 capitalize mb-2">{product.category}</p>

        <div className="flex items-center gap-1 mb-3">
          <span className="text-amber-400 text-sm">⭐</span>
          <span className="text-xs text-gray-600">
            {product.rating?.rate} ({product.rating?.count})
          </span>
        </div>

        <p className="text-teal-700 dark:text-teal-400 font-bold text-lg mb-3">
          ₹{product.price}
        </p>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => dispatch(addToCart(product))}
            className="flex-1 bg-amber-400 hover:bg-amber-500 text-gray-900 text-sm font-semibold py-2 rounded-lg transition"
          >
            Add to Cart
          </button>
          <button
            onClick={() =>
              isWishlisted
                ? dispatch(removeFromWishlist(product.id))
                : dispatch(addToWishlist(product))
            }
            className={`px-3 py-2 rounded-lg text-lg transition ${
              isWishlisted
                ? "bg-red-100 text-red-500"
                : "bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-red-400"
            }`}
          >
            {isWishlisted ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;