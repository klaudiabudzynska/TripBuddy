export type PhotosProps = {
  locationId: string;
  addClass?: any;
};

export type LocationDetailPhoto = {
  id: string;
  caption: string;
  images: {
    large: PhotoSpec;
    original: PhotoSpec;
    small: PhotoSpec;
    thumbnail: PhotoSpec;
    medium: PhotoSpec;
  };
};

type PhotoSpec = {
  height: number;
  width: number;
  url: string;
};
