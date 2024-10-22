"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image.js";

export default function MenuPage() {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setImageUrl(data.imageUrl);
      } else {
        const errorData = await response.json();
        console.log(errorData.message || "Error uploading image");
      }
    } else {
      console.log("Please select an image to upload");
    }
  };
  const handleClick = () => {
    router.push("/uploaded-images");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      <br />
      <h1 className="text-center text-2xl text-white font-semibold mb-4">
        Upload Image
      </h1>

      {imageUrl && (
        <div className="mt-4">
          <h2 className="text-center text-xl text-white font-medium mb-4"></h2>
          <Image
            src={"images/" + imageUrl}
            alt="Uploaded"
            className="mx-auto rounded-md shadow-md"
          />
        </div>
      )}

      <br />
      <h2 className="text-center text-xl text-white font-medium mb-6">
        Upload new image
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block w-full text-sm text-gray-300 border border-gray-500 rounded-lg cursor-pointer bg-gray-800 focus:outline-none focus:border-blue-500 p-2 mb-4"
      />

      <br />
      <button
        onClick={handleUpload}
        className="w-full bg-indigo-700 text-white font-semibold p-3 rounded-md hover:bg-indigo-500 transition-colors"
      >
        Upload
      </button>

      <br />
      <br />
      <button
        onClick={handleClick}
        className="w-full bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-500 transition-colors"
      >
        View all images
      </button>
    </div>
  );
}
