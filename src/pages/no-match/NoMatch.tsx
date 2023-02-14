import React from 'react';
import { Link } from 'react-router-dom';
import earth from '../../images/earth.svg';
import spaceman from '../../images/spaceman.svg';
import styles from './NoMatch.styles.module.scss';

const NoMatch = () => {
	return (
    <div className={styles.match}>
    	<img src={earth} alt="" width="490" height="472" className={`${styles.earth} hide-on-small-only`} />
    	<h1 className={styles.matchTitle}>404</h1>
    	<h2 className={styles.matchSubtitle}>Page not found</h2>
      <Link to="/" className={styles.matchLink}>
        <i className="material-icons dp48">arrow_back</i>
        Go home
      </Link>
    	<img src={spaceman} alt="" width="358" height="316" className={styles.spaceman} />
    </div>
	);
};

export default NoMatch;
