import React, { FC, ReactElement, useState } from "react";

interface SortablePlaylistProps {
  tracks: any[];
  children: (sortedTracks: any[]) => React.ReactNode;
}

const SortablePlaylist: FC<SortablePlaylistProps> = ({ tracks, children }): ReactElement => {
  type SortKey = 'name' | 'album' | 'duration_ms' | 'release_date' | '';
  const getValue = (track: any, key: SortKey) => {
    switch (key) {
      case 'name':
        return track.name;
      case 'album':
        return track.album.name;
      case 'duration_ms':
        return track.duration_ms;
      case 'release_date':
        return new Date(track.album.release_date);
      default:
        return '';
    }
  };

  interface SortConfig {
    key: SortKey;
  }

  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: ""});

  const requestSort = (key: SortKey) => {
    setSortConfig({ key });
  };

  let sortedTracks = tracks ? [...tracks] : [];
  sortedTracks.sort((a, b) => {
    const aValue = getValue(a, sortConfig.key);
    const bValue = getValue(b, sortConfig.key);

    if (aValue < bValue) {
      return -1;
    }
    if (aValue > bValue) {
      return 1;
    }
    return 0;
  });

  return <>{children(sortedTracks)}</>;
};

export default SortablePlaylist;