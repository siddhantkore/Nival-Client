import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-900 text-gray-100 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0 text-xl font-bold tracking-tight text-blue-400 hover:text-blue-300 transition">
            Nival Cloud Solutions
          </Link>
          <ul className="hidden md:flex space-x-8 text-sm font-medium">
            <li>
              <Link to="/" className={`hover:text-blue-400 transition ${isActive('/') ? 'text-blue-400' : ''}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className={`hover:text-blue-400 transition ${isActive('/services') ? 'text-blue-400' : ''}`}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/work" className={`hover:text-blue-400 transition ${isActive('/work') ? 'text-blue-400' : ''}`}>
                Work
              </Link>
            </li>
            <li>
              <Link to="/blogs" className={`hover:text-blue-400 transition ${isActive('/blogs') ? 'text-blue-400' : ''}`}>
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/careers" className={`hover:text-blue-400 transition ${isActive('/careers') ? 'text-blue-400' : ''}`}>
                Careers
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`hover:text-blue-400 transition ${isActive('/contact') ? 'text-blue-400' : ''}`}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/forsale" className={`hover:text-blue-400 transition ${isActive('/forsale') ? 'text-blue-400' : ''}`}>
                For Sale
              </Link>
            </li>
          </ul>
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-100 hover:text-blue-400 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <ul className="space-y-3">
              <li>
                <Link to="/" className="block hover:text-blue-400 transition" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="block hover:text-blue-400 transition" onClick={() => setMobileMenuOpen(false)}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/work" className="block hover:text-blue-400 transition" onClick={() => setMobileMenuOpen(false)}>
                  Work
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="block hover:text-blue-400 transition" onClick={() => setMobileMenuOpen(false)}>
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/careers" className="block hover:text-blue-400 transition" onClick={() => setMobileMenuOpen(false)}>
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="block hover:text-blue-400 transition" onClick={() => setMobileMenuOpen(false)}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/forsale" className="block hover:text-blue-400 transition" onClick={() => setMobileMenuOpen(false)}>
                  For Sale
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;

