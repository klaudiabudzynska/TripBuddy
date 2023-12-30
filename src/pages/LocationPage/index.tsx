import {useParams} from 'react-router-dom';
import {getLocationDetailsLS} from '../../helpers/cache.ts';
import Map from '../../components/Map';
import Photos from '../../components/LocationDetails/Photos';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';
import Button from '../../components/Button';
import AddToTripModal from '../../components/Modal/components/AddToTripModal';

const LocationPage = () => {
  const { id} = useParams();

  const [isAddingToTripModalOpen, setIsAddingToTripModalOpen] = useState<boolean>(false);

  const showAddingToTripDialog = () => {
    setIsAddingToTripModalOpen(!isAddingToTripModalOpen);
  };

  const closeAddingToTripDialog = () => {
    setIsAddingToTripModalOpen(false);
  };

  if (!id) {
    return;
  }

  const locationData = getLocationDetailsLS(id);

  if (!locationData) {
    return;
  }

  const {name, description, address_obj, phone, email, website} = locationData?.data || {};

  return <div className={styles.container}>
    <h1 className={styles.title}>{name}</h1>
    <p className={styles.text}>{address_obj?.address_string}</p>
    <Photos locationId={id} />
    <Button
      value={<FontAwesomeIcon icon={faPlus} />}
      addClass={styles.actionButton}
      onClick={showAddingToTripDialog}
    />
    <p className={styles.text}>{description}</p>
    {(website || phone || email) && <h2 className={styles.subtitle}>Contact</h2>}
    {website &&
      <p className={styles.text}>Website:&nbsp;
        <a href={website} target="_blank" rel="noreferrer">{website}</a>
      </p>
    }
    {email &&
      <p className={styles.text}>Email address: {email}</p>
    }
    {phone &&
      <p className={styles.text}>Phone number: {phone}</p>
    }

    <AddToTripModal
      isModalOpen={isAddingToTripModalOpen}
      locationId={id}
      closeModal={closeAddingToTripDialog}
    />
    <Map locationData={locationData} locationsToDisplay={[id]} />
  </div>;
};

export default LocationPage;