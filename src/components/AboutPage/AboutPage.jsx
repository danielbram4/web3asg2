import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 min-h-screen flex items-center justify-center">
      <main className="w-full p-8">
        <div className="max-w-3xl bg-gray-900 bg-opacity-90 p-10 rounded-lg shadow-2xl mx-auto transform transition duration-300 hover:scale-105">
          <h1 className="text-5xl font-bold mb-8 text-center text-indigo-400 tracking-wide">
            About This Project
          </h1>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Welcome to our project! This single-page application is crafted with React and Vite, delivering a seamless and interactive user experience. It serves as a dynamic showcase for an extensive collection of art data.
            </p>
            <p>
              The platform integrates comprehensive details about galleries, artists, genres, and paintings, all sourced directly from Supabase. It leverages modern web development practices, including RESTful API integration, client-side routing with React Router, dynamic state management, and responsive design with Tailwind CSS.
            </p>
            <p>
              Designed with both aesthetics and functionality in mind, the application offers an intuitive navigation experience. Users can explore various art categories and easily save their favorites for quick access.
            </p>
            <p>
              Developed for COMP 4513 - Web 3, this project also serves as a portfolio piece, showcasing advanced skills in React, API integration, and contemporary UI/UX design principles.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;