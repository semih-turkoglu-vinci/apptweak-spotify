import React, { FC, ReactElement, useContext } from "react";
import { useGetUserQuery } from "../api/apiSlice";
import { ThemeContext } from "./ThemeContext";

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
        <div className="custom-control custom-switch">
          <input type="checkbox" className="custom-control-input" id="darkSwitch" checked={theme === "dark"} onChange={toggleTheme}/>
          <label className="custom-control-label" htmlFor="darkSwitch">
            Dark Mode
          </label>
        </div>
      </div>
    </div>
  );
};

export default Header;
