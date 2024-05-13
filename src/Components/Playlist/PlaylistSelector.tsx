import React, { FC, useContext } from 'react';
import Select from "react-select";
import { ThemeContext } from "../ThemeContext";

interface PlaylistSelectorProps {
  options: any[];
  handlePlaylistChange: (selectedOption: any) => void;
}

const PlaylistSelector: FC<PlaylistSelectorProps> = ({ options, handlePlaylistChange }) => {
  const { theme } = useContext(ThemeContext);

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: "25%",
      backgroundColor: theme === 'light' ? 'white' : '#343a40',
      color: theme === 'light' ? 'black' : 'white'
    }),
    menu: (provided: any) => ({
      ...provided,
      width: "25%",
      backgroundColor: theme === 'light' ? 'white' : '#343a40',
      color: theme === 'light' ? 'black' : 'white'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: theme === 'light' ? 'black' : 'white'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: theme === 'light' ? 'black' : 'white'
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? (theme === 'light' ? '#f0f0f0' : '#555555') : 'transparent',
      color: theme === 'light' ? 'black' : 'white'
    }),
    input: (provided: any) => ({
      ...provided,
      color: theme === 'light' ? 'black' : 'white'
    }),
    };

  return (
    <Select options={options} styles={customStyles} onChange={handlePlaylistChange} />
  );
};

export default PlaylistSelector;