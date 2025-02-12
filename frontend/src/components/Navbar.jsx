import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/user/userSlice";
import { Link } from "react-router-dom";

export const MyNavbar = () => {
  const user = useSelector((state) => state?.user?.user);
  const { cart } = useSelector((state) => state.cart);

  // Calculate cart item count
  const cartItemsCount = cart?.items?.reduce(
    (acc, item) => acc + item?.quantity,
    0
  );
  const dispatch = useDispatch();

  // Handle logout
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-gray-200 shadow-md w-full px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-indigo-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
            />
          </svg>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <ul className="flex space-x-4">
            {user ? (
              <>
                <li className="relative hover:text-indigo-400">
                  <Link to="/cart">
                    Cart
                    {cartItemsCount > 0 && (
                      <span className="absolute top-0 right-0 px-2 py-0 text-xs font-bold text-white bg-red-500 rounded-full">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="hover:text-indigo-400">
                  <Link to="/order">Order</Link>
                </li>
              </>
            ) : null}

            <li className="text-indigo-500 hover:text-indigo-400">
              <Link to="/">Products</Link>
            </li>

            {!user && (
              <>
                <li className="hover:text-indigo-400">
                  <Link to="/login">Login</Link>
                </li>
                <li className="hover:text-indigo-400">
                  <Link to="/register">Signup</Link>
                </li>
              </>
            )}
          </ul>

          <div>
            {user ? (
              <button
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
                onClick={handleLogout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-gray-200 shadow-lg py-4 space-y-4">
          <ul className="space-y-4">
            {user ? (
              <>
                <li className="hover:text-indigo-400">
                  <Link to="/cart">
                    Cart
                    {cartItemsCount > 0 && (
                      <span className="absolute top-0 right-0 px-2 py-0 text-xs font-bold text-white bg-red-500 rounded-full">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="hover:text-indigo-400">
                  <Link to="/order">Order</Link>
                </li>
              </>
            ) : null}

            <li className="text-indigo-500 hover:text-indigo-400">
              <Link to="/">Products</Link>
            </li>

            {!user && (
              <>
                <li className="hover:text-indigo-400">
                  <Link to="/login">Login</Link>
                </li>
                <li className="hover:text-indigo-400">
                  <Link to="/register">Signup</Link>
                </li>
              </>
            )}
          </ul>

          <div>
            {user ? (
              <button
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
                onClick={handleLogout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
