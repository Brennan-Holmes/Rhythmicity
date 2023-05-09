import React, { useState } from "react";
// import { createArtist } from "@/lib/api";
// import { Modal } from "@/components/Modal";

interface Props {
  show: boolean;
  onClose: () => void;
}

export default function CreateArtistModal({ show, onClose }: Props) {
  const [name, setName] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const artist = await createArtist(name);
    console.log(artist);
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h3 className="text-xl font-bold mb-4">Create Artist</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="artistName"
          >
            Artist Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="artistName"
            type="text"
            placeholder="Enter artist name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}
