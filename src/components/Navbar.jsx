import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${search}`);
    }
  };

  return (
    <nav className="bg-teal-700 text-white sticky top-0 z-50 shadow-lg">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 gap-4">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-amber-400 whitespace-nowrap">
          🛒 ShopMe
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-1 max-w-2xl">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-l-md text-gray-800 outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-500 text-gray-900 px-4 py-2 rounded-r-md font-semibold text-sm"
          >
            🔍
          </button>
        </form>

        {/* Right Icons */}
        <div className="flex items-center gap-5 text-sm font-medium">
          
          {/* Wishlist */}
          <Link to="/wishlist" className="flex flex-col items-center hover:text-amber-400 transition">
            <span className="text-xl">❤️</span>
            <span className="text-xs">
              Wishlist
              {wishlistItems.length > 0 && (
                <span className="ml-1 bg-amber-400 text-gray-900 rounded-full px-1 text-xs">
                  {wishlistItems.length}
                </span>
              )}
            </span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="flex flex-col items-center hover:text-amber-400 transition">
            <span className="text-xl">🛒</span>
            <span className="text-xs">
              Cart
              {totalCartItems > 0 && (
                <span className="ml-1 bg-amber-400 text-gray-900 rounded-full px-1 text-xs">
                  {totalCartItems}
                </span>
              )}
            </span>
          </Link>

          {/* Profile */}
          <Link to="/profile" className="flex flex-col items-center hover:text-amber-400 transition">
            <span className="text-xl">👤</span>
            <span className="text-xs">Profile</span>
          </Link>

        </div>
      </div>

      {/* Category Bar */}
      <div className="bg-teal-800 px-4 py-2 flex gap-6 text-sm overflow-x-auto">
        {["All", "Electronics", "Jewelery", "Men's Clothing", "Women's Clothing"].map((cat) => (
          <Link
            key={cat}
            to={cat === "All" ? "/" : `/?category=${cat.toLowerCase()}`}
            className="whitespace-nowrap hover:text-amber-400 transition"
          >
            {cat}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;