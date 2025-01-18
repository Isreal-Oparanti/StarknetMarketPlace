"use client";

import React, { useEffect, useState } from "react";
import { Client, Databases, Storage } from "appwrite";

const ModelListing = () => {
  const [models, setModels] = useState<any>([]);
  const [storedFiles, setStoredFiles] = useState<any>([]);
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("678b6e74003cc1c303ab");

  const databases = new Databases(client);
  const storage = new Storage(client);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await databases.listDocuments(
          "678b6f59002f93fb33fc",
          "678b6f6500263ed320e3"
        );
        setModels(response.documents);
        console.log("models", response.documents);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();
  }, []);

  useEffect(() => {
    const fetchStoredFiles = async () => {
      try {
        const response = await storage.listFiles("678b79f90036b8e38185");
        setStoredFiles(response.files);
        console.log("stored data", response.files);
      } catch (error) {
        console.error("Error fetching stored files:", error);
      }
    };

    fetchStoredFiles();
  }, []);

  return (
    <div>
      <h1 className="text-center text-xl font-bold my-4">Model Listings</h1>
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
                <p className="mt-2 text-sm text-gray-500">
                  Stored File Name: {correspondingFile.name}
                </p>
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
