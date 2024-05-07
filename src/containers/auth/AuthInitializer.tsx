import React, { FC, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authSelectors } from "./selectors";
import { login, RootState, setAccessToken } from "./slice";

type AuthInitializerProps = {
  children: ReactNode;
};

const AuthInitializer: FC<AuthInitializerProps> = ({
  children,
}: AuthInitializerProps) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(authSelectors.getAccessToken);

  const { location } = window;
  const regex = /.*access_token=(?<accesToken>[^&]*)/gi;
  const params = regex.exec(location.hash);

  const isLoggingOut = useSelector((state: RootState) => state.authentication.isLoggingOut);

  useEffect(() => {
    if (!accessToken && !isLoggingOut) {
      if (params && params[1]) {
        dispatch(setAccessToken({ accessToken: params[1] }));
      } else {
        dispatch(login());
      }
    }
  }, [accessToken, dispatch, params, isLoggingOut]);

  return <>{children}</>;
};

export default AuthInitializer;
