import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import styles from './Header.styles.module.scss';

const Header = () => {
  return (
      <header className={styles.header}>
        <div className={`${styles.navWrapper} container`}>
          <nav className={styles.headerNavigation}>
            <Link className={styles.headerLink} to="/">
              <img src={logo} className={styles.logo} alt="logo" />
              Home
            </Link>
          </nav>        
        </div>
      </header>
  );
};

export default Header;
