import { useState } from "react";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 border-b border-emerald-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-emerald-400">
            Swiftly
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <Link
                to="/"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
              >
                Home
              </Link>
              {user && (
                <Link
                  to="/cart"
                  className="relative flex items-center gap-1 text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                >
                  <ShoppingCart size={20} />
                  <span>Cart</span>
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-3 bg-emerald-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/secret-dashboard"
                  className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-md transition-colors duration-200"
                >
                  <Lock size={18} />
                  <span>Dashboard</span>
                </Link>
              )}
            </nav>

            {/* Auth Buttons - Desktop */}
            <div className="flex items-center gap-4">
              {user ? (
                <button
                  onClick={logout}
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    <UserPlus size={18} />
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    <LogIn size={18} />
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-4">
            {user && (
              <Link to="/cart" className="relative text-gray-300 hover:text-emerald-400">
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-emerald-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md border-b border-emerald-800">
            <nav className="flex flex-col gap-4 p-4">
              <Link
                to="/"
                className="text-gray-300 hover:text-emerald-400 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {user && (
                <Link
                  to="/cart"
                  className="text-gray-300
