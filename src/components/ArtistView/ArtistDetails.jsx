import React from "react";

// Component: Artist Details (Middle Column)
function ArtistDetails({ selectedArtist, favourites, setFavourites }) {
    if (!selectedArtist) {
      return (
        <section className="flex items-center justify-center h-full bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 rounded-xl shadow-lg">
          <p className="text-xl">Select an artist to view details</p>
        </section>
      );
    }

    const handleAddToFavorites = (selectedArtist) => {
      setFavourites((prevFavourites) => {
        if (
          selectedArtist &&
          !prevFavourites.find((a) => a.artistId === selectedArtist.artistId && !a.paintingId)
        ) {
          console.log('Adding to favorites:', selectedArtist);
          return [...prevFavourites, selectedArtist];
        }
        console.log('Already in favorites:', selectedArtist);
        return prevFavourites;
      });
    }
  
    // Destructure properties; adjust field names as needed
    const {
      artistId,
      firstName,
      lastName,
      nationality,
      yearOfBirth,
      yearOfDeath,
      artistImage,
      gender,
      details,
    } = selectedArtist;
  
    return (
      <section className="p-6 flex flex-col gap-6 h-full overflow-auto bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-lg">
        <header className="pb-3 border-b border-gray-600">
          <h2 className="text-4xl font-bold text-white tracking-wide">
            {firstName} {lastName}
          </h2>
        </header>
  
        <div className="grid grid-cols-1 gap-5">
          <div className="p-4 bg-gray-600/70 rounded-lg shadow-md">
            <h4 className="text-xs uppercase tracking-widest text-gray-400">Birth - Death</h4>
            <p className="text-lg font-semibold text-gray-200 mt-1">
              {yearOfBirth} - {yearOfDeath}
            </p>
          </div>
          <div className="p-4 bg-gray-600/70 rounded-lg shadow-md">
            <h4 className="text-xs uppercase tracking-widest text-gray-400">Nationality</h4>
            <p className="text-lg font-semibold text-gray-200 mt-1">
              {nationality || "N/A"}
            </p>
          </div>
          <div className="p-4 bg-gray-600/70 rounded-lg shadow-md">
            <h4 className="text-xs uppercase tracking-widest text-gray-400">Gender</h4>
            <p className="text-lg font-semibold text-gray-200 mt-1">
              {gender || "N/A"}
            </p>
          </div>
          <div className="p-4 bg-gray-600/70 rounded-lg shadow-md">
            <h4 className="text-xs uppercase tracking-widest text-gray-400">Details</h4>
            <p className="text-lg font-semibold text-gray-200 mt-1">
              {details || "No details available."}
            </p>
          </div>
        </div>
  
        <div className="h-[350px] w-full rounded-xl shadow-md border-4 border-gray-600">
          {artistId ? (
            <img
              src={`/art-images/artists/square/${artistId}.jpg`}
              alt={`${firstName} ${lastName}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-gray-500 text-gray-200">
              No Image Available
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            handleAddToFavorites(selectedArtist)
          }}
          className="w-max px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md transition duration-200 transform hover:scale-105 active:scale-95"
        >
          ❤️ Add to Favorites
        </button>
      </section>
    );
  }

export default ArtistDetails;