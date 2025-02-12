import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user } = useSelector((state) => state.user);


  useEffect(() => {
    if (user?.token) {
      navigate("/");
    }
  }, [user, navigate]);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await dispatch(loginUser(formData)).unwrap();
      navigate("/");
    } catch (err) {
      setError(err || "Login failed. Please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="grid gap-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
          <div className="border-[20px] border-transparent rounded-[20px]  bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
            <h1 className="pt-8 pb-6 font-bold dark:text-black text-5xl text-center">
              Log in
            </h1>
            {/* Show error message */}
            {error && (
              <p className="text-red-500 text-center bg-red-100 p-2 rounded-md">
                {error}
              </p>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-2 text-black text-lg">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  className="border p-3 shadow-md border-gray-300 rounded-lg w-full focus:scale-105 transition duration-300"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 text-black text-lg">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  className="border p-3 shadow-md border-gray-300 rounded-lg w-full focus:scale-105 transition duration-300"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <Link
                className="text-blue-400 text-sm transition-all hover:underline"
                to="/forgot-password"
              >
                Forgot your password?
              </Link>
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 transition duration-300 disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "LOG IN"}
              </button>
            </form>
            <div className="flex flex-col mt-4 items-center text-sm">
              <p className="text-gray-700">
                Don't have an account?{" "}
                <Link className="text-blue-400 hover:underline" to="/register">
                  Sign Up
                </Link>
              </p>
            </div>
            <div className="text-black flex text-center flex-col mt-4 items-center text-sm">
              <p>
                By signing in, you agree to our{" "}
                <Link className="text-blue-400 hover:underline" to="/terms">
                  Terms
                </Link>{" "}
                and{" "}
                <Link className="text-blue-400 hover:underline" to="/privacy">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
