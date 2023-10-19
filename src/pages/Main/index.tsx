import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';

function Main() {
  return (
    <div>
      <nav className={styles.navigation}>
        <a className={styles.navigationItems} href="/">
          Home
        </a>
        <a className={styles.navigationItems} href="/trip-plan">
          Trip plan
        </a>
      </nav>
      <Outlet />
    </div>
  );
}

export default Main;
