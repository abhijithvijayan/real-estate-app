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
    path: '/',
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
