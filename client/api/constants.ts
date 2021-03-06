export enum AppRoutes {
  SIGN_IN = '/signin',
  SIGN_UP = '/signup',
  SIGN_OUT = '/signout',
  ROOT = '/',
  PROFILE = '/profile',
  SETTINGS = '/settings',
  LIKED_LISTINGS = '/favourites',
  PROPERTIES_LISTINGS = '/home/listing',
}

export type FavouritePropertyIdsResponse = {
  status: boolean;
  message: string;
  data: string[];
};

export type FavouritePropertyListingResponse = {
  status: boolean;
  message: string;
  data: {
    id: string;
    createdAt: string;
    updatedAt: string;
    __properties__: PropertyListing[];
  };
};

export type PropertyListing = {
  id: string;
  title: string;
  price: string;
  squareFeet: string;
  shortDescription: string;
  longDescription: string;
  noOfRooms: number;
  noOfBedRooms: number;
  noOfBathRooms: number;
  createdAt: string;
  updatedAt: string;
  photos: {
    id: string;
    url: string;
  }[];
  address: {
    id: string;
    street: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    zipCode: {
      id: string;
      createdAt: string;
      updatedAt: string;
      city: {
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
      };
      state: {
        id: string;
        code: string;
        name: string;
        createdAt: string;
        updatedAt: string;
      };
      country: {
        id: string;
        code: string;
        name: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
  __listing__: {
    id: string;
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type PropertiesListingResponse = {
  status: true;
  data: PropertyListing[];
  message: string;
};

export type PropertyListingResponse = {
  status: true;
  data: PropertyListing;
  message: string;
};

// **** ---------------------------- **** //

export enum AuthApiRoutes {
  SIGN_IN = 'signin',
  SIGN_UP = 'signup',
}

export enum PropertyApiRoutes {
  GET_PROPERTY_LISTINGS = 'getPropertyListings',
  PROPERTY_FAVOURITE_ACTION = 'propertyFavouriteAction',
  LIST_FAVOURITE_PROPERTIES = 'listFavouriteProperties',
  FAVOURITE_PROPERTIES_IDS = 'favouritePropertiesIds',
  GET_PROPERTY_LISTING = 'getPropertyListing',
}

export type Routes = PropertyApiRoutes | AuthApiRoutes;

const endpoints: Endpoints = {
  signin: {
    path: '/api/v1/auth/signin',
    method: 'POST',
    noAuth: true,
  },

  signup: {
    path: '/api/v1/auth/signup',
    method: 'POST',
    noAuth: true,
  },

  getPropertyListings: {
    path: '/api/v1/property/listing',
  },

  propertyFavouriteAction: {
    path: '/api/v1/property/listing/favourites',
    method: 'POST',
  },

  listFavouriteProperties: {
    path: '/api/v1/property/listing/favourites/all',
  },

  favouritePropertiesIds: {
    path: '/api/v1/property/listing/favourites/ids',
  },

  getPropertyListing: {
    path: '/api/v1/property/listing', // route => /api/v1/property/listing/uuid
  },
};

// **** ---------------------------- **** //

export type RequestProps = {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  noAuth?: boolean;
};

type Endpoints = Record<Routes, RequestProps>;

export function getEndpointProps(route: Routes): RequestProps {
  return endpoints[route];
}
