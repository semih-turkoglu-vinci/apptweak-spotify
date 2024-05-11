import React, { FC } from 'react';
import Tracks from "./Tracks";

interface TrackTableProps {
  tracks: any[];
}

const TrackTable: FC<TrackTableProps> = ({ tracks }) => {
  return (
    <table className={"table table-hover"}>
      <thead>
      <tr>
        <th>#</th>
        <th>Cover</th>
        <th>Name</th>
        <th>Album</th>
        <th>Duration</th>
        <th>Release Date</th>
      </tr>
      </thead>
      <tbody>
      {tracks.map((track, index) => (
        <Tracks
          key={track.track.id}
          name={track.track.name}
          artists={track.track.artists.map((artist : any) => artist.name)}
          coverUrl={track.track.album.images[0].url}
          position={index + 1}
          album={track.track.album.name}
          releaseDate={track.track.album.release_date}
          duration={track.track.duration_ms}
        />
      ))}
      </tbody>
    </table>
  );
};

export default TrackTable;