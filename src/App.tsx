import * as React from 'react';
import { StatelessComponent, ReactNode } from 'react';

import * as styles from './App.css';

import { MenuList } from './shared/components/menu-list/MenuList';

type AppProps = {
  children?: ReactNode
}

export const App: StatelessComponent<AppProps> = ({children}) => {
  return (
    <div className={styles.container}>
      <MenuList/>
      <div>{children}</div>
    </div>
  );
};
