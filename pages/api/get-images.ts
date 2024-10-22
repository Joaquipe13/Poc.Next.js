import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const publicDir = path.join(process.cwd(), "public", "images");
  fs.readdir(publicDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Error reading directory" });
    }

    const images = files.filter((file) => /\.(jpg|jpeg|png|gif)$/.test(file));
    const imageUrls = images.map((file) => `/images/${file}`);
    console.log("Image URLs:", imageUrls);
    res.status(200).json(imageUrls);
  });
}
