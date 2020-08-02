/* eslint-disable @typescript-eslint/explicit-module-boundary-types,  @typescript-eslint/explicit-function-return-type */
import useSWR, {ConfigInterface} from 'swr';
import api, {ApiRequestProps} from './index';

/**
 *  ApiRequestProps => fireUpApiRequest() config
 *  ConfigInterface => swr config
 */
export default function useRequest(
  {key, route = [], params = {}}: ApiRequestProps,
  {initialData, ...config}: ConfigInterface = {}
) {
  const {data: response, error, isValidating, revalidate, mutate} = useSWR(
    (): any => {
      return api({key, route, params});
    },
    {
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: 'InitialData',
        headers: {},
        data: initialData,
      },
    }
  );

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    revalidate,
    mutate,
  };
}
