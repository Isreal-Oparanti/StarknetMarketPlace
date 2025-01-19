"use client";

import { createDocument } from "@/appwriteconfig/dbconnet";
import { useAccount } from "@starknet-react/core";
import { Client, Storage, ID } from "appwrite";
import React, { useState } from "react";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("678b6e74003cc1c303ab");

const storage = new Storage(client);

const CreateModel: React.FC<{ onClose: () => void; onSuccess: () => void }> = ({
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { address } = useAccount();

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
          const sanitizedFileName = sanitizeFileName(file.name);
          const response = await storage.createFile(
            bucketId,
            ID.unique(),
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
        author,
        wallet: address || "N/A",
        fileId,
      };

      await createDocument(databaseId, collectionId, data);
      setMessage("Model created successfully!");
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (error) {
      setErrorMessage("Failed to create model.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded shadow-md text-white">
      <h2 className="text-lg font-bold mb-4">Create a New AI Model</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-700 p-2 rounded border border-gray-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-700 p-2 rounded border border-gray-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-gray-700 p-2 rounded border border-gray-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full bg-gray-700 p-2 rounded border border-gray-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Upload File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full bg-gray-700 p-2 rounded border border-gray-600"
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Model"}
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-green-400">{message}</p>}
      {errorMessage && <p className="mt-4 text-red-400">{errorMessage}</p>}
    </div>
  );
};

export default CreateModel;
