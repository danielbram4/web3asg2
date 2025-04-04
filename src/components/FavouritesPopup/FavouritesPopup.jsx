import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function FavouritesPopup({ isOpen, onClose, favourites = [], removeFavourite, clearFavourites }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-gray-800 rounded-xl p-8 shadow-xl max-w-3xl w-full mx-4 my-12 relative overflow-y-auto max-h-[90vh]"
      overlayClassName="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-gray-400 hover:text-white text-3xl font-bold focus:outline-none"
        aria-label="Close"
      >
        &times;
      </button>

      <h2 className="text-3xl font-bold text-white mb-6">❤️ Your Favourites</h2>

      {favourites.length === 0 ? (
        <p className="text-gray-400">You haven't added any favourites yet.</p>
      ) : (
        <ul className="space-y-3">
          {favourites.map((item, index) => {
            let label = 'Unknown Item';
            if (item.paintingId) {
              label = `🖼️ Painting: ${item.title}`;
            } else if (item.galleryId) {
              label = `🏛️ Gallery: ${item.galleryName}`;
            } else if (item.artistId) {
              label = `👨‍🎨 Artist: ${item.firstName} ${item.lastName}`;
            }

            return (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-700 p-3 rounded-md"
              >
                <span className="text-gray-200 font-medium">{label}</span>
                <button
                  onClick={() => removeFavourite(item)}
                  className="text-sm text-red-400 hover:text-red-500"
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Footer Buttons */}
      <div className="flex justify-end mt-6 gap-4">
        {favourites.length > 0 && (
          <button
            onClick={clearFavourites}
            className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Clear All
          </button>
        )}
        <button
          onClick={onClose}
          className="px-5 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}

export default FavouritesPopup;