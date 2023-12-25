import {useParams} from 'react-router-dom';
import {getLocationDetailsLS} from '../../helpers/cache.ts';
import Map from '../../components/Map';
import locationDetails from '../../components/LocationDetails';
import Photos from '../../components/LocationDetails/Photos';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import styles from '../../components/LocationDetails/index.module.scss';
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

  console.log(locationData.data);

  const {name, description, address_obj, phone, email, website} = locationData?.data || {};

  return <div>
    <h1>{name}</h1>
    <p>{address_obj?.address_string}</p>
    <Photos locationId={id} />
    <Button
      value={<FontAwesomeIcon icon={faPlus} />}
      addClass={styles.actionButton}
      onClick={showAddingToTripDialog}
    />
    <p>{description}</p>
    <h2>Contact</h2>
    <p>{website}</p>
    <p>{email}</p>
    <p>{phone}</p>
    <AddToTripModal
      isModalOpen={isAddingToTripModalOpen}
      locationId={id}
      closeModal={closeAddingToTripDialog}
    />
    {/*<Map locationData={locationData} locationsToDisplay={[id]} />*/}
  </div>;
};

export default LocationPage;