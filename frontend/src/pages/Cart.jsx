import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeFromCart,
  clearCart,
  increaseProductQuantity,
  decreaseProductQuantity,
} from "../redux/cart/cartSlice";
import { Link } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import OrderModal from "../components/OrderModal";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);

  const [openModal, setOpenModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    items: cart?.items || [],
    totalPrice: 0,
    shippingAddress: {
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    paymentInfo: {
      method: "cod", 
      status: "pending",
      transactionId: null,
    },
  });

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const increaseQuantity = async (productId) => {
    if (!productId) return;
    await dispatch(increaseProductQuantity(productId));
    dispatch(fetchCart());
  };

  const decreaseQuantity = async (item) => {
    if (!item?.product?._id) return;
    if (item?.quantity <= 1) return handleRemove(item?.product?._id);
    await dispatch(decreaseProductQuantity(item?.product?._id));
    dispatch(fetchCart());
  };

  const handleRemove = async (productId) => {
    if (!productId) return;
    await dispatch(removeFromCart(productId));
    dispatch(fetchCart());
  };

  const handleClearCart = async () => {
    await dispatch(clearCart());
    dispatch(fetchCart());
  };

  const totalPrice =
    cart?.items?.reduce(
      (acc, item) => acc + (item?.product?.price || 0) * (item?.quantity || 0),
      0
    ) || 0;

  const handleCheckout = () => {
    setOrderDetails({ ...orderDetails, totalPrice, items: cart?.items });
    setOpenModal(true);
  };

  if (loading) return <Spinner />;
  if (error)
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg mb-4">
          Your cart is empty.{" "}
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Shop Now
          </Link>
        </p>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Your Cart</h2>

      {cart?.items?.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg mb-4">
            Your cart is empty.{" "}
            <Link
              to="/"
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Shop Now
            </Link>
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* Cart Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 text-gray-700 font-medium">
                    Product
                  </th>
                  <th className="text-center p-3 text-gray-700 font-medium">
                    Price
                  </th>
                  <th className="text-center p-3 text-gray-700 font-medium">
                    Quantity
                  </th>
                  <th className="text-center p-3 text-gray-700 font-medium">
                    Total
                  </th>
                  <th className="text-center p-3 text-gray-700 font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart?.items?.map((item) => (
                  <tr
                    key={item?.product?._id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 flex items-center gap-4">
                      <img
                        src={item?.product?.images[0]}
                        alt={item?.product?.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <span className="text-gray-800 font-medium">
                        {item?.product?.name || "Unknown Product"}
                      </span>
                    </td>
                    <td className="text-center p-3 text-gray-700">
                      ${(item?.price || 0).toFixed(2)}
                    </td>
                    <td className="text-center p-3">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(item)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-lg transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center">
                          {item?.quantity || 0}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item?.product?._id)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-lg transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-center p-3 text-gray-700">
                      ${((item?.price || 0) * (item?.quantity || 0)).toFixed(2)}
                    </td>
                    <td className="text-center p-3">
                      <button
                        onClick={() => handleRemove(item?.product?._id)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Total: ${totalPrice.toFixed(2)}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handleClearCart}
                className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg transition-colors"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Modal (Shipping details & Payment) */}
      <OrderModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        orderDetails={orderDetails}
      />
    </div>
  );
};

export default Cart;
