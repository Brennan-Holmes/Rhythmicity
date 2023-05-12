import { useState } from "react";
import Head from "next/head";

export default function Create() {
  const [artist, setArtist] = useState("");
  const [album, setAlbumk] = useState("");
  const [track, setTrack] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Replace the URL below with your API endpoint
    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ artist, track }),
    });

    if (response.ok) {
      setArtist("");
      setTrack("");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Create New Artist - Rhythmicity</title>
      </Head>

      <main className="p-8">
        <h2 className="text-2xl mb-6">Create New Artist</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="artist"
              className="block text-sm font-medium text-gray-700"
            >
              Artist
            </label>
            <input
              type="text"
              id="artist"
              name="artist"
              className="mt-1 block w-full rounded-md bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="track"
              className="block text-sm font-medium text-gray-700"
            >
              Track
            </label>
            <input
              type="text"
              id="track"
              name="track"
              className="mt-1 block w-full rounded-md bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 hover:transition-all hover:duration-300 hover:scale-105"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}
