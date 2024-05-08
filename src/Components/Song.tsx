import React, { FC } from 'react';

interface SongProps {
  name: string;
  artists: string[];
  coverUrl: string;
  position: number;
  album: string;
  releaseDate: string;
  duration: number;
}

const Song: FC<SongProps> = ({ name, artists, coverUrl, position, album, releaseDate, duration }) => {

  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);

  return (
    <tr style={{ padding: '10px', margin: '10px'}}>
      <td>{position}</td>
      <td><img src={coverUrl} alt={name} width="50" height="50" style={{ borderRadius: '10%' }} /></td>
      <td>
        <strong>{name}</strong><br />
        {artists.join(', ')}
      </td>
      <td>{album}</td>
      <td>{releaseDate}</td>
      <td>{minutes}:{parseInt(seconds) < 10 ? '0' : ''}{seconds}</td>
    </tr>
  );
};

export default Song;