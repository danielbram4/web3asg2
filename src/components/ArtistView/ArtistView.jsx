import React, { useState, useEffect } from "react";
import PaintingsList from "../GalleryView/PaintingList"; // Reuse your existing component
import ArtistList from "./ArtistList";
import ArtistDetails from "./ArtistDetails";

function ArtistView({ artists, paintings, favourites, setFavourites }) {
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);

  // When the selected artist ID changes, update the selected artist details
  useEffect(() => {
    if (selectedArtistId) {
      const found = artists.find((a) => a.artistId === selectedArtistId);
      setSelectedArtist(found);
    } else {
      setSelectedArtist(null);
    }
  }, [selectedArtistId, artists]);

  // Handler for selecting an artist
  const handleSelectArtist = (id) => {
    setSelectedArtistId(id);
  };

  // Filter paintings to those by the selected artist
  const filteredPaintings = selectedArtistId
    ? paintings.filter((p) => p.artistId === selectedArtistId)
    : [];

  return (
    <div className="bg-gray-800 text-gray-100 h-full flex flex-col">
      <main className="grid grid-cols-3 gap-4 flex-grow p-4 h-full overflow-hidden min-h-0">
        <ArtistList artists={artists} onSelectArtist={handleSelectArtist} selectedArtistId={selectedArtistId} />
        <ArtistDetails selectedArtist={selectedArtist} favourites={favourites} setFavourites={setFavourites}/>
        <PaintingsList paintings={filteredPaintings} artists={artists} favourites={favourites} setFavourites={setFavourites}/>
      </main>
    </div>
  );
}

export default ArtistView;