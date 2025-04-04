import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Marker icon fix (for CRA/Vite/Webpack):
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Helper component to dynamically update the map position
function UpdateMapCenter({ latitude, longitude }) {
  const map = useMap();
  useEffect(() => {
    map.setView([latitude, longitude], 14);
  }, [latitude, longitude, map]);
  return null;
}

function GalleryDetails({ selectedGallery, favourites, setFavourites }) {
  if (!selectedGallery) {
    return (
      <section className="flex items-center justify-center h-full bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 rounded-xl shadow-lg">
        <p className="text-xl">Select a gallery to view details</p>
      </section>
    );
  }

  const handleAddToFavorites = (selectedGallery) => {
    if (selectedGallery && !favourites.find((g) => g.galleryId === selectedGallery.galleryId)) {
      setFavourites([...favourites, selectedGallery]);
    }
  }

  const {
    galleryName,
    galleryNativeName,
    galleryCity,
    galleryAddress,
    galleryCountry,
    galleryWebSite,
    latitude,
    longitude,
  } = selectedGallery;

  return (
    <section className="p-6 flex flex-col gap-6 h-full overflow-auto bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-lg">
      <header className="pb-3 border-b border-gray-600">
        <h2 className="text-4xl font-bold text-white tracking-wide">{galleryName}</h2>
        {galleryNativeName && (
          <h3 className="text-xl text-gray-300 italic tracking-wide mt-1">{galleryNativeName}</h3>
        )}
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="p-4 bg-gray-600/70 rounded-lg shadow-md">
          <h4 className="text-xs uppercase tracking-widest text-gray-400">📍 Location</h4>
          <p className="text-lg font-semibold text-gray-200 mt-1">
            {galleryCity}, {galleryCountry}
          </p>
        </div>

        <div className="p-4 bg-gray-600/70 rounded-lg shadow-md">
          <h4 className="text-xs uppercase tracking-widest text-gray-400">🏠 Address</h4>
          <p className="text-lg font-semibold text-gray-200 mt-1">{galleryAddress}</p>
        </div>

        {galleryWebSite && (
          <div className="sm:col-span-2 p-4 bg-gray-600/70 rounded-lg shadow-md">
            <h4 className="text-xs uppercase tracking-widest text-gray-400">🌐 Website</h4>
            <a
              href={galleryWebSite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-indigo-300 hover:text-indigo-400 hover:underline break-words mt-1 inline-block"
            >
              {galleryWebSite}
            </a>
          </div>
        )}
      </div>

      <button
        type="button"
        className="w-max px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md transition duration-200 transform hover:scale-105 active:scale-95"
        onClick={() => {
          handleAddToFavorites(selectedGallery);
        }}
      >
        ❤️ Add to Favorites
      </button>

      <div className="h-[350px] w-full rounded-xl shadow-md overflow-hidden border-4 border-gray-600">
        <MapContainer
          center={[latitude, longitude]}
          zoom={14}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              <strong>{galleryName}</strong><br />
              {galleryAddress}, {galleryCity}
            </Popup>
          </Marker>
          <UpdateMapCenter latitude={latitude} longitude={longitude} />
        </MapContainer>
      </div>
    </section>
  );
}

export default GalleryDetails;