"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MenuPage() {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setMessage(data.message);
        router.push(
          `/uploaded-image?imageUrl=${encodeURIComponent(data.imageUrl)}`
        );
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Error uploading image");
      }
    } else {
      setMessage("Please select an image to upload");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <br />
      <h1 className="text-center text-2xl text-black font-semibold mb-4">
        Menu
      </h1>
      <h2 className="text-center text-xl text-black font-medium mb-6">
        Upload Profile Picture
      </h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500 p-2 mb-4"
      />
      <button
        onClick={handleUpload}
        className="w-full bg-blue-500 text-white font-semibold p-3 rounded-md hover:bg-blue-600 transition-colors"
      >
        Upload
      </button>
      {message && (
        <p className="text-center text-green-500 font-medium mt-4">{message}</p>
      )}
    </div>
  );
}
