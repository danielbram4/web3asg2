import React from "react";

function GenreDetails({ selectedGenre, eras, favourites, setFavourites }) {
  if (!selectedGenre) {
    return (
      <section className="flex items-center justify-center h-full bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 rounded-xl shadow-lg">
        <p className="text-xl">Select a genre to view details</p>
      </section>
    );
  }

  const {
    genreName,
    genreId,
    description,
    genreLink,
    eraId,
  } = selectedGenre;

  const matchedEra = eras.find(e => e.eraId === eraId);

  return (
    <section className="p-6 flex flex-col gap-6 h-full overflow-auto bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-lg">
      <header className="pb-3 border-b border-gray-600">
        <h2 className="text-4xl font-bold text-white tracking-wide">
          {genreName}
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-5">
        {/* Era */}
        <div className="p-4 bg-gray-600/70 rounded-lg shadow-md">
          <h4 className="text-xs uppercase tracking-widest text-gray-400">🎨 Era</h4>
          {matchedEra ? (
            <>
              <p className="text-lg font-semibold text-gray-200 mt-1">{matchedEra.eraName}</p>
              <p className="text-md text-gray-300">{matchedEra.eraYears}</p>
            </>
          ) : (
            <p className="text-lg font-semibold text-gray-200 mt-1">Unknown Era</p>
          )}
        </div>

        {/* Description */}
        <div className="p-4 bg-gray-600/70 rounded-lg shadow-md">
          <h4 className="text-xs uppercase tracking-widest text-gray-400">
            📝 Description
          </h4>
          <p className="text-lg font-semibold text-gray-200 mt-1">
            {description || "No description available."}
          </p>
        </div>

        {/* Genre Image */}
        <div className="h-[350px] w-full rounded-xl shadow-md border-4 border-gray-600">
          {genreId ? (
            <img
              src={`/art-images/genres/${genreId}.jpg`}
              alt={`${genreName}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-gray-500 text-gray-200">
              No Image Available
            </div>
          )}
        </div>

        {/* Genre Link */}
        {genreLink && (
          <div className="p-4 bg-gray-600/70 rounded-lg shadow-md">
            <h4 className="text-xs uppercase tracking-widest text-gray-400">
              🌐 More Info
            </h4>
            <a
              href={genreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-indigo-300 hover:text-indigo-400 hover:underline break-words mt-1 inline-block"
            >
              {genreLink}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export default GenreDetails;