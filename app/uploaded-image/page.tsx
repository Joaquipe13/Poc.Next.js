"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const UploadedImage = () => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const url = params.get("imageUrl");
    setImageUrl(url);
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-center text-2xl text-black font-semibold mb-4">
        Uploaded Image
      </h1>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="mx-auto rounded-md shadow-md"
        />
      ) : (
        <p className="text-center text-red-500">No image found</p>
      )}
      <button
        onClick={() => router.push("/menu")} // Redirigir a la página de menú
        className="w-full bg-blue-500 text-white font-semibold p-3 rounded-md hover:bg-blue-600 transition-colors mt-4"
      >
        Go to Menu
      </button>
    </div>
  );
};

export default UploadedImage;
