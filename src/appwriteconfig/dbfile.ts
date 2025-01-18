import { Client, Storage, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("678b79f90036b8e38185");

const storage = new Storage(client);

const uploaderElement = document.getElementById(
  "uploader"
) as HTMLInputElement | null;

if (uploaderElement && uploaderElement.files && uploaderElement.files[0]) {
  const file = uploaderElement.files[0];

  const promise = storage.createFile("[BUCKET_ID]", ID.unique(), file);

  promise.then(
    (response) => {
      console.log(response);
    },
    (error) => {
      console.error(error);
    }
  );
} else {
  console.error("File uploader element not found or no file selected.");
}
