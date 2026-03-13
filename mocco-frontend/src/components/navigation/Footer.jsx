import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold">
              <Link to="/">Mocco Mart.</Link>
            </h3>
            <p className="text-gray-400 mt-4">Subscribe</p>
            <p className="text-gray-400 text-sm mb-4">
              Get 10% off your first order
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-900 text-sm outline-none placeholder-gray-500 rounded-l"
              />
              <button className="bg-red-600 px-4 py-2 rounded-r hover:bg-red-700 transition">
                Subscribe
              </button>
            </div>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4">Account</h5>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/my-profile">My Account</Link>
              </li>
              <li>
                <Link to="/login">Login / Register</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/wishlist">Wishlist</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-use">Terms of Use</Link>
              </li>
              <li>
                <Link to="/faqs">FAQ</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4">Download App</h5>
            <p className="text-gray-400 text-sm mb-4">
              Save $3 with App for new users
            </p>

            {/* <div className="flex gap-4 items-start">
              <img
                src="QR.jpg"
                alt="QR Code"
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex flex-col gap-2">
                <img src="googlePlay.png" alt="Google Play" className="w-28" />
                <img src="googlePlay.png" alt="App Store" className="w-28" />
              </div>
            </div> */}

            {/* Social Icons */}
            <div className="flex gap-4 mt-5 text-xl text-gray-300">
              <i className="bi bi-facebook hover:text-white cursor-pointer"></i>
              <i className="bi bi-instagram hover:text-white cursor-pointer"></i>
              <i className="bi bi-twitter hover:text-white cursor-pointer"></i>
              <i className="bi bi-youtube hover:text-white cursor-pointer"></i>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 text-center">
          <p className="text-center text-gray-500 mt-10 pt-5 border-t border-gray-700 text-sm">
            © {new Date().getFullYear()}
            <span className="font-medium">
              <Link to="/"> Mocco Mart. </Link>
            </span>
            All Rights Reserved.
          </p>
          {/* made with */}
          <p className="text-center text-gray-500 mt-2 text-sm">
            Made with <span className="text-red-500">♥</span> by{" "}
            <span className="font-medium">Masab Ashraf</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
