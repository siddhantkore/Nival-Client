import { useState } from "react";
import { Link } from "react-router-dom";
import BusinessForm from "../pages/Business/Business";

function Footer() {
    const [email, setEmail] = useState("");
    const [showBusinessForm, setShowBusinessForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            return alert("Please enter a valid email address.");
        }
        // Email subscription can be implemented later
        alert("Thank you for subscribing!");
        setEmail("");
    };

    return (
        <footer className="bg-gray-900 text-gray-200 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
                            <li><Link to="/services" className="hover:text-blue-400 transition">Services</Link></li>
                            <li><Link to="/work" className="hover:text-blue-400 transition">Work</Link></li>
                            <li><Link to="/blogs" className="hover:text-blue-400 transition">Blogs</Link></li>
                            <li><Link to="/careers" className="hover:text-blue-400 transition">Careers</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
                            <li>
                                <button
                                    onClick={() => setShowBusinessForm(true)}
                                    className="hover:text-blue-400 transition text-left"
                                >
                                    Business
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
                        <ul className="space-y-2">
                            <li><Link to="/services" className="hover:text-blue-400 transition">CI/CD & Automation</Link></li>
                            <li><Link to="/services" className="hover:text-blue-400 transition">Cloud Infrastructure</Link></li>
                            <li><Link to="/services" className="hover:text-blue-400 transition">DevOps Consulting</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
                        <p className="text-sm text-gray-400 mb-4">Subscribe to get updates on DevOps best practices and tips.</p>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <input
                                type="email"
                                required
                                placeholder="Your email"
                                className="px-3 py-2 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition font-medium"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
                    &copy; 2025 Nival Cloud Solutions. All rights reserved. Made with ❤️ for startups and enterprises.
                </div>
            </div>
            {showBusinessForm && (
                <BusinessForm onClose={() => setShowBusinessForm(false)} />
            )}
        </footer>
    );
}

export default Footer;