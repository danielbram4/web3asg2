import React, { useState, useEffect } from "react";
import GenreList from "./GenreList"; // Import your new component
import GenreDetails from "./GenreDetails"; // Import your new component
import PaintingsList from "../GalleryView/PaintingList"; // Reuse your existing component

function GenreView({ genres, paintings, artists, favourites, setFavourites, paintinggenres, eras }) {
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    if (selectedGenreId) {
      const found = genres.find((g) => g.genreId === selectedGenreId);
      setSelectedGenre(found);
    } else {
      setSelectedGenre(null);
    }
  }, [selectedGenreId, genres]);

  const handleSelectGenre = (id) => {
    setSelectedGenreId(id);
  };

  const filteredPaintings = selectedGenreId
  ? paintings.filter(p =>
      paintinggenres
        .filter(pg => pg.genreId === selectedGenreId)
        .some(pg => pg.paintingId === p.paintingId)
    )
  : [];

  return (
    <div className="bg-gray-800 text-gray-100 h-full flex flex-col">
      <main className="grid grid-cols-3 gap-4 flex-grow p-4 h-full overflow-hidden min-h-0">
        <GenreList genres={genres} onSelectGenre={handleSelectGenre} selectedGenreId={selectedGenreId} />
        <GenreDetails selectedGenre={selectedGenre} eras={eras} favourites={favourites} setFavourites={setFavourites}/>
        <PaintingsList paintings={filteredPaintings} artists={artists} favourites={favourites} setFavourites={setFavourites}/>
      </main>
    </div>
  );
}

export default GenreView;