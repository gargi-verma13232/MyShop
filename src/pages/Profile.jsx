import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [profile, setProfile] = useState({
    name: "Gaurav Singh",
    email: "gaurav@email.com",
    phone: "+91 98765 43210",
    address: "Chandigarh, India",
  });

  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState({ ...profile });

  const handleSave = () => {
    setProfile({ ...temp });
    setEditing(false);
  };

  const totalSpent = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">👤 My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Profile Card */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-teal-700 flex items-center justify-center text-white text-3xl font-bold">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
              <p className="text-gray-500 text-sm">{profile.email}</p>
              <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full mt-1 inline-block">
                Premium Member ⭐
              </span>
            </div>
          </div>

          <hr className="mb-6" />

          {/* Editable Fields */}
          {editing ? (
            <div className="flex flex-col gap-4">
              {[
                { label: "Full Name", key: "name" },
                { label: "Email", key: "email" },
                { label: "Phone", key: "phone" },
                { label: "Address", key: "address" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-sm text-gray-500 mb-1 block">
                    {field.label}
                  </label>
                  <input
                    value={temp[field.key]}
                    onChange={(e) =>
                      setTemp({ ...temp, [field.key]: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-teal-500"
                  />
                </div>
              ))}

              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-teal-700 text-white py-2 rounded-lg hover:bg-teal-800 transition font-semibold"
                >
                  Save Changes ✅
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {[
                { label: "Full Name", value: profile.name, icon: "👤" },
                { label: "Email", value: profile.email, icon: "📧" },
                { label: "Phone", value: profile.phone, icon: "📱" },
                { label: "Address", value: profile.address, icon: "📍" },
              ].map((field) => (
                <div key={field.label} className="flex items-center gap-3">
                  <span className="text-xl">{field.icon}</span>
                  <div>
                    <p className="text-xs text-gray-400">{field.label}</p>
                    <p className="text-sm font-semibold text-gray-700">
                      {field.value}
                    </p>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setEditing(true)}
                className="mt-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold py-2 rounded-lg transition"
              >
                ✏️ Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Stats + Quick Links */}
        <div className="flex flex-col gap-4">

          {/* Stats */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📊 My Stats</h3>
            <div className="flex flex-col gap-4">
              <div className="bg-teal-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-teal-700">
                  {cartItems.length}
                </p>
                <p className="text-sm text-gray-500 mt-1">Items in Cart</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-red-400">
                  {wishlistItems.length}
                </p>
                <p className="text-sm text-gray-500 mt-1">Wishlist Items</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-amber-500">
                  ${totalSpent}
                </p>
                <p className="text-sm text-gray-500 mt-1">Cart Value</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🔗 Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link
                to="/cart"
                className="flex items-center gap-2 text-sm text-teal-700 hover:underline"
              >
                🛒 Go to Cart
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center gap-2 text-sm text-teal-700 hover:underline"
              >
                ❤️ View Wishlist
              </Link>
              <Link
                to="/"
                className="flex items-center gap-2 text-sm text-teal-700 hover:underline"
              >
                🏠 Back to Home
              </Link>
              <Link
                to="/checkout"
                className="flex items-center gap-2 text-sm text-teal-700 hover:underline"
              >
                📦 Checkout
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;