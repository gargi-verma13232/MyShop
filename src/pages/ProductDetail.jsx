import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/Cartslice";
import { addToWishlist, removeFromWishlist } from "../redux/Wishlistslice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some((item) => item.id === product?.id);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-teal-700 text-xl animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center text-gray-500 mt-10">Product not found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row gap-10 p-8">
        
        {/* Image */}
        <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-xl p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-72 object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p className="text-xs text-teal-600 uppercase font-semibold mb-2">
              {product.category}
            </p>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-400">
                {"⭐".repeat(Math.round(product.rating?.rate))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating?.rate} / 5 ({product.rating?.count} reviews)
              </span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {product.description}
            </p>
          </div>

          {/* Price & Buttons */}
          <div>
            <p className="text-3xl font-bold text-teal-700 mb-6">
              ${product.price}
            </p>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 rounded-xl font-semibold text-gray-900 transition ${
                  added
                    ? "bg-green-400"
                    : "bg-amber-400 hover:bg-amber-500"
                }`}
              >
                {added ? "✅ Added!" : "🛒 Add to Cart"}
              </button>

              <button
                onClick={() =>
                  isWishlisted
                    ? dispatch(removeFromWishlist(product.id))
                    : dispatch(addToWishlist(product))
                }
                className={`px-5 py-3 rounded-xl text-xl transition ${
                  isWishlisted
                    ? "bg-red-100 text-red-500"
                    : "bg-gray-100 text-gray-400 hover:text-red-400"
                }`}
              >
                {isWishlisted ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;