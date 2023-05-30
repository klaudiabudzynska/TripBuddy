import { LocationDetailPhoto, PhotosProps } from './typings.ts';
import { callProxy } from '../../../helpers/fetch.ts';
import { useQuery } from 'react-query';

const fetchPhotos = async (locationId: PhotosProps['locationId']) => {
  const res: { data: LocationDetailPhoto[] } = await callProxy('/tripadvisor-api/location-photos', {
    locationId,
  });

  return res.data;
};

const Photos = ({ locationId }: PhotosProps) => {
  const { data, isLoading } = useQuery('photos', () => fetchPhotos(locationId));

  if (isLoading) {
    return null;
  }

  console.log(data);

  return data ? (
    <>
      {data.map((photo) => {
        return <img key={photo.id} alt={photo.caption} src={photo.images.medium.url} />;
      })}
    </>
  ) : null;
};

export default Photos;
