// src/app/components/ModelListing.tsx
"use client";

import { useState } from "react";

export const ModelListing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      
      <div className="p-4 flex justify-start items-center border-b border-gray-700">
        <input
          type="text"
          placeholder="Search models..."
          className="bg-gray-800 p-2 rounded text-gray-300 w-full max-w-lg"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-4 p-2 bg-purple-600 rounded hover:bg-purple-700"
        >
          Upload Model
        </button>
      </div>

     
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-gray-800 p-4 rounded">Model 1</div>
        <div className="bg-gray-800 p-4 rounded">Model 2</div>
      </div>

      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Upload AI Model</h2>
            <form>
              <input
                type="text"
                placeholder="Model Name"
                className="w-full mb-4 p-2 bg-gray-700 rounded text-white"
              />
              <textarea
                placeholder="Model Description"
                className="w-full mb-4 p-2 bg-gray-700 rounded text-white"
              ></textarea>
              <input
                type="file"
                className="w-full mb-4 p-2 bg-gray-700 rounded text-white"
              />
              <button
                type="submit"
                className="w-full p-2 bg-purple-600 rounded hover:bg-purple-700"
              >
                Submit
              </button>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
