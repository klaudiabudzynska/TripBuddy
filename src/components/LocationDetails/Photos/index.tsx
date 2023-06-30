import { LocationDetailPhoto, PhotosProps } from './typings.ts';
import { callProxy } from '../../../helpers/fetch.ts';
import { useEffect, useState } from 'react';

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

  return data ? (
    <>
      {data.map((photo) => {
        return <img key={photo.id} alt={photo.caption} src={photo.images.medium.url} />;
      })}
    </>
  ) : null;
};

export default Photos;
