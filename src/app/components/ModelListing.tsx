"use client";

import React, { useEffect, useState } from "react";
import { Client, Databases, Storage } from "appwrite";

const ModelListing = () => {
  const [models, setModels] = useState<any>([]);
  const [storedFiles, setStoredFiles] = useState<any>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [loadingModels, setLoadingModels] = useState(true);
  const [loadingFiles, setLoadingFiles] = useState(true);

  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("678b6e74003cc1c303ab");

  const databases = new Databases(client);
  const storage = new Storage(client);

  // useEffect(() => {
  //   setIsHydrated(true);
  // }, []);

  // if (!isHydrated) {
  //   return null;
  // }

  useEffect(() => {
    const fetchModels = async () => {
      setLoadingModels(true);
      try {
        const response = await databases.listDocuments(
          "678b6f59002f93fb33fc",
          "678b6f6500263ed320e3"
        );
        setModels(response.documents);
        console.log("models", response.documents);
      } catch (error) {
        console.error("Error fetching models:", error);
      } finally {
        setLoadingModels(false);
      }
    };

    fetchModels();
  }, []);

  useEffect(() => {
    const fetchStoredFiles = async () => {
      setLoadingFiles(true);
      try {
        const response = await storage.listFiles("678b79f90036b8e38185");
        setStoredFiles(response.files);
        console.log("stored data", response.files);
      } catch (error) {
        console.error("Error fetching stored files:", error);
      } finally {
        setLoadingFiles(false);
      }
    };

    fetchStoredFiles();
  }, []);

  const handleFileDownload = async (bucketId: string, fileId: string) => {
    try {
      const result = storage.getFileDownload(bucketId, fileId);
      console.log("result", result);
      window.open(result, "_blank");
      const link = document.createElement("a");
      link.href = result;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-xl font-bold my-4">Model Listings</h1>

      {(loadingModels || loadingFiles) && (
        <div className="flex justify-center items-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid rounded-full border-t-transparent border-[#A263F7]"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {models.length > 0 ? (
        models.map((model: any) => {
          const correspondingFile = storedFiles.find(
            (file: any) => file.$id === model.fileId
          );

          return (
            <div
              key={model.$id}
              className="p-4 border rounded-lg shadow-lg my-2"
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
                    className="mt-2 py-2 text-[#A263F7] rounded underline"
                    onClick={() =>
                      handleFileDownload(
                        "678b79f90036b8e38185",
                        correspondingFile.$id
                      )
                    }
                  >
                    ${model.price}
                  </button>
                </>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-center">No models found.</p>
      )}
    </div>
  );
};

export default ModelListing;
