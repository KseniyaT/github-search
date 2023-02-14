import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.styles.scss';

const Header = () => {
  return (
      <header className="header">
        <div className="nav-wrapper container">
          <img src={logo} className="logo" alt="logo" />
          <nav className="header_navigation">
            <Link className="link" to="/">
              Home
            </Link>
          </nav>        
        </div>
      </header>
  );
};

export default Header;
