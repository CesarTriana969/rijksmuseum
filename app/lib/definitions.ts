
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};


export type Artwork = {
  links: {
    self: string;
    web: string;
  };
  id: string;
  objectNumber: string;
  title: string;
  hasImage: boolean;
  principalOrFirstMaker: string;
  longTitle: string;
  showImage: boolean;
  permitDownload: boolean;
  webImage: {
    guid: string;
    offsetPercentageX: number;
    offsetPercentageY: number;
    width: number;
    height: number;
    url: string;
  };
  headerImage: {
    guid: string;
    offsetPercentageX: number;
    offsetPercentageY: number;
    width: number;
    height: number;
    url: string;
  };
  productionPlaces: string[];
};


export type ArtworkCard = {
  id: string;
  user_id: string;
  work_id: string;
  has_image: boolean;
  image: string;
  image_width: number;
  image_height: number;
  work_title: string;
  work_link: string;
  work_author: string;
}

