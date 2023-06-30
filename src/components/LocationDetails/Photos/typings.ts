export type PhotosProps = {
  locationId: string;
};

export type LocationDetailPhoto = {
  id: string;
  caption: string;
  images: {
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
