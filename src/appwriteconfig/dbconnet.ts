import { Client, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("678b6e74003cc1c303ab");

const databases = new Databases(client);

export const createDocument = async (
  databaseId: string,
  collectionId: string,
  data: Record<string, any>
) => {
  try {
    const response = await databases.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      data
    );
    return response;
  } catch (error) {
    console.error("Error creating document:", error);
    throw error;
  }
};
