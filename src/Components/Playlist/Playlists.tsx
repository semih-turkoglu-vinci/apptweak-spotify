import React, { FC, ReactElement, useState } from "react";
import { useGetPlaylistsQuery, useGetPlaylistTracksQuery } from "../../api/apiSlice";
import PlaylistSelector from "./PlaylistSelector";
import SortablePlaylist from "./SortablePlaylist";
import TrackTable from "./TrackTable";

interface PlaylistsProps {
  accessToken: string | undefined;
}

const Playlists: FC<PlaylistsProps> = ({ accessToken }): ReactElement => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | undefined>(undefined);

  const { data: spotifyPlaylists } = useGetPlaylistsQuery(undefined, {
    skip: !accessToken
  });

  const { data: playlistTracks } = useGetPlaylistTracksQuery(selectedPlaylistId || "", {
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
      <h2>Tracks</h2>
      <div className="col">
        <SortablePlaylist tracks={playlistTracks?.items || []}>
          {(sortedTracks) => <TrackTable tracks={sortedTracks} />}
        </SortablePlaylist>
      </div>
    </div>
  );
};

export default Playlists;
