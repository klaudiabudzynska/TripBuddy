import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';

function Main() {
  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <a className={styles.navigationItems} href="/">
          Home
        </a>
        <a className={styles.navigationItems} href="/trip-plans">
          Trip plans
        </a>
      </nav>
      <Outlet />
    </div>
  );
}

export default Main;
