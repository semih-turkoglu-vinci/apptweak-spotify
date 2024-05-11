import "./App.css";

import { FC, ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authSelectors } from "./containers/auth/selectors";
import Header from "./Components/Header";
import Playlists from "./Components/Playlist/Playlists";
import SearchBar from "./Components/SearchBar";
import { ThemeContext } from "./Components/ThemeContext";

const App: FC = (): ReactElement => {
  const accessToken = useSelector(authSelectors.getAccessToken);
  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  )

  useEffect(() => {
    const root = window.document.documentElement;
    root.style.setProperty(
      "--color-background",
      theme === "light" ? "var(--color-background-light)" : "var(--color-background-dark)"
    );
    root.style.setProperty(
      "--color-text",
      theme === "light" ? "var(--color-text-light)" : "var(--color-text-dark)"
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <div>
      <Header accessToken={accessToken}/>
      <SearchBar />
      <Playlists accessToken={accessToken}/>
    </div>
      </ThemeContext.Provider>
  );
};

export default App;
