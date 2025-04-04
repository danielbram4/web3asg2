import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white p-8">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Whoops! Looks like this page doesn’t exist.</p>

      {/* Image Wrapper */}
      <div className="w-96 max-w-full relative mb-6">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-lg animate-pulse">
            <svg
              className="animate-spin h-8 w-8 text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
        )}
        <img
          src="https://media1.tenor.com/m/rMxNr07CxSMAAAAd/cat-crazy-cat.gif"
          alt="Funny lost cat"
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full rounded-lg shadow-lg transition-opacity duration-500 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <p className="text-lg text-gray-300 mb-4">Even our cat couldn’t find it.</p>

      <Link to="/galleries">
        <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition transform hover:scale-105">
          🏠 Return Home
        </button>
      </Link>
    </div>
  );
}

export default NotFound;