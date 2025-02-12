import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { name, email, phone, password } = formData;
  const [error, setError] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoadingMessage("");

    const timeout = setTimeout(() => {
      setLoadingMessage(
        "🚀 The server is waking up... This may take a few seconds. Please wait! (Gotta love free hosting 😆)"
      );
    }, 3000);

    try {
      await dispatch(registerUser(formData)).unwrap();
      clearTimeout(timeout);
      navigate("/login");
    } catch (error) {
      clearTimeout(timeout);
      setLoadingMessage("");
      setError(error || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="grid gap-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
          <div className="border-[20px] border-transparent rounded-[20px] bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
            <h1 className="pt-8 pb-6 font-bold text-black text-5xl text-center">
              Sign Up
            </h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {loadingMessage && (
              <p className="text-yellow-500 text-center">{loadingMessage}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 text-black text-lg">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={handleChange}
                  required
                  className="border p-3 shadow-md border-gray-300 rounded-lg w-full"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 text-black text-lg">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  required
                  className="border p-3 shadow-md border-gray-300 rounded-lg w-full"
                  placeholder="Email Address"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 text-black text-lg">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={handleChange}
                  required
                  className="border p-3 shadow-md border-gray-300 rounded-lg w-full"
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 text-black text-lg">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                  required
                  className="border p-3 shadow-md border-gray-300 rounded-lg w-full"
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              >
                {loading ? (
                  <div className="w-5 h-5 border-4 border-t-4 border-transparent border-t-white rounded-full animate-spin mx-auto" />
                ) : (
                  "SIGN UP"
                )}
              </button>
            </form>
            <div className="flex flex-col mt-4 items-center justify-center text-sm">
              <h3 className="text-gray-700">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-400">
                  Login
                </Link>
              </h3>
            </div>
            <div className="text-black flex text-center flex-col mt-4 items-center text-sm">
              <p>
                By signing up, you agree to our{" "}
                <span className="text-blue-400 cursor-pointer">Terms</span> and{" "}
                <span className="text-blue-400 cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
