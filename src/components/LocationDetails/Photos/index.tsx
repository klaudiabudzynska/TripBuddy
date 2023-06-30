import { LocationDetailPhoto, PhotosProps } from './typings.ts';
import { callProxy } from '../../../helpers/fetch.ts';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

const fetchPhotos = async (locationId: PhotosProps['locationId']) => {
  const res: { data: LocationDetailPhoto[] } = await callProxy('/tripadvisor-api/location-photos', {
    locationId,
  });

  return res.data;
};

const Photos = ({ locationId }: PhotosProps) => {
  const [data, setData] = useState<LocationDetailPhoto[]>();

  useEffect(() => {
    fetchPhotos(locationId).then((res) => setData(res));
  }, [locationId]);

  console.log(data);

  return data ? (
    <div className={styles.container}>
      {data.map((photo) => {
        return (
          <img
            key={photo.id}
            alt={photo.caption}
            src={photo.images.small.url}
            width={photo.images.small.width}
            height={photo.images.small.height}
            className={styles.image}
          />
        );
      })}
    </div>
  ) : null;
};

export default Photos;
