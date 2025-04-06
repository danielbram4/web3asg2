import React, { useState, useMemo } from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import PaintingPopup from '../PaintingPopup/PaintingPopup';

function PaintingsList({ paintings, artists, favourites, setFavourites }) {
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState(null);

  const sortedPaintings = useMemo(() => {
    return [...paintings].sort((a, b) => {
      let compareVal = 0;
      if (sortField === 'title') {
        compareVal = a.title.localeCompare(b.title);
      } else if (sortField === 'artist') {
        const artistA = artists.find((art) => art.artistId === a.artistId);
        const artistB = artists.find((art) => art.artistId === b.artistId);
        const nameA = artistA ? `${artistA.firstName} ${artistA.lastName}` : '';
        const nameB = artistB ? `${artistB.firstName} ${artistB.lastName}` : '';
        compareVal = nameA.localeCompare(nameB);
      } else if (sortField === 'year') {
        compareVal = a.yearOfWork - b.yearOfWork;
      }
      return sortDirection === 'asc' ? compareVal : -compareVal;
    });
  }, [paintings, artists, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleRowClick = (paintingId) => {
    const painting = paintings.find(p => p.paintingId === paintingId);
    const artist = artists.find(a => a.artistId === painting.artistId);
    setSelectedPainting({
      ...painting,
      artistName: artist ? `${artist.firstName} ${artist.lastName}` : 'Unknown Artist'
    });
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPainting(null);
  };

  const handleAddToFavorites = (paintingId) => {
    const painting = paintings.find(p => p.paintingId === paintingId);
    setFavourites((prevFavourites) => {
      if (painting && !prevFavourites.find(p => p.paintingId === paintingId)) {
        return [...prevFavourites, painting];
      }
      return prevFavourites;
    });
  };

  return (
    <section className="flex flex-col h-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-500">
      <div className="p-4 border-b border-gray-600">
        <h2 className="text-3xl font-bold text-white tracking-wide">Paintings</h2>
      </div>

      <div className="flex-grow overflow-y-auto px-4 pb-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-gray-200 uppercase text-sm tracking-wider border-b border-gray-600">
              <th
                className="px-3 py-2 cursor-pointer text-left"
                onClick={() => handleSort('title')}
              >
                Title
                {sortField === 'title' &&
                  (sortDirection === 'asc' ? (
                    <AiOutlineArrowUp className="inline ml-1" />
                  ) : (
                    <AiOutlineArrowDown className="inline ml-1" />
                  ))}
              </th>
              <th
                className="px-3 py-2 cursor-pointer text-left"
                onClick={() => handleSort('artist')}
              >
                Artist
                {sortField === 'artist' &&
                  (sortDirection === 'asc' ? (
                    <AiOutlineArrowUp className="inline ml-1" />
                  ) : (
                    <AiOutlineArrowDown className="inline ml-1" />
                  ))}
              </th>
              <th
                className="px-3 py-2 cursor-pointer text-left"
                onClick={() => handleSort('year')}
              >
                Year
                {sortField === 'year' &&
                  (sortDirection === 'asc' ? (
                    <AiOutlineArrowUp className="inline ml-1" />
                  ) : (
                    <AiOutlineArrowDown className="inline ml-1" />
                  ))}
              </th>
              <th className="px-3 py-2 text-center">Thumbnail</th>
            </tr>
          </thead>

          <tbody>
            {sortedPaintings.map((p) => (
              <tr
                key={p.paintingId}
                className="hover:bg-indigo-600/40 cursor-pointer transition duration-150 border-b border-gray-600"
                // onClick={() => onSelectPainting?.(p.paintingId)}
                onClick={() => handleRowClick(p.paintingId)}
              >
                <td className="px-3 py-2 text-gray-200">{p.title}</td>
                <td className="px-3 py-2 text-gray-200">
                  {(() => {
                    const artist = artists.find((a) => a.artistId === p.artistId);
                    return artist
                      ? `${artist.firstName} ${artist.lastName}`
                      : 'Unknown Artist';
                  })()}
                </td>
                <td className="px-3 py-2 text-gray-200">{p.yearOfWork}</td>
                <td className="px-3 py-2 text-center">
                  <a
                    href={p.museumLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={p.thumbnailUrl}
                      alt={p.title}
                      className="h-12 w-auto inline rounded-md shadow-sm transform transition duration-150 hover:scale-110"
                    />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
          
          <PaintingPopup
            painting={selectedPainting}
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
            onAddToFavorites={handleAddToFavorites}
          />
        </table>

        {paintings.length === 0 && (
          <p className="text-gray-300 text-center mt-6">No paintings found.</p>
        )}
      </div>
    </section>
  );
}

export default PaintingsList;