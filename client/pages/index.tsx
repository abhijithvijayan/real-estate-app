import React, {useEffect} from 'react';
import Router from 'next/router';

import 'twin.macro';

import BodyWrapper from '../components/BodyWrapper';
import DashboardPage from '../components/Dashboard';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

import {
  PropertyApiRoutes,
  getEndpointProps,
  ProductsListingResponse,
} from '../api/constants';
import {SidebarContextProvider} from '../contexts/sidebar-context';
import {useStoreState} from '../state/store';
import useGetRequest from '../api/useGetRequest';
import {getToken} from '../util/token';

const IndexPage: React.FC = () => {
  const {isAuthenticated} = useStoreState((s) => s.auth);

  // swr
  const {data, error} = useGetRequest<ProductsListingResponse>({
    url: getEndpointProps(PropertyApiRoutes.GET_PROPERTY_LISTINGS).path,
    headers: {Authorization: `Bearer ${getToken()}`},
  });

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push('/signin');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  if (error) {
    return <div>failed to load</div>;
  }

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <>
      <SidebarContextProvider>
        <BodyWrapper>
          <div tw="flex h-screen bg-gray-200">
            <Sidebar />

            <div tw="flex flex-col flex-1 overflow-hidden">
              <Header />

              <main tw="flex flex-col flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <DashboardPage listings={data.data} />
              </main>
            </div>
          </div>
        </BodyWrapper>
      </SidebarContextProvider>
    </>
  );
};

export default IndexPage;
