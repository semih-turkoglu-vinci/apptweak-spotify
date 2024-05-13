import React, { FC, useContext, useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import Tracks from "./Tracks";
import { ThemeContext } from "../ThemeContext";
import Pagination from '@mui/material/Pagination';

interface TrackTableProps {
  tracks: any[];
  onSortByTrack: () => void;
  onSortByAlbum: () => void;
  onSortByReleaseDate: () => void;
  onSortByDuration: () => void;
}

const TrackTable: FC<TrackTableProps> = ({ tracks, onSortByTrack, onSortByAlbum, onSortByReleaseDate, onSortByDuration }) => {
  const { theme } = useContext(ThemeContext);
  const [sortedTracks, setSortedTracks] = useState(tracks || []);
  const [page, setPage] = useState(1);
  const tracksPerPage = 20;

  useEffect(() => {
    setSortedTracks(tracks);
  }, [tracks]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const className = theme === 'light' ? 'table table-hover' : 'table table-hover table-dark';

  const paginationColor = theme === 'light' ? 'standard' : 'primary';

  return (
    <div>
      <table className={className}>
        <thead>
        <tr>
          <th>#</th>
          <th>Cover</th>
          <th>
            Name
            <IconButton onClick={onSortByTrack}>
              <FilterListIcon color="inherit"/>
            </IconButton>
          </th>
          <th>Album
            <IconButton onClick={onSortByAlbum}>
              <FilterListIcon color="inherit"/>
            </IconButton>
          </th>
          <th>Date added
            <IconButton onClick={onSortByReleaseDate}>
              <FilterListIcon color="inherit"/>
            </IconButton>
          </th>
          <th>Duration
            <IconButton onClick={onSortByDuration}>
              <FilterListIcon color="inherit"/>
            </IconButton>
          </th>
        </tr>
        </thead>
        <tbody>
        {sortedTracks.slice((page - 1) * tracksPerPage, page * tracksPerPage).map((track, index) => (
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
      <Pagination color={paginationColor} count={Math.ceil(sortedTracks.length / tracksPerPage)} page={page} onChange={handlePageChange} />
    </div>
  );
};

export default TrackTable;