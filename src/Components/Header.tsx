import React, { FC, ReactElement } from 'react';
import { useGetUserQuery } from '../api/apiSlice';

interface HeaderProps {
  accessToken: string | undefined;
}

const Header: FC<HeaderProps> = ({accessToken}): ReactElement => {

  const { data: user, isLoading, isError } = useGetUserQuery(undefined,{
    skip: !accessToken
});

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if(isError) {
    return <h1>You are currently not logged in</h1>
  }

  return (
    <header>
      <h1>Welcome, {user?.display_name}</h1>
    </header>
  );
};

export default Header;