import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const { createUser, setUser, userProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!/(?=.*[A-Z])(?=.*[a-z]).{6,}/.test(password)) {
      setError(
        "Password must contain uppercase, lowercase letters and be at least 6 characters long."
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        userProfile({ displayName: name, photoURL: photoURL });
        toast.success("Registration successful!");
        navigate(location.state?.from?.pathname || "/");
        setUser(loggedUser);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        toast.error("Email already in use");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
      <Helmet>
        <title>Home || Register</title>
        <meta
          name="description"
          content="Track and manage your bills efficiently with Job Track."
        />
      </Helmet>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Your full name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Photo URL</label>
            <input
              name="photoURL"
              type="text"
              placeholder="Profile picture URL"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full pr-10"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Must contain upper, lower case and at least 6 characters
            </p>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button type="submit" className="btn btn-primary w-full mt-4">
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?
          <Link to="/login" className="text-indigo-600 hover:underline ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
