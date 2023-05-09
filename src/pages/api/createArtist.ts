import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, image, bio, recordLabel } = req.body;

    try {
      const newArtist = await prisma.artist.create({
        data: { name, image, bio, recordLabel } as Prisma.ArtistCreateInput,
      });

      res.status(200).json(newArtist);
    } catch (error) {
      res.status(500).json({ error: "Error creating artist" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
