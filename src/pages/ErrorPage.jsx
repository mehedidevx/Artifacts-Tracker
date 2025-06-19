import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-600 to-red-400 text-white">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="mb-6 text-lg">The page you are looking for does not exist or has been moved.</p>
        <Link
          to="/"
          className="btn btn-primary text-lg px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Go to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
