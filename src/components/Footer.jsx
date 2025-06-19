import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-10 ">
      <div className="container  mx-auto px-4 grid md:flex justify-between  grid-cols-1 md:grid-cols-3 gap-8 text-sm">

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p className="flex items-center gap-2">
            <FiMail /> support@artifact.com
          </p>
          <p className="flex items-center gap-2 mt-2">
            <FiPhone /> +880 1234 567 890
          </p>
          <p className="flex items-center gap-2 mt-2">
            <FiMapPin /> Panchagarh, Bangladesh
          </p>
        </div>

        {/* Terms & About */}
        <div className="">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/terms" className="hover:text-purple-400">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-purple-400">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-purple-400">About Us</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-400">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-300">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-500">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} ArtiFacts. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
