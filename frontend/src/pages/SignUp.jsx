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

  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  // if (isLoggedIn === true) {
  //   navigate("/dashboard");
  // }

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

  const handleSubmit = async (e) => {
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
    <div className="flex flex-col h-screen items-center justify-center bg-[url(https://img.freepik.com/free-photo/top-view-desk-concept-with-tablet_23-2148236862.jpg?ga=GA1.1.89789206.1741257003&semt=ais_keywords_boost)] bg-no-repeat bg-cover  px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-[#2D336B] uppercase pb-6 text-center">
        Task Manager
      </h1>

      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden ">

        <div className="hidden md:flex bg-[#2D336B] text-white flex-col justify-center items-center text-center rounded-tr-2xl rounded-br-2xl px-6">
          <h2 className="text-4xl font-bold">Hello, Welcome!</h2>
          <p className="py-3 text-lg">
            Sign up to start managing your tasks effectively and boost your productivity.
          </p>
          <Link to={"/login"} className="mt-4 px-8 py-2 bg-[#7886C7] rounded-lg text-xl hover:bg-[#A9B5DF] transition duration-300">
            Log In
          </Link>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-[70%] p-8">
          <h2 className="text-2xl font-semibold text-center text-[#2D336B]">Sign Up</h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Name Input */}
            <div>
              <label className="block font-medium text-[#2D336B]">Name</label>
              <input
                type="text"
                className={`w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none 
            ${errors.name ? "border-red-500" : "border-gray-300 focus:border-[#2D336B]"}`}
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label className="block font-medium text-[#2D336B]">Email</label>
              <input
                type="email"
                className={`w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none 
            ${errors.email ? "border-red-500" : "border-gray-300 focus:border-[#2D336B]"}`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label className="block font-medium text-[#2D336B]">Password</label>
              <input
                type="password"
                className={`w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none 
            ${errors.password ? "border-red-500" : "border-gray-300 focus:border-[#2D336B]"}`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block font-medium text-[#2D336B]">Confirm Password</label>
              <input
                type="password"
                className={`w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none 
            ${errors.confirmPassword ? "border-red-500" : "border-gray-300 focus:border-[#2D336B]"}`}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 px-4 py-2 text-white bg-[#2D336B] rounded-lg hover:bg-[#7886C7] transition duration-300 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Sign Up"
              )}
            </button>

            {/* Login Link */}
            <p className="mt-4 text-center text-[#2D336B]">
              Already have an account? <Link to="/login" className="text-[#2D336B] font-semibold hover:underline">Log In</Link>
            </p>
          </form>
        </div>




      </div>
    </div>

  );
}
