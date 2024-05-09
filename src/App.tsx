import "./App.css";

import { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { authSelectors } from "./containers/auth/selectors";
import Header from "./Components/Header";
import Playlists from "./Components/Playlists";
import SearchBar from "./Components/SearchBar";

const App: FC = (): ReactElement => {
  const accessToken = useSelector(authSelectors.getAccessToken);

  return (
    <div>
      <Header accessToken={accessToken}/>
      <SearchBar accessToken={accessToken}/>
      <Playlists accessToken={accessToken}/>
    </div>
  );
};

export default App;
