import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../redux/product/productSlice";
import { addToCart, updateCartItemCount } from "../redux/cart/cartSlice";
import { Spinner } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state?.products);
  const user = useSelector((state) => state?.user?.user) || null;

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false); 

  useEffect(() => {
    if (id) dispatch(getProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please log in to add items to the cart.");
      return;
    }

    if (product && product.stock >= quantity) {
      const cartData = {
        user: user?.user?.id,
        items: [
          {
            product: product._id,
            quantity,
            price: product.price,
            totalItemPrice: product.price * quantity,
          },
        ],
        totalPrice: product.price * quantity,
      };
      dispatch(addToCart(cartData));
      dispatch(updateCartItemCount())
      setAddedToCart(true); 
      toast.success(`${quantity} × ${product.name} added to cart! 🛒`);
    } else {
      toast.error("Not enough stock available.");
    }
  };

  // Handle increasing and decreasing quantity
  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="h-12 w-12 text-blue-500" />
      </div>
    );
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Toast Notification Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />

      {product ? (
        <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 rounded-lg flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={product.images?.[0] || "https://via.placeholder.com/300"}
              alt={product.name}
              className="w-full max-h-96 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600 mt-2">{product.description}</p>

              {/* Price Section */}
              <div className="flex items-center gap-4 mt-4">
                <p className="text-2xl font-semibold text-blue-600">
                  ${product.discountPrice || product.price}
                </p>
                {product.discountPrice && (
                  <p className="text-gray-500 line-through">${product.price}</p>
                )}
              </div>

              {/* Stock & Category */}
              <p className="mt-2 text-sm text-gray-500">
                Brand: {product.brand}
              </p>
              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>
              <p
                className={`mt-2 font-semibold ${
                  product.stock > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mt-6 flex items-center gap-4">
              {/* Quantity Counter */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDecrease}
                  className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-xl font-semibold">{quantity}</span>
                <button
                  onClick={handleIncrease}
                  className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              {!addedToCart ? (
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all disabled:bg-gray-400"
                  disabled={product.stock === 0}
                >
                  Add to Cart 🛒
                </button>
              ) : (
                <Link to="/cart">
                  <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all">
                    Go to Cart 🛒
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center">Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetail;
