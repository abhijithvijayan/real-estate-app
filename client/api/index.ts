import axios, {AxiosInstance, AxiosPromise, AxiosRequestConfig} from 'axios';

import {Routes, getEndpointProps, RequestProps} from './constants';
import getServerApiUrl from './getServerApiUrl';
import {getToken} from '../util/token';

const axiosInstance: AxiosInstance = axios.create({
  // baseURL: '/api/v1', // this breaks SSR
});

export type ApiRequestProps = {
  key: Routes;
  route?: (string | number)[];
  isServer?: boolean;
  token?: string;
  params?: {
    [key: string]: any;
  };
};

function fireUpApiRequest({
  key,
  route = [],
  params = {},
  token = null,
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

  const config: AxiosRequestConfig = {
    headers: {},
    ...(request.method === 'GET' && {params}),
    ...(request.method === 'POST' && {data: params}),
  };

  if (!request.noAuth) {
    if (!isServer) {
      // Todo: this will fail for SSR(use app context cookie token)
      config.headers.Authorization = `Bearer ${getToken()}`;
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return axiosInstance({
    ...config,
    method: request.method,
    url: request.path,
  });
}

export default fireUpApiRequest;
