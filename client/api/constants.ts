export enum ProductApiRoutes {
  GET_PRODUCT_LISTINGS = 'getProductListings',
}

export type Routes = ProductApiRoutes;

const endpoints: Endpoints = {
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
