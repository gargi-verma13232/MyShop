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
        let url = `https://dummyjson.com/products?limit=100`;
        if (searchQuery) {
          url = `https://dummyjson.com/products/search?q=${searchQuery}&limit=100`;
        } else if (categoryQuery) {
          url = `https://dummyjson.com/products/category/${categoryQuery}?limit=100`;
        }
        
        const res = await fetch(url);
        const data = await res.json();
        
        const mappedProducts = data.products.map(p => ({
          id: p.id,
          title: p.title,
          price: Math.round(p.price * 83),
          description: p.description,
          category: p.category,
          image: p.thumbnail,
          rating: {
            rate: p.rating,
            count: p.reviews ? p.reviews.length : Math.floor(Math.random() * 200) + 10
          }
        }));
        
        setProducts(mappedProducts);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [searchQuery, categoryQuery]);



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
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          {searchQuery
            ? `Results for "${searchQuery}"`
            : categoryQuery
            ? `Category: ${categoryQuery}`
            : "All Products"}
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center text-lg">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;