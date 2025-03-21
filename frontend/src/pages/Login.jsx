import axios from "axios";
import { useState } from "react";
import { useDispatch ,useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
 
  if (isLoggedIn === true){
    navigate("/dashboard");
  }

  const validateForm = () => {
    let newErrors = {};
    if (!email) newErrors.email = "Email is required!";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format!";

    if (!password) newErrors.password = "Password is required!";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5005/api/users/login", { email, password });
     
      if (response.data.token) {

        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(authActions.login())
        navigate("/dashboard");
      } else {
        setErrors({ apiError: "Login failed. Please try again." });
      }
    } catch (error) {
      if (error.response) {
        setErrors({ apiError: error.response.data.message });
      } else {
        setErrors({ apiError: "Something went wrong!" });
      }
    }
    finally {
      setLoading(false); // Stop loading
    }

  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className={`w-full mt-2 px-4 py-2 border text-gray-700 rounded-lg focus:outline-none 
                ${errors.email ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className={`w-full mt-2 px-4 py-2 text-gray-700 border rounded-lg focus:outline-none
                ${errors.password ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
