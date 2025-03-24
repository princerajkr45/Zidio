import axios from "axios";
import { useState } from "react";
import { useDispatch ,useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import AuthPage from "./AuthPage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
 
  // if (isLoggedIn === true){
  //   navigate("/dashboard");
  // }

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
    <>
      <div className="flex flex-col h-screen items-center justify-center bg-[url(https://img.freepik.com/free-photo/top-view-desk-concept-with-tablet_23-2148236862.jpg?ga=GA1.1.89789206.1741257003&semt=ais_keywords_boost)] bg-no-repeat bg-cover">
      <h1 className="text-3xl uppercase pb-6 text-[#2D336B] font-bold">Task Manager</h1>
      <div className="w-[60%] flex bg-[#A9B5DF] rounded-2xl shadow-lg overflow-hidden">
        {/* Form Section */}
        <div className="w-[80%] max-w-md p-6 bg-white rounded-lg">
          <h2 className="text-2xl font-bold text-center text-[#2D336B]">Login</h2>
          <form onSubmit={handleSubmit} className="mt-6">
            {/* Email Input */}
            <div>
              <label className="block text-[#2D336B]">Email</label>
              <input
                type="email"
                className={`w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300 focus:border-[#7886C7]'
                  }`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="mt-4">
              <label className="block text-[#2D336B]">Password</label>
              <input
                type="password"
                className={`w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-300 focus:border-[#7886C7]'
                  }`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
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
                'Login'
              )}
            </button>
          </form>

          {/* Signup Link */}
          <p className="mt-4 text-center text-[#2D336B]">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#7886C7] hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* Welcome Section */}
        <div className="bg-[#2D336B] w-[60%] flex flex-col justify-center items-center text-center p-6 text-white">
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="py-3">
            Enter your credentials to access your account and manage your tasks effectively.
          </p>
          <div className="pt-4">
            <Link to="/signup">
              <button className="px-8 py-3 bg-[#7886C7] rounded-lg text-xl hover:bg-[#A9B5DF] transition duration-300">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>

    
    </>

    
  );
}
