import * as React from 'react';
import { StatelessComponent } from 'react';
import { Link } from 'react-router';

import * as styles from './MenuList.css';

export const MenuList: StatelessComponent<void> = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li className={styles.navItem}><Link to="/">Home</Link></li>
        <li className={styles.navItem}><Link to="/about">About</Link></li>
        <li className={styles.navItem}><Link to="/faq">FAQ</Link></li>
      </ul>
    </nav>
  );
};
