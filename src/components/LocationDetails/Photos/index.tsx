import { LocationDetailPhoto, PhotosProps } from './typings.ts';
import { callProxy } from '../../../helpers/fetch.ts';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { getLocationPhotosLS, setLocationPhotosLS } from '../../../helpers/cache.ts';

const fetchPhotos = async (locationId: PhotosProps['locationId']) => {
  const res: { data: LocationDetailPhoto[] } = await callProxy('/tripadvisor-api/location-photos', {
    locationId,
  });

  return res.data;
};

const Photos = ({ locationId }: PhotosProps) => {
  const [data, setData] = useState<LocationDetailPhoto[]>();

  useEffect(() => {
    if (locationId && !getLocationPhotosLS(locationId)) {
      fetchPhotos(locationId).then((res) => {
        setData(res);
        setLocationPhotosLS(locationId, res);
      });
    } else {
      setData(getLocationPhotosLS(locationId)?.data || []);
    }
  }, [locationId]);

  return data ? (
    <div className={styles.container}>
      {data.map((photo) => {
        const { url } = photo.images.large || {};

        return (
          <img
            key={photo.id}
            alt={photo.caption}
            src={url || photo.images.original.url}
            className={styles.image}
          />
        );
      })}
    </div>
  ) : null;
};

export default Photos;
