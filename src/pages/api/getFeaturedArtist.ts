import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const artists = await prisma.artist.findMany();
    const featuredArtist = artists[Math.floor(Math.random() * artists.length)];
    res.status(200).json({ artist: featuredArtist });
  } catch (error) {
    console.error("Error fetching artists from Prisma:", error);
    res.status(500).json({ error: "An error occurred while fetching artists" });
  }
};

export default handler;
