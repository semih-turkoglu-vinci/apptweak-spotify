import React, { FC, ReactElement } from 'react';
import { logout } from '../containers/auth/slice';
import { useDispatch } from "react-redux";

interface NavbarProps {
  accessToken: string | undefined;
}

const NavigationBar: FC<NavbarProps> = ({ accessToken }): ReactElement => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      
    </div>

  );
}

export default NavigationBar;
