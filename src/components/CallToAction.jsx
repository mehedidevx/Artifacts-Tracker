import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-800 to-purple-900 text-white py-16 px-6 text-center rounded-3xl shadow-2xl my-10 container mx-auto">
      <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
      <p className="text-lg mb-8">
        Join thousands of history enthusiasts and start exploring the world's most fascinating artifacts today.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/signup"
          className="bg-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-transparent border hover:text-white transition"
        >
          Get Started Free
        </Link>
        <Link
          to="/all-artifacts"
          className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600  transition"
        >
          Browse Artifacts
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
