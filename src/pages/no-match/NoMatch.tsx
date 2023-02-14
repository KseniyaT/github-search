import React from 'react';
import { Link } from 'react-router-dom';
import earth from '../../images/earth.svg';
import spaceman from '../../images/spaceman.svg';
import './NoMatch.styles.scss';

const NoMatch = () => {
	return (
    <div className="match">
    	<img src={earth} alt="" width="490" height="472" className="earth-img hide-on-small-only" />
    	<h1 className="match_title">404</h1>
    	<h2 className="match_subtitle">Page not found</h2>
      <Link to="/" className="match_link">
        <i className="material-icons dp48">arrow_back</i>
        Go home
      </Link>
    	<img src={spaceman} alt="" width="358" height="316" className="spaceman-img" />
    </div>
	);
};

export default NoMatch;
