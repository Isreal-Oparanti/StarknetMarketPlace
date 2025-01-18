"use client";

import { createDocument } from "@/appwriteconfig/dbconnet";
import { Client, Storage, ID } from "appwrite";
import React, { useState } from "react";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("678b6e74003cc1c303ab");

const storage = new Storage(client);

const CreateModel: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [wallet, setWallet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const sanitizeFileName = (fileName: string): string => {
    const sanitizedFileName = fileName
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .replace(/^[^a-zA-Z0-9]/, "valid_");

    return sanitizedFileName.slice(0, 36);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrorMessage("");

    try {
      const databaseId = "678b6f59002f93fb33fc";
      const collectionId = "678b6f6500263ed320e3";
      let fileId = null;

      if (file) {
        const bucketId = "678b79f90036b8e38185";
        try {
          const sanitizedFileName = sanitizeFileName(`${name}`);
          const response = await storage.createFile(
            bucketId,
            sanitizedFileName,
            file
          );
          fileId = response.$id;
        } catch (fileError: any) {
          setErrorMessage(`File upload failed: ${fileError.message}`);
          throw new Error(`File upload failed: ${fileError.message}`);
        }
      }

      const data = {
        name,
        description,
        price: Number(price),
        wallet,
        fileId,
      };

      const response = await createDocument(databaseId, collectionId, data);
      setMessage("Document created successfully!");
      console.log(response);
    } catch (error) {
      setMessage("Failed to create document.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Create a New Document</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Wallet Address</label>
          <input
            type="text"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Upload File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Document"}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      {errorMessage && (
        <p className="mt-4 text-center text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default CreateModel;
