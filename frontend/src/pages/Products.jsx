import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/product/productSlice";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { categories } from "../constants/constants";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, totalPages } = useSelector(
    (state) => state.products
  );

  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    page: 1,
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(filters).toString();
    dispatch(getAllProducts(queryParams));
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Explore Products
      </h2>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {categories?.map((category) => (
                <option key={category} value={category}>
                  {category.replace(/_/g, " ").toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              name="brand"
              placeholder="Search brand..."
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              value={filters.brand}
              onChange={handleFilterChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Price Range
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                value={filters.minPrice}
                onChange={handleFilterChange}
              />
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 rounded-lg h-96"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product._id)}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group"
            >
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.discountPrice && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {Math.round(
                      100 - (product.discountPrice / product.price) * 100
                    )}
                    % OFF
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <div className="flex items-center">
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                    <span className="ml-1 text-gray-600">
                      {product.ratings?.toFixed(1) || "0.0"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      product.stockStatus === "in_stock"
                        ? "bg-green-100 text-green-800"
                        : product.stockStatus === "low_stock"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stockStatus.replace(/_/g, " ")}
                  </span>
                  <span className="text-sm text-gray-500">{product.brand}</span>
                </div>

                <div className="flex items-center gap-2">
                  {product.discountPrice ? (
                    <>
                      <span className="text-xl font-bold text-gray-900">
                        ${product.discountPrice}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center mt-8 gap-2">
        <button
          className={`px-4 py-2 rounded-md flex items-center gap-1 ${
            filters.page <= 1
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
          disabled={filters.page <= 1}
          onClick={() => handlePageChange(filters.page - 1)}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <span className="px-4 py-2 text-gray-700">
          Page {filters.page} of {totalPages}
        </span>

        <button
          className={`px-4 py-2 rounded-md flex items-center gap-1 ${
            filters.page >= totalPages
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
          disabled={filters.page >= totalPages}
          onClick={() => handlePageChange(filters.page + 1)}
        >
          <span>Next</span>
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Products;
