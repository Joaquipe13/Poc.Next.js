import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Deshabilitar el bodyParser por defecto de Next.js
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error parsing form data:", err);
        return res.status(500).json({ message: "Error parsing form data" });
      }
      console.log("Parsed fields:", fields);
      console.log("Parsed files:", files);

      const imageFile = Array.isArray(files.image)
        ? files.image[0]
        : files.image;

      if (!imageFile) {
        return res.status(400).json({ message: "No image file provided" });
      }

      // Definir el camino donde se guardará la imagen
      const imagePath = path.join(
        process.cwd(),
        "public",
        imageFile.originalFilename || "uploaded_image.jpg"
      );

      // Mover el archivo de la ubicación temporal a 'public'
      fs.copyFile(imageFile.filepath, imagePath, (copyErr) => {
        if (copyErr) {
          console.error("Error saving image:", copyErr);
          return res.status(500).json({ message: "Error saving image" });
        }

        res.status(200).json({
          message: "Image uploaded successfully",
          imageUrl: imageFile.originalFilename || `/uploaded_image.jpg`, // Ruta de la imagen accesible públicamente
        });
      });
    });
  } else {
    console.error("Method not allowed:", req.method);
    res.status(405).json({ message: "Method not allowed" });
  }
}
