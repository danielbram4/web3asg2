// PaintingPopup.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function PaintingPopup({ painting, isOpen, onClose, onAddToFavorites }) {
  if (!painting) return null;

  const [imageLoading, setImageLoading] = useState(true);

  const {
    title,
    artistName,
    yearOfWork,
    medium,
    imageFileName,
    jsonAnnotations,
    width,
    height
  } = painting;

  // Explicitly parse JSON here
  let parsedAnnotations = {};
  try {
    parsedAnnotations = JSON.parse(jsonAnnotations);
  } catch (error) {
    console.error("Error parsing jsonAnnotations:", error);
  }

  const colors = parsedAnnotations?.dominantColors || [];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Painting Details"
      className="bg-gray-800 rounded-xl p-8 shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
      overlayClassName="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50"
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold"
      >
        &times;
      </button>

      <div className="flex flex-col gap-4 text-gray-200">
        {/* Title and Artist */}
        <div className="border-b border-gray-600 pb-3 mb-3">
            <h2 className="text-4xl font-bold text-white">{title}</h2>
            <p className="text-xl italic text-indigo-300 mt-1">{artistName}</p>
        </div>

        {/* Details (Year, Medium, Dimensions) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-700/50 p-3 rounded-lg shadow-sm">
            <span className="uppercase text-xs tracking-wider font-semibold text-gray-400">Year</span>
             <p className="text-lg font-medium text-white">{yearOfWork}</p>
        </div>

            <div className="bg-gray-700/50 p-3 rounded-lg shadow-sm">
            <span className="uppercase text-xs tracking-wider font-semibold text-gray-400">Medium</span>
            <p className="text-lg font-medium text-white">{medium}</p>
            </div>

            {width && height && (
            <div className="bg-gray-700/50 p-3 rounded-lg shadow-sm">
                <span className="uppercase text-xs tracking-wider font-semibold text-gray-400">Dimensions</span>
                <p className="text-lg font-medium text-white">{`${width} x ${height}`}</p>
            </div>
            )}
        </div>

        <div className="relative my-4">
            {imageLoading && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-800 rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-indigo-400 border-t-transparent"></div>
                </div>
            )}

            <img
                src={`https://res.cloudinary.com/funwebdev/image/upload/w_600/art/paintings/square/${imageFileName.toString().padStart(6, '0')}.jpg`}
                alt={title}
                className={`rounded-lg shadow-lg w-full transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setImageLoading(false)}
            />
        </div>

        {/* Dominant Colors as Boxes */}
        {colors.length > 0 && (
          <div>
            <p className="font-semibold mb-2">Dominant Colors:</p>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color, index) => (
                <div
                  key={index}
                  title={color.name}
                  className="w-8 h-8 rounded border border-gray-700 shadow-sm"
                  style={{ backgroundColor: color.web }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => onAddToFavorites(painting.paintingId)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            ❤️ Add to Favorites
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default PaintingPopup;