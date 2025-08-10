import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center px-4">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-500">
          About ArtifactTracker
        </h1>

        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Welcome to <span className="font-semibold">ArtifactTracker</span> — a platform built for history enthusiasts, collectors, and researchers. We help you manage, explore, and preserve the stories behind historical artifacts from around the world.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-bold mb-2 text-purple-500">
              Our Mission
            </h3>
            <p className="text-sm text-black">
              Making history preservation simple, accessible, and meaningful for everyone — from hobbyists to professionals.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-bold mb-2 text-pink-500">
              What We Offer
            </h3>
            <p className="text-sm text-black">
              Easily add, track, and manage artifacts. Explore others' collections and collaborate with a global community.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-bold mb-2 text-red-500">
              Why ArtifactTracker?
            </h3>
            <p className="text-sm text-black">
              We believe every artifact holds a story worth preserving — for education, culture, and future generations.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
