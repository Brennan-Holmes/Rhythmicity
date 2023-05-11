import { NextApiRequest, NextApiResponse } from "next";
import {
  createPersonalizedPlaylist,
  getPersonalizedPlaylists,
} from "../../../controllers/playlists";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case "POST":
      await createPersonalizedPlaylist(req, res);
      break;
    case "GET":
      await getPersonalizedPlaylists(req, res, query);
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
