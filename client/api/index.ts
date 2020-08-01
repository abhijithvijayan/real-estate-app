import axios, {AxiosInstance, AxiosPromise} from 'axios';

import {Routes, getEndpointProps, RequestProps} from './constants';
import getServerApiUrl from './getServerApiUrl';

const axiosInstance: AxiosInstance = axios.create({
  // baseURL: '/api/v1', // this breaks SSR
  headers: {},
});

export type ApiRequestProps = {
  key: Routes;
  route?: (string | number)[];
  isServer?: boolean;
  params?: {
    [key: string]: any;
  };
};

function fireUpApiRequest({
  key,
  route = [],
  params = {},
  isServer = false,
}: ApiRequestProps): AxiosPromise<any> {
  const {path, ...other} = getEndpointProps(key);
  let url: string = path;

  if (isServer) {
    // build http://localhost:{PORT}
    url = getServerApiUrl(url);
  }

  const request: RequestProps = {path: url, ...other};

  if (route.length > 0) {
    /**
     *  Append to existing path
     *  request.path => /users, route => ['view', 'id']
     *  new path => '/users/view/id'
     */
    request.path += `/${route.join('/')}`;
  }

  if (request.method === undefined || request.method === 'GET') {
    request.method = 'GET';
  }

  return axiosInstance({
    ...(request.method === 'POST' && {data: params}),
    method: request.method,
    url: request.path,
  });
}

export default fireUpApiRequest;
