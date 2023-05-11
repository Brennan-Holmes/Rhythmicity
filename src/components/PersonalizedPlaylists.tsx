import React, { useEffect, useState } from "react";

interface Playlist {
  id: string;
  name: string;
  description: string;
}

interface PersonalizedPlaylistsProps {
  userId: string;
}

const PersonalizedPlaylists: React.FC<PersonalizedPlaylistsProps> = ({
  userId,
}) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    fetchPersonalizedPlaylists();
  }, []);

  const fetchPersonalizedPlaylists = async () => {
    const response = await fetch(
      `/api/playlists/personalized?userId=${userId}`
    );
    const data = await response.json();
    setPlaylists(data.playlists);
  };

  return (
    <div>
      <h2>Your Personalized Playlists</h2>
      {/* Render the playlists */}
      {playlists.map((playlist) => (
        <div key={playlist.id}>
          <h3>{playlist.name}</h3>
          <p>{playlist.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PersonalizedPlaylists;
