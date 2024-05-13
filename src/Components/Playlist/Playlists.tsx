import React, { FC, ReactElement, useState } from "react";
import { useGetPlaylistsQuery } from "../../api/apiSlice";
import PlaylistSelector from "./PlaylistSelector";
import SortablePlaylist from "./SortablePlaylist";

interface PlaylistsProps {
  accessToken: string | undefined;
}

const Playlists: FC<PlaylistsProps> = ({ accessToken }): ReactElement => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | undefined>(undefined);

  const { data: spotifyPlaylists } = useGetPlaylistsQuery(undefined, {
    skip: !accessToken
  });

  const options = spotifyPlaylists?.items.map((playlist) => ({
    value: playlist.id,
    label: playlist.name
  })) || [];

  const handlePlaylistChange = (selectedOption: any) => {
    setSelectedPlaylistId(selectedOption.value);
  };

  return (
    <div>
      <h2>Choose your playlist</h2>
      <PlaylistSelector options={options} handlePlaylistChange={handlePlaylistChange} />
      <SortablePlaylist playlistId={selectedPlaylistId} accessToken={accessToken} />
    </div>
  );
};

export default Playlists;