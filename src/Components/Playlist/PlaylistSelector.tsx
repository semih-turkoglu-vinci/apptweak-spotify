import React, { FC } from 'react';
import Select from "react-select";

interface PlaylistSelectorProps {
  options: any[];
  handlePlaylistChange: (selectedOption: any) => void;
}

const PlaylistSelector: FC<PlaylistSelectorProps> = ({ options, handlePlaylistChange }) => {
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: "25%"
    }),
    menu: (provided: any) => ({
      ...provided,
      width: "25%"
    })
  };

  return (
    <Select options={options} styles={customStyles} onChange={handlePlaylistChange} />
  );
};

export default PlaylistSelector;