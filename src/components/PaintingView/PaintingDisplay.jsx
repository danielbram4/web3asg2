import React, { useState } from "react";
import PaintingPopup from "../PaintingPopup/PaintingPopup";

function PaintingDisplay({ paintings, artists, galleries, favourites, setFavourites }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState(null);

  const handleRowClick = (paintingId) => {
    const painting = paintings.find((p) => p.paintingId === paintingId);
    const artist = artists.find((a) => a.artistId === painting.artistId);
    setSelectedPainting({
      ...painting,
      artistName: artist ? `${artist.firstName} ${artist.lastName}` : "Unknown Artist",
    });
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPainting(null);
  };

  const handleAddToFavorites = (paintingId) => {
    const painting = paintings.find((p) => p.paintingId === paintingId);
    if (painting && !favourites.find((p) => p.paintingId === paintingId)) {
      setFavourites([...favourites, painting]);
    }
  };

  return (
    <>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paintings.length > 0 ? (
          paintings.map((painting) => {
            const artist = artists.find(
              (artist) => artist.artistId === painting.artistId
            );
            const gallery = galleries.find(
              (g) => g.galleryId === painting.galleryId
            );
            return (
              <div
                key={painting.paintingId}
                className="bg-gray-700 p-4 rounded shadow cursor-pointer hover:bg-gray-600"
                onClick={() => handleRowClick(painting.paintingId)}
              >
                <img
                  src={painting.thumbnailUrl}
                  alt={painting.title}
                  className="w-full h-48 object-cover rounded"
                />
                <div className="mt-2 text-white">
                  <h3 className="text-lg font-semibold">{painting.title}</h3>
                  <p className="text-sm">
                    Artist:{" "}
                    {artist
                      ? `${artist.firstName} ${artist.lastName}`
                      : "Unknown"}
                  </p>
                  <p className="text-sm">Year: {painting.yearOfWork}</p>
                  <p className="text-sm">
                    Gallery: {gallery ? gallery.galleryName : "Unknown"}
                  </p>
                  <p className="text-sm">Medium: {painting.medium}</p>
                  <p className="text-sm">
                    Dimensions: {painting.width} x {painting.height}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-white text-center">No paintings found.</div>
        )}
      </div>
      {/* Popup is rendered outside of the map so that only one instance is active */}
      <PaintingPopup
        painting={selectedPainting}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onAddToFavorites={handleAddToFavorites}
      />
    </>
  );
}

export default PaintingDisplay;