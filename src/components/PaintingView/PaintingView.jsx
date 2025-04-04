import React, { useState, useMemo } from "react";
import PaintingFilter from "./PaintingFilter";
import PaintingDisplay from "./PaintingDisplay";

function PaintingView({ paintings, artists, galleries, favourites, setFavourites }) {
  // State for the filters
  const [filterType, setFilterType] = useState("");  // e.g. "title", "artist", "gallery", "yearLess", "yearGreater"
  const [filterValue, setFilterValue] = useState(""); // The user’s search/entry
  const [sortBy, setSortBy] = useState("title"); // "title", "artist", "gallery", or "year"
  const [sortOrder, setSortOrder] = useState("asc");

  // Filter the paintings based on filterType and filterValue
  const filteredPaintings = useMemo(() => {
    if (!filterType || !filterValue) return paintings;

    return paintings.filter((p) => {
      switch (filterType) {
        case "title":
          return p.title.toLowerCase().includes(filterValue.toLowerCase());
        case "artist":
          // Suppose painting has an artistId and we have an artists array
          // We can match the artist’s name or ID
          const artist = artists.find((a) => a.artistId === p.artistId);
          return artist && artist.firstName.toLowerCase().includes(filterValue.toLowerCase());
        case "gallery":
          // Suppose painting has a galleryId and we have a galleries array
          const gallery = galleries.find((g) => g.galleryId === p.galleryId);
          return gallery && gallery.galleryName.toLowerCase().includes(filterValue.toLowerCase());
        case "yearLess":
          return parseInt(p.yearOfWork) < parseInt(filterValue);
        case "yearGreater":
          return parseInt(p.yearOfWork) > parseInt(filterValue);
        default:
          return true;
      }
    });
  }, [paintings, filterType, filterValue, artists, galleries]);

  // Sort paintings based on the sortBy field and sortOrder.
  const sortedPaintings = useMemo(() => {
    return [...filteredPaintings].sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "artist": {
          const aArtist = artists.find(
            (artist) => artist.artistId === a.artistId
          );
          const bArtist = artists.find(
            (artist) => artist.artistId === b.artistId
          );
          aValue = aArtist ? `${aArtist.firstName} ${aArtist.lastName}`.toLowerCase() : "";
          bValue = bArtist ? `${bArtist.firstName} ${bArtist.lastName}`.toLowerCase() : "";
          break;
        }
        case "gallery": {
          const aGallery = galleries.find((g) => g.galleryId === a.galleryId);
          const bGallery = galleries.find((g) => g.galleryId === b.galleryId);
          aValue = aGallery ? aGallery.galleryName.toLowerCase() : "";
          bValue = bGallery ? bGallery.galleryName.toLowerCase() : "";
          break;
        }
        case "year":
          aValue = parseInt(a.yearOfWork);
          bValue = parseInt(b.yearOfWork);
          break;
        default:
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredPaintings, sortBy, sortOrder, artists, galleries]);

  // Handler for clearing the filters
  const handleClearFilters = () => {
    setFilterType("");
    setFilterValue("");
    setSortBy("title");
    setSortOrder("asc");
  };

  return (
    <div className="h-full flex flex-col bg-gray-800">
      <PaintingFilter
        filterType={filterType}
        setFilterType={setFilterType}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onClear={handleClearFilters}
      />
      {/* Ensure the painting display area scrolls if content overflows */}
      <div className="flex-grow overflow-auto">
        <PaintingDisplay
          paintings={sortedPaintings}
          artists={artists}
          galleries={galleries}
          favourites={favourites}
          setFavourites={setFavourites}
        />
      </div>
    </div>
  );
}

export default PaintingView;