import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const Login = () => {
  const { logIn, googleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((result) => {
        console.log(result);
        toast.success("Login successful!");
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => {
        setError(error.code);
        toast.error("Login Fail")
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result);
        toast.success("Logged in with Google!");
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
       <Helmet>
        <title>Home || Login </title>
        <meta
          name="description"
          content="Track and manage your bills efficiently with Job Track."
        />
      </Helmet>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login in
        </h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input input-bordered w-full pr-10"
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </span>
            </div>
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-indigo-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-1">
              {error === "auth/wrong-password"
                ? "Incorrect password. Please try again."
                : error === "auth/user-not-found"
                ? "No user found with this Email."
                : "Login failed. Please try again."}
            </p>
          )}

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>

          <div className="divider text-sm">or</div>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="btn w-full bg-white text-black border-gray-300 hover:bg-gray-100"
          >
            Continue with Google
          </button>

         
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Don't have an account?
          <Link to="/signup" className="text-indigo-600 hover:underline ml-1">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
