import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const gradients = [
  "from-pink-500 to-rose-500",
  "from-purple-500 to-indigo-500",
  "from-teal-400 to-emerald-500",
  "from-amber-400 to-orange-500",
  "from-cyan-500 to-blue-500",
  "from-fuchsia-500 to-purple-600",
  "from-yellow-400 to-amber-500",
  "from-lime-400 to-green-500"
];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-500 dark:from-teal-900 dark:to-teal-700 text-white text-center py-10 px-4">
        <h1 className="text-4xl font-bold mb-2">Welcome to ShopMe 🛒</h1>
        <p className="text-lg text-teal-100">Browse through our extensive collection of products.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            Explore Categories
          </h2>
        </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-teal-700 text-xl font-semibold animate-pulse">
            Loading categories...
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="group relative h-40 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Colorful Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Dark Overlay for better contrast */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-white text-xl font-bold tracking-wide drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
