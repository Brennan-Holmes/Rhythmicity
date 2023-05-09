import React, { useState } from "react";

interface Props {
  onSubmit: (name: string, image: string) => void;
  onClose: () => void;
}

export default function CreateArtistForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(name, image);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-gray-300 text-white bg-slate-800 p-2 rounded-md flex-grow"
          placeholder="Enter artist name"
          required
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border-2 border-gray-300 text-white bg-slate-800 p-2 rounded-md"
          placeholder="Enter artist image"
          required
        />
        <button
          type="submit"
          className="bg-blue-800 rounded-md px-2 py-2 text-white hover:bg-blue-900 hover:duration-300 hover:transition-all hover:scale-105"
        >
          Create Artist
        </button>
      </div>
    </form>
  );
}
