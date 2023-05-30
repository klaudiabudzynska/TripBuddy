export type PhotosProps = {
  locationId: string;
};

export type LocationDetailPhoto = {
  id: string;
  caption: string;
  images: {
    medium: PhotoSpec;
  };
};

type PhotoSpec = {
  height: number;
  width: number;
  url: string;
};
