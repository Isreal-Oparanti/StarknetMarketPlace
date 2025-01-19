"use client";

import React, { useEffect, useState } from "react";
import { Client, Databases, Storage } from "appwrite";
import CreateModel from "./CreateModel";


const ModelListing = () => {
  const [models, setModels] = useState<any>([]);
  const [storedFiles, setStoredFiles] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("678b6e74003cc1c303ab");

  const databases = new Databases(client);
  const storage = new Storage(client);

  const fetchModels = async () => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(
        "678b6f59002f93fb33fc",
        "678b6f6500263ed320e3"
      );
      setModels(response.documents);
    } catch (error) {
      console.error("Error fetching models:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStoredFiles = async () => {
    try {
      const response = await storage.listFiles("678b79f90036b8e38185");
      setStoredFiles(response.files);
    } catch (error) {
      console.error("Error fetching stored files:", error);
    }
  };

  useEffect(() => {
    fetchModels();
    fetchStoredFiles();
  }, []);

  const handleFileDownload = async (bucketId: string, fileId: string) => {
    try {
      const result = storage.getFileDownload(bucketId, fileId);
      window.open(result, "_blank");
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Top Bar */}
      <div className="p-4 flex justify-left items-center border-b border-gray-700">
        <input
          type="text"
          placeholder="Search models..."
          className="ml-11 bg-gray-800 p-2 rounded text-gray-300 w-full max-w-lg"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-4 p-2 bg-purple-800 rounded hover:bg-purple-700"
        >
          Upload Model
        </button>
      </div>

      {/* Model Listings */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-900 ml-10 mr-10">
        {loading ? (
          <div className="col-span-full flex justify-center items-center">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid rounded-full border-t-transparent border-purple-500"
              role="status"
            ></div>
          </div>
        ) : models.length > 0 ? (
          models.map((model: any) => {
            const correspondingFile = storedFiles.find(
              (file: any) => file.$id === model.fileId
            );

            return (
              <div
                key={model.$id}
                className="bg-gray-800 p-4 rounded shadow-lg "
              >
                <h2 className="text-lg font-bold">{model.name}</h2>
                <p>{model.description}</p>
                <p className="font-semibold">Price: ${model.price}</p>
                <p>Wallet: {model.wallet || "N/A"}</p>
                {correspondingFile && (
                  <>
                    <p className="mt-2 text-sm text-gray-500">
                      Stored File Name: {correspondingFile.name}
                    </p>
                    <button
                      className="mt-2 py-2 text-purple-400 underline"
                      onClick={() =>
                        handleFileDownload(
                          "678b79f90036b8e38185",
                          correspondingFile.$id
                        )
                      }
                    >
                      Download for ${model.price}
                    </button>
                  </>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center col-span-full">No models found.</p>
        )}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-md relative">
          <CreateModel/>
            <button
              onClick={() => {
                setIsModalOpen(false);
                fetchModels(); // Refresh models after modal closes
              }}
              className="absolute top-4 right-4 text-white text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelListing;
