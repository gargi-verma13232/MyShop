import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = "https://fakestoreapi.com/products";
        if (categoryQuery) {
          url = `https://fakestoreapi.com/products/category/${categoryQuery}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [categoryQuery]);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-teal-700 text-xl font-semibold animate-pulse">
          Loading products...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-500 text-white text-center py-10 px-4">
        <h1 className="text-4xl font-bold mb-2">Welcome to ShopMe 🛒</h1>
        <p className="text-lg text-teal-100">Best deals. Every day.</p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {searchQuery
            ? `Results for "${searchQuery}"`
            : categoryQuery
            ? `Category: ${categoryQuery}`
            : "All Products"}
        </h2>

        {filtered.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;