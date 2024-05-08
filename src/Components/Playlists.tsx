import React, { FC, ReactElement, useState } from "react";
import { useGetPlaylistsQuery, useGetPlaylistTracksQuery } from "../api/apiSlice";
import Select from "react-select";
import Song from "./Song";

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
  }));

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: "25%"
    })
  };

  const handlePlaylistChange = (selectedOption: any) => {
    setSelectedPlaylistId(selectedOption.value);
  };

  return (
    <div>
      <h1>Playlists</h1>
      <Select options={options} styles={customStyles} onChange={handlePlaylistChange} />
      <h2>Tracks</h2>
      <table>
        <thead>
          <tr>
            <th>Cover</th>
            <th>Name</th>
            <th>Artists</th>
          </tr>
        </thead>
        <tbody>
          {playlistTracks?.items ? playlistTracks.items.map((track) => (
            <Song
              key={track.track.id}
              name={track.track.name}
              artists={track.track.artists.map((artist) => artist.name)}
              coverUrl={track.track.album.images[0].url}
            />
          )) : null}
        </tbody>
      </table>
    </div>
  );
};

export default Playlists;
