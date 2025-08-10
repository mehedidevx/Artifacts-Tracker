import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Contact = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <motion.div
        className="max-w-3xl text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-500">
          Contact Us
        </h1>
        <p className="text-lg mb-8">
          Feel free to reach out! We're always open to discussions, suggestions,
          or collaborations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            whileHover={{ scale: 1.05 }}
          >
            <FiMail className="text-4xl mx-auto text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-sm">mehedi.devx@gmail.com</p>
          </motion.div>

          {/* Phone */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            whileHover={{ scale: 1.05 }}
          >
            <FiPhone className="text-4xl mx-auto text-pink-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-sm">+880 1234-567890</p>
          </motion.div>

          {/* Address */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            whileHover={{ scale: 1.05 }}
          >
            <FiMapPin className="text-4xl mx-auto text-red-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <p className="text-sm">Debiganj, Panchagarh, Bangladesh</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
