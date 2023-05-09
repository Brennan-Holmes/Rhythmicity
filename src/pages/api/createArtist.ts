import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function createArtist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, image, recordLabel } = req.body;

  const newArtist = await prisma.artist.create({
    data: {
      name,
      image,
      recordLabel,
    },
  });

  res.json(newArtist);
}
