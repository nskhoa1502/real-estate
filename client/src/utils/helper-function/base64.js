import { Buffer } from "buffer";

export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const blobToBase64 = (blog) =>
  new Buffer(blog, "base64").toString("binary");
