import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const SPOTIFY_SCOPE = [
  "user-read-email",
  "user-read-private",
  "playlist-read-private",
  "playlist-modify-private",
  "playlist-modify-public",
];

const REDIRECT_URI = window.location.origin;

export interface RootState {
  authentication: AuthState;
}

export interface DarkModeState {
  darkMode: boolean;
}

export interface AuthState extends DarkModeState {
  accessToken?: string;
  isLoggingOut: boolean;
}

export interface AccessTokenPayload {
  accessToken: string;
}

const initialState: AuthState = {
  accessToken: undefined,
  isLoggingOut: false,
  darkMode: true,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login(state) {
      const { REACT_APP_SPOTIFY_CLIENT_ID } = process.env;
      const scopes: string = SPOTIFY_SCOPE.join(",");
      state.isLoggingOut = false;

      window.location.href = `https://accounts.spotify.com/me/authorize?client_id=${REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}`;
    },
    logout(state) {
      state.accessToken = undefined;
      state.isLoggingOut = true;
      localStorage.removeItem("accessToken");
      window.location.href = 'https://accounts.spotify.com/logout';
    },
    setAccessToken(state, action: PayloadAction<AccessTokenPayload>) {
      state.accessToken = action.payload.accessToken;
      state.isLoggingOut = false;
      window.history.pushState({ REDIRECT_URI }, "", REDIRECT_URI);
    },
  },
});

export const { login, setAccessToken, logout } = authSlice.actions;

export default authSlice.reducer;
