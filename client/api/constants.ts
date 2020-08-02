export type PropertyListing = {
  id: string;
  squareMeter: string;
  shortDescription: string;
  longDescription: string;
  noOfRooms: number;
  noOfBedRooms: number;
  noOfBathRooms: number;
  createdAt: string;
  updatedAt: string;
  photos: {
    id: number; // Todo
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

export type ProductsListingResponse = {
  status: true;
  data: PropertyListing[];
  message: string;
};

// **** ---------------------------- **** //

export enum AuthApiRoutes {
  LOGIN = 'login',
}

export enum PropertyApiRoutes {
  GET_PROPERTY_LISTINGS = 'getPropertyListings',
  PROPERTY_FAVOURITE_ACTION = 'propertyFavouriteAction',
  LIST_FAVOURITE_PROPERTIES = 'listFavouriteProperties',
}

export type Routes = PropertyApiRoutes | AuthApiRoutes;

const endpoints: Endpoints = {
  login: {
    path: '/api/v1/auth/signin',
    method: 'POST',
    noAuth: true,
  },

  getPropertyListings: {
    path: '/api/v1/property/listing',
    method: 'GET',
  },

  propertyFavouriteAction: {
    path: '/api/v1/property/listing/favourites',
    method: 'POST',
  },

  listFavouriteProperties: {
    path: '/api/v1/property/listing/favourites',
    method: 'GET',
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
