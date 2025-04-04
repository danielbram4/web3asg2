import React, { useState, useEffect } from 'react';
import GalleryList from './GalleryList';
import GalleryDetails from './GalleryDetails';
import PaintingsList from './PaintingList';

function GalleryView({ galleries, paintings, artists, favourites, setFavourites }) {
  const [selectedGalleryId, setSelectedGalleryId] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);

  useEffect(() => {
    if (selectedGalleryId) {
        const found = galleries.find(g => g.galleryId === selectedGalleryId);
        setSelectedGallery(found);
    } else {
        setSelectedGallery(null);
    }
  }, [selectedGalleryId, galleries]);

  const handleSelectGallery = (id) => {
    setSelectedGalleryId(id);
  };

  const filteredPaintings = selectedGalleryId 
    ? paintings.filter(p => p.galleryId === selectedGalleryId)
    : [];

  return (
    <div className="bg-gray-800 text-gray-100 h-full flex flex-col">
      <main className="grid grid-cols-3 gap-4 flex-grow p-4 overflow-hidden min-h-0">
        <GalleryList galleries={galleries} onSelectGallery={handleSelectGallery} selectedGalleryId={selectedGalleryId} />
        <GalleryDetails selectedGallery={selectedGallery} favourites={favourites} setFavourites={setFavourites} />
        <PaintingsList paintings={filteredPaintings} artists={artists} favourites={favourites} setFavourites={setFavourites} />
      </main>
    </div>
  );
}

export default GalleryView;