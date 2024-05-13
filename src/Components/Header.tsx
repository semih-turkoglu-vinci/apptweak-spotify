import React, { FC, ReactElement, useContext } from "react";
import IconButton from '@mui/material/IconButton';
import { useGetUserQuery } from "../api/apiSlice";
import { ThemeContext } from "./ThemeContext";
import { Brightness4, Brightness7 } from "@mui/icons-material";

interface HeaderProps {
  accessToken: string | undefined;
}

const Header: FC<HeaderProps> = ({ accessToken }): ReactElement => {
  const {
    data: user,
    isLoading,
    isError
  } = useGetUserQuery(undefined, {
    skip: !accessToken
  });

  const {theme, toggleTheme} = useContext(ThemeContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <h1>You are currently not logged in</h1>;
  }

  return (
    <div className="row header-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <header>
          <h1>Welcome to Listify, {user?.display_name} !</h1>
        </header>
        <IconButton onClick={toggleTheme} color="inherit">
          {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
