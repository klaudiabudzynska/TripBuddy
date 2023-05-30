export type LocationDetailsProps = {
  location_id?: string;
  name?: string;
  address_obj?: {
    address_string: string;
    country: string;
  };
  description?: string;
};
