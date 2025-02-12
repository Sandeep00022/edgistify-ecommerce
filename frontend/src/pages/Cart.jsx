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
import { HiOutlineTrash, HiMinusSm, HiPlusSm } from "react-icons/hi";

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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner className="h-12 w-12" color="indigo" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Empty Cart</h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added anything to your cart yet
        </p>
        <Link
          to="/"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

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
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <div className="grid grid-cols-5 gap-4 bg-gray-50 px-6 py-4 border-b">
                <div className="font-medium text-gray-700">Product</div>
                <div className="font-medium text-gray-700 text-center">Price</div>
                <div className="font-medium text-gray-700 text-center">Quantity</div>
                <div className="font-medium text-gray-700 text-center">Total</div>
                <div className="font-medium text-gray-700 text-center">Actions</div>
              </div>
              {cart?.items?.map((item) => (
                <div
                  key={item?.product?._id}
                  className="grid grid-cols-5 gap-4 items-center px-6 py-4 border-b hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item?.product?.images[0]}
                      alt={item?.product?.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <span className="text-gray-900 font-medium">
                      {item?.product?.name}
                    </span>
                  </div>
                  <div className="text-center text-gray-700">
                    ${item?.price?.toFixed(2)}
                  </div>
                  <div className="flex justify-center">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item)}
                        className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-600 transition-colors"
                      >
                        <HiMinusSm className="w-5 h-5" />
                      </button>
                      <span className="w-8 text-center text-gray-900">
                        {item?.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item?.product?._id)}
                        className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-600 transition-colors"
                      >
                        <HiPlusSm className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-center text-gray-900">
                    ${((item?.price || 0) * (item?.quantity || 0)).toFixed(2)}
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleRemove(item?.product?._id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile List */}
            <div className="md:hidden">
              {cart?.items?.map((item) => (
                <div
                  key={item?.product?._id}
                  className="p-4 border-b hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <img
                      src={item?.product?.images[0]}
                      alt={item?.product?.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleRemove(item?.product?._id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                    >
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item?.product?.name}
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-700">
                        ${item?.price?.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decreaseQuantity(item)}
                          className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-600"
                        >
                          <HiMinusSm className="w-5 h-5" />
                        </button>
                        <span className="w-8 text-center">{item?.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item?.product?._id)}
                          className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-600"
                        >
                          <HiPlusSm className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 text-right font-medium">
                      Total: ${((item?.price || 0) * (item?.quantity || 0)).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-xl font-bold text-gray-900">
                  Total: ${totalPrice.toFixed(2)}
                </div>
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                  <button
                    onClick={handleClearCart}
                    className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors w-full md:w-auto"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors w-full md:w-auto"
                  >
                    Checkout Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <OrderModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          orderDetails={orderDetails}
        />
      </div>
    </div>
  );
};

export default Cart;