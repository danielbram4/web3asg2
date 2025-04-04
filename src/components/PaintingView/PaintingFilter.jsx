import React from "react";

function PaintingFilter({
  filterType,
  setFilterType,
  filterValue,
  setFilterValue,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  onClear,
}) {
  return (
    <div className="p-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg shadow-lg flex flex-col sm:flex-row items-center gap-6">
      <div className="flex flex-col w-full sm:w-auto">
        <label className="mb-2 text-sm font-medium">Filter By:</label>
        <select
          className="w-full p-2 bg-gray-100 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Select a filter</option>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="gallery">Gallery</option>
          <option value="yearLess">Year &lt;=</option>
          <option value="yearGreater">Year &gt;=</option>
        </select>
      </div>

      <div className="flex flex-col w-full sm:w-auto">
        <label className="mb-2 text-sm font-medium">Filter Value:</label>
        <input
          className="w-full p-0 bg-gray-100 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Enter your filter"
        />
      </div>

      <div className="flex flex-col w-full sm:w-auto">
        <label className="mb-2 text-sm font-medium">Sort By:</label>
        <select
          className="w-full p-2 bg-gray-100 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title">Painting Title</option>
          <option value="artist">Artist Name</option>
          <option value="gallery">Gallery Name</option>
          <option value="year">Year</option>
        </select>
      </div>

      <div className="flex flex-col w-full sm:w-auto">
        <label className="mb-2 text-sm font-medium">Sort Order:</label>
        <select
          className="w-full p-2 bg-gray-100 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="w-full sm:w-auto">
        <button
          className={`block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600 hover:text-white
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-800`}
          type="button"
          onClick={onClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default PaintingFilter;