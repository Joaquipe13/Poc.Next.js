"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image.js";

const ImageGallery = () => {
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("/api/get-images");
      const data = await response.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  const handleReturn = () => {
    router.push("/upload-image");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg min-h-screen">
      <h1 className="text-center text-3xl text-white font-semibold mb-6">
        Image Gallery
      </h1>
      <div className="mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="grid grid-cols-3 gap-6">
          {images.map((url, index) => (
            <div key={index} className="flex justify-center items-center">
              <Image
                src={url}
                alt={`Uploaded Image ${index}`}
                className="w-72 h-72 object-cover rounded-md border border-gray-800 shadow-lg bg-gray-700"
              />
            </div>
          ))}
        </div>
      </div>
      <br />
      <button
        onClick={handleReturn}
        className="w-full bg-indigo-900 text-white font-semibold p-3 rounded-md hover:bg-blue-800 transition-colors"
      >
        Back to Menu
      </button>
    </div>
  );
};

export default ImageGallery;
