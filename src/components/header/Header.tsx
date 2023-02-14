import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.styles.scss';

const Header = () => {
  return (
      <header className="header">
        <div className="nav-wrapper container">
          <nav className="header_navigation">
            <Link className="header_link" to="/">
              <img src={logo} className="logo" alt="logo" />
              Home
            </Link>
          </nav>        
        </div>
      </header>
  );
};

export default Header;
