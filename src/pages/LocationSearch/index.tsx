import Search from '../../components/Search';
import styles from './index.module.scss';

function LocationSearch() {
  return (
    <div>
      <h1 className={styles.title}>Search for your destination</h1>
      <Search />
    </div>
  );
}

export default LocationSearch;
