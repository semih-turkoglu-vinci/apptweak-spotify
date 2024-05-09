import React, { FC, useState } from 'react';
import Select from 'react-select';
import { useGetSearchTrackResultQuery } from '../api/apiSlice';

interface SearchBarProps {
  accessToken: string | undefined;
}

const SearchBar: FC<SearchBarProps> = ({accessToken}) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedTrackId, setSelectedTrackId] = useState('');

  const { data: searchResults } = useGetSearchTrackResultQuery(searchValue, {
    skip: !searchValue || !accessToken
  });

  const options = searchResults ? searchResults?.map((track => ({
      value: track.id,
      label: track.name
    }))).flat()
    : []

  const customStyles = {
      control: (provided: any) => ({
        ...provided,
        width: "50%"
      }),
      menu: (provided: any) => ({
        ...provided,
        width: "50%"
      }),
    }
  ;

  const handleInputChange = (selectedOption: any) => {
    setSelectedTrackId(selectedOption.value);
  };

  const handleSearchChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <input type="text" onChange={handleSearchChange} placeholder="Search..." />

      <Select
        options={options}
        styles={customStyles}
        onChange={handleInputChange}
        placeholder="Select..."
      />

    </div>
  );
};

export default SearchBar;