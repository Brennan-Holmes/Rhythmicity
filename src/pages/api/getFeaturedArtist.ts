import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const currentMonth = new Date().getMonth();
    const artists = await prisma.artist.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), currentMonth, 1),
          lt: new Date(new Date().getFullYear(), currentMonth + 1, 1),
        },
      },
    });

    if (artists.length > 0) {
      const featuredArtist =
        artists[Math.floor(Math.random() * artists.length)];
      res.status(200).json({ artist: featuredArtist });
    } else {
      res.status(200).json({ artist: null });
    }
  } catch (error) {
    console.error("Error fetching artists from Prisma:", error);
    res.status(500).json({ error: "An error occurred while fetching artists" });
  }
};

export default handler;
