import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  if (isLoggedIn === true) {
    navigate("/dashboard");
  }

  const validateForm = () => {
    let newErrors = {};

    if (!name) newErrors.name = "Name is required!";
    if (!email) newErrors.email = "Email is required!";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format!";

    if (!password) newErrors.password = "Password is required!";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters!";

    if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required!";
    else if (confirmPassword !== password)
      newErrors.confirmPassword = "Passwords do not match!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5005/api/users/signup", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        alert("Signup Successful! 🚀");
        navigate("/login"); // Navigate to login page after signup
      }
    }
     catch (error) {
      if (error.response) {
        setErrors({ apiError: error.response.data.message });
      } else {
        setErrors({ apiError: "Something went wrong!" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

        <form onSubmit={handleSubmit} className="mt-6 text-black ">
          <div>
            <label className="block text-gray-700">Name</label> 
            <input
              type="name"
              className={`w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none 
                ${errors.name ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`}
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className={`w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none 
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
              className={`w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none
                ${errors.password ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password Input */}
          <div className="mt-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className={`w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none
                ${errors.confirmPassword ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
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
              "Sign Up"
            )}
          </button>
          <p className="mt-4 text-center text-gray-600">
            Already have a accouont? <Link to="/login" className="text-blue-500">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
