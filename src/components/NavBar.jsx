import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMenu, FiHeart } from 'react-icons/fi';
import FavouritesPopup from './FavouritesPopup/FavouritesPopup';

function NavBar ({ favourites, setFavourites }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFavouritesOpen, setIsFavouritesOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMenuOpen(false);
    setIsFavouritesOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false);
    setIsFavouritesOpen(false);
  };

  const handleFavouritesToggle = () => {
    setIsFavouritesOpen(!isFavouritesOpen);
    setIsSearchOpen(false);
    setIsMenuOpen(false);
  }

  return (
    <header className="flex items-center justify-between p-4 border-b shadow-sm relative bg-gray-800"> 
      {/* Left side: Logo (image) linking to home */}
      <div>
        <Link to="/" className="flex items-center">
          <img
            src="./src/assets/ArtisphereMinimalistic.png"
            alt="Artisphere Logo"
            className="h-auto w-45"
          />
        </Link>
      </div>

      {/* Right side: Menus */}
      <div className="flex items-center space-x-4">
        {/* Favourites Icon */}
        <button
          onClick={handleFavouritesToggle}
          className={`block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600 hover:text-white
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2
                  focus:ring-offset-gray-800 text-white ${
            favourites.length > 0 ? 'hover:bg-gray-200 cursor-pointer' : 'opacity-40 cursor-default'
          }`}
          aria-label="Favourites"
          disabled={favourites.length === 0}
        >
          <FiHeart size={20} />
        </button>
        {isFavouritesOpen && <FavouritesPopup isOpen={isFavouritesOpen} 
                                              favourites={favourites} 
                                              onClose={() => (setIsFavouritesOpen(false))}
                                              removeFavourite={(itemToRemove) =>
                                                setFavourites(prev => prev.filter(item => {
                                                  if (item.paintingId) return item.paintingId !== itemToRemove.paintingId;
                                                  if (item.galleryId) return item.galleryId !== itemToRemove.galleryId;
                                                  if (item.artistId) return item.artistId !== itemToRemove.artistId;
                                                  return true;
                                                }))}
                                              clearFavourites={() => setFavourites([])}/>}
        
        {/* Search Icon //Here for a future search implementation feature.
        <button
          onClick={handleSearchToggle}
          className="block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600 hover:text-white
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2
                  focus:ring-offset-gray-800 text-white"
          aria-label="Search"
        >
          <FiSearch size={20} />
        </button> */}

        {/* Hamburger Menu Icon */}
        <button
          onClick={handleMenuToggle}
          className="block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600 hover:text-white
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2
                  focus:ring-offset-gray-800 text-white"
          aria-label="Menu"
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* SEARCH DROPDOWN */}
      {isSearchOpen && (
        <div className="absolute top-full right-4 mt-2 bg-gray-800 text-black border shadow-md p-2 z-10">
          <input
            type="text"
            placeholder="Search..."
            className="block w-full 
                        px-4 py-2
                        bg-gray-600
                        hover:bg-gray-500
                        rounded-md
                        focus:outline-none
                        focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-700
                        transition-colors duration-150 ease-in-out text-white"
          />
        </div>
      )}

      {/* NAV MENU DROPDOWN */}
      {isMenuOpen && (
        <div className="absolute top-full right-4 mt-2 bg-gray-800 text-black border shadow-md p-2 z-10">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link
                to="/artists"
                className="block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2
                  focus:ring-offset-gray-800 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Artists
              </Link>
            </li>
            <li>
              <Link
                to="/paintings"
                className="block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2
                  focus:ring-offset-gray-800 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Paintings
              </Link>
            </li>
            <li>
              <Link
                to="/galleries"
                className="block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600 
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2
                  focus:ring-offset-gray-800 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Galleries
              </Link>
            </li>
            <li>
              <Link
                to="/genres"
                className="block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2
                  focus:ring-offset-gray-800 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Genres
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2
                  focus:ring-offset-gray-800 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2
                  focus:ring-offset-gray-800 text-red-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default NavBar;