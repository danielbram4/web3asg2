import React from "react";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Todo: Add authentication logic here
    console.log("Login successful, navigating to galleries route");
    navigate("/galleries");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?q=80&w=1964&auto=format&fit=crop')`,
      }}
    >
      {/* Form Container */}
      <div className="bg-gray-800/90 rounded-xl shadow-xl p-8 w-full max-w-md backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-white text-center mb-6">🔐 Welcome to Artisphere</h2>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-300 font-medium mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-300 font-medium mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="Enter your password"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg shadow-md transition transform hover:scale-105 active:scale-95"
            >
              Login
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-gray-200 py-2 rounded-lg shadow-md transition transform hover:scale-105 active:scale-95"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      {/* Footer Credit */}
      <footer className="mt-8 text-xs text-gray-300 italic">
        Background image via Unsplash
      </footer>
    </div>
  );
};

export default LoginPage;