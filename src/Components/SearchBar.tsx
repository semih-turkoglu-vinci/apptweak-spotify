import React, { FC, useState } from "react";
import { useGetSearchTrackResultQuery } from "../api/apiSlice";

const SearchBar: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data: searchResults } = useGetSearchTrackResultQuery(searchValue, {
    skip: !searchValue
  });

  const handleSearchChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  return (
      <div className="input-group mb-3 dropdown">
        <input
          type="text"
          className="search-input"
          onChange={handleSearchChange}
          placeholder="Search for a track"
        />
        <button className="dropbtn">Search</button>
      {searchResults && (
        <div className="dropdown-content">
            <table className="table">
              <thead>
              <tr>
                <th>Cover</th>
                <th>Name and Artists</th>
                <th>Album</th>
              </tr>
              </thead>
              <tbody>
              {searchResults.map((track) => (
                <tr key={track.id}>
                  <td>
                    <img src={track.album.images[0].url} alt={track.name} width="50" height="50" />
                  </td>
                  <td>
                    <strong>{track.name}</strong><br/>
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </td>
                  <td>{track.album.name}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
      )}
    </div>
  );
};

export default SearchBar;