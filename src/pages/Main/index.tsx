import {Link, Outlet} from 'react-router-dom';
import styles from './index.module.scss';

function Main() {
  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <Link className={styles.navigationItems} to="/">
          Home
        </Link>
        <Link className={styles.navigationItems} to="/trip-plans">
          Trip plans
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Main;
