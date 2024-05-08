import React, { FC } from 'react';

interface SongProps {
  name: string;
  artists: string[];
  coverUrl: string;
}

const Song: FC<SongProps> = ({ name, artists, coverUrl }) => {
  return (
    <tr style={{ border: '1px solid black', padding: '10px', margin: '10px'}}>
      <td><img src={coverUrl} alt={name} width="50" height="50" style={{ borderRadius: '10%' }} /></td>
      <td>{name}</td>
      <td>{artists.join(', ')}</td>
    </tr>
  );
};

export default Song;