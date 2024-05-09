import React, { FC, ReactElement, useState } from "react";
import { useGetPlaylistsQuery, useGetPlaylistTracksQuery } from "../api/apiSlice";
import Select from "react-select";
import Tracks from "./Tracks";

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
    }),
    menu: (provided: any) => ({
      ...provided,
      width: "25%"
    }),
    }
  ;

  const handlePlaylistChange = (selectedOption: any) => {
    setSelectedPlaylistId(selectedOption.value);
  };

  return (
    <div>
      <h2>Choose your playlist</h2>
      <Select options={options} styles={customStyles} onChange={handlePlaylistChange} />
      <h2>Tracks</h2>
      <div className="col">
      <table className={"table table-hover"}>
        <thead>
          <tr>
            <th>#</th>
            <th>Cover</th>
            <th>Name and artists</th>
            <th>Album</th>
            <th>Release date</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {playlistTracks?.items ? playlistTracks.items.map((track, index) => (
            <Tracks
              key={track.track.id}
              name={track.track.name}
              artists={track.track.artists.map((artist) => artist.name)}
              coverUrl={track.track.album.images[0].url}
              position={index + 1}
              album={track.track.album.name}
              releaseDate={track.track.album.release_date}
              duration={track.track.duration_ms}
            />
          )) : null}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Playlists;
