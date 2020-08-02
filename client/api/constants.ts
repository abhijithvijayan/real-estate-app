export type ProductListing = {
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
  data: ProductListing[];
  message: string;
};

// **** ---------------------------- **** //

export enum AuthApiRoutes {
  LOGIN = 'login',
}

export enum ProductApiRoutes {
  GET_PRODUCT_LISTINGS = 'getProductListings',
}

export type Routes = ProductApiRoutes | AuthApiRoutes;

const endpoints: Endpoints = {
  login: {
    path: '/api/v1/auth/signin',
    method: 'POST',
    noAuth: true,
  },

  getProductListings: {
    path: '/api/v1/property/listing',
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
