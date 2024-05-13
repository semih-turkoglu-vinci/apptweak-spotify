import React, { FC, ReactElement, useEffect, useState } from "react";
import { useGetPlaylistTracksQuery } from "../../api/apiSlice";
import TrackTable from "./TrackTable";

interface SortablePlaylistProps {
  playlistId: string | undefined;
  accessToken: string | undefined;
}

const SortablePlaylist: FC<SortablePlaylistProps> = ({ playlistId, accessToken }): ReactElement => {

  const { data: playlistTracks } = useGetPlaylistTracksQuery(playlistId || "", {
    skip: !accessToken
  });

  const [sortedTracks, setSortedTracks] = useState<any[]>([]);
  const [initialTracks, setInitialTracks] = useState<any[]>([]);

  useEffect(() => {
    if (playlistTracks) {
      setSortedTracks(playlistTracks.items);
      setInitialTracks(playlistTracks.items);
    }
  }, [playlistTracks]);

  const handleSortByTrackName = () => {
    if (playlistTracks) {
      const tracks = [...sortedTracks];
      const sorted = [...tracks].sort((a, b) => a.track.name.localeCompare(b.track.name));
      if (JSON.stringify(sorted) === JSON.stringify(tracks)) {
        setSortedTracks(initialTracks);
      } else {
        setSortedTracks(sorted);
      }
    }
  };

  const handleSortByAlbum = () => {
    if (playlistTracks) {
      const tracks = [...sortedTracks];
      const sorted = [...tracks].sort((a, b) => a.track.album.name.localeCompare(b.track.album.name));
      if (JSON.stringify(sorted) === JSON.stringify(tracks)) {
        setSortedTracks(initialTracks);
      } else {
        setSortedTracks(sorted);
      }
    }
  };

  const handleSortByReleaseDate = () => {
    if (playlistTracks) {
      const tracks = [...sortedTracks];
      const sorted = [...tracks].sort((a, b) => new Date(a.track.album.release_date).getTime() - new Date(b.track.album.release_date).getTime());
      if (JSON.stringify(sorted) === JSON.stringify(tracks)) {
        setSortedTracks(initialTracks);
      } else {
        setSortedTracks(sorted);
      }
    }
  };

  const handleSortByDuration = () => {
    if (playlistTracks) {
      const tracks = [...sortedTracks];
      const sorted = [...tracks].sort((a, b) => a.track.duration_ms - b.track.duration_ms);
      if (JSON.stringify(sorted) === JSON.stringify(tracks)) {
        setSortedTracks(initialTracks);
      } else {
        setSortedTracks(sorted);
      }
    }
  };

  return (
    <div>
      <h2>Tracks</h2>
      <TrackTable tracks={sortedTracks} onSortByTrack={handleSortByTrackName} onSortByAlbum={handleSortByAlbum} onSortByReleaseDate={handleSortByReleaseDate} onSortByDuration={handleSortByDuration} />
    </div>
  );
};

export default SortablePlaylist;