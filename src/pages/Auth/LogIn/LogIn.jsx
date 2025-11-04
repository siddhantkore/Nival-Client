import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogIn() {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const [status, setStatus] = useState("");


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name.toLowerCase()]: value
        }));
    }

    const loginSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Store token
                if (data.token) {
                    localStorage.setItem("token", data.token);
                }
                
                // Check if user is admin
                if (data.data?.user?.role === "admin") {
                    setStatus("Log In Successful! Redirecting...");
                    setTimeout(() => {
                        navigate("/admin");
                    }, 1000);
                } else {
                    setStatus("Log In Successful! Redirecting...");
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                }
            } else {
                throw new Error(data.message || "Invalid Credentials");
            }

            console.log(data);

        } catch (error) {
            setStatus(`Log In failed: ${error.message}`);
            console.log(`${error.message}`)
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-10 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-bold font-sans mb-6 text-center">Log In</h2>

                <form onSubmit={loginSubmit} className="flex flex-col gap-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-3 w-full font-semibold rounded-md hover:bg-blue-700 transition"
                    >
                        Log In
                    </button>
                </form>

                {status && <p className="mt-4 text-red-500 text-sm text-center">{status}</p>}

                <p className="text-sm text-center mt-6">
                    Don’t have an account?
                    <a href="#signup" className="text-blue-700 underline ml-1">Sign Up</a>
                </p>
            </div>
        </div>
    );

}

export default LogIn;
