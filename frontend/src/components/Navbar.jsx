import { useState } from "react";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import clsx from "clsx";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900/90 backdrop-blur-md shadow-lg z-50 border-b border-emerald-800/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
          >
            Swiftly
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm font-medium"
              >
                Home
              </Link>
              
              {user && (
                <Link
                  to="/cart"
                  className="relative flex items-center gap-1.5 text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm font-medium"
                >
                  <ShoppingCart className="h-5 w-5" />
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
                  className="flex items-center gap-1.5 text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm font-medium"
                >
                  <Lock className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              )}
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <button
                  onClick={logout}
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
                  >
                    <UserPlus className="h-5 w-5" />
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
                  >
                    <LogIn className="h-5 w-5" />
                    Login
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-4">
            {user && (
              <Link to="/cart" className="relative text-gray-300 hover:text-emerald-400">
                <ShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-emerald-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-emerald-400 p-2 rounded-lg transition-colors duration-200"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={clsx(
            "md:hidden overflow-hidden transition-all duration-300 ease-out",
            isMenuOpen ? "max-h-96" : "max-h-0"
          )}
        >
          <nav className="flex flex-col gap-2 pb-4 px-4">
            <Link
              to="/"
              className="text-gray-300 hover:text-emerald-400 py-2 px-3 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {user && (
              <Link
                to="/cart"
                className="flex items-center justify-between text-gray-300 hover:text-emerald-400 py-2 px-3 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Cart</span>
                {cart.length > 0 && (
                  <span className="bg-emerald-500 text-white rounded-full text-xs px-2 py-1">
                    {cart.length} items
                  </span>
                )}
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="text-gray-300 hover:text-emerald-400 py-2 px-3 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 text-gray-300 hover:text-emerald-400 py-2 px-3 rounded-md transition-colors duration-200 text-left"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="flex items-center gap-3 text-gray-300 hover:text-emerald-400 py-2 px-3 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserPlus className="h-5 w-5" />
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="flex items-center gap-3 text-gray-300 hover:text-emerald-400 py-2 px-3 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-5 w-5" />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
