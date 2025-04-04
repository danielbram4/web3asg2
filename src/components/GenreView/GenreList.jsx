import React from "react";

function GenreList({ genres, onSelectGenre, selectedGenreId }) {
    const sortedGenres = [...genres].sort((a, b) =>
      a.genreName.localeCompare(b.genreName)
    );
  
    return (
      <aside className="flex flex-col h-full border border-gray-500 bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-xl shadow-lg overflow-hidden">
        <h2 className="text-3xl font-bold mb-4 text-white tracking-wide">Genres</h2>
        <div className="flex-grow overflow-y-auto px-2 pb-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
          <ul className="space-y-3">
            {sortedGenres.map((genre) => (
              <li key={genre.genreId}>
                <button
                  type="button"
                  onClick={() => onSelectGenre(genre.genreId)}
                  className={`block w-full text-left px-4 py-3
                    bg-gray-600/80 hover:bg-indigo-600 hover:text-white
                    rounded-lg shadow-md transform transition duration-200
                    hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                    focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-800
                    ${selectedGenreId === genre.genreId ? "bg-indigo-600" : ""}`}
                >
                  {genre.genreName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    );
  }

  export default GenreList;