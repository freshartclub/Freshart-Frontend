
import React from 'react';
import { useLocation } from 'react-router-dom';
import LogNaveBar from './NavBar/LogNaveBar';
import NavBar from './NavBar/NavBar';

interface LayoutProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, isAuthenticated }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
const isSignUpPage = location.pathname === '/signup';

const isForgetPassword = location.pathname === '/forget-password'

  return (
    <div>
      {(isLoginPage || isSignUpPage || isForgetPassword) ? (
        <LogNaveBar />
      ) : (
        isAuthenticated ? <LogNaveBar /> : <NavBar />
      )}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
