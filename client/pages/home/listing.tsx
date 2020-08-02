import React, {useEffect} from 'react';
import {NextPageContext} from 'next';
import Router from 'next/router';
import 'twin.macro';

import BodyWrapper from '../../components/BodyWrapper';
import DashboardPage from '../../components/Dashboard';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

import {SidebarContextProvider} from '../../contexts/sidebar-context';
import {getToken, getCookieFromReq} from '../../util/token';
import useGetRequest from '../../api/useGetRequest';
import {useStoreState} from '../../state/store';
import {
  FavouritePropertyListingResponse,
  ProductsListingResponse,
  PropertyApiRoutes,
  getEndpointProps,
  AppRoutes,
} from '../../api/constants';
import api from '../../api';

interface AppStateProps {
  favourites?: FavouritePropertyListingResponse;
  error: boolean;
}

const ListingPage = ({favourites}: AppStateProps): JSX.Element => {
  const {isAuthenticated} = useStoreState((s) => s.auth);

  // swr
  const {data: userFavourites} = useGetRequest<
    FavouritePropertyListingResponse
  >(
    {
      url: getEndpointProps(PropertyApiRoutes.LIST_FAVOURITE_PROPERTIES).path,
      headers: {Authorization: `Bearer ${getToken()}`},
    },
    {initialData: favourites}
  );
  const {data: listings, error: listingsError} = useGetRequest<
    ProductsListingResponse
  >({
    url: getEndpointProps(PropertyApiRoutes.GET_PROPERTY_LISTINGS).path,
    headers: {Authorization: `Bearer ${getToken()}`},
  });

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push(AppRoutes.SIGN_IN);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  if (listingsError) {
    return <div>failed to load</div>;
  }

  if (!listings) {
    return (
      <BodyWrapper>
        <Loader />
      </BodyWrapper>
    );
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
                <DashboardPage
                  listings={listings.data}
                  favourites={userFavourites?.data || []}
                />
              </main>
            </div>
          </div>
        </BodyWrapper>
      </SidebarContextProvider>
    </>
  );
};

// page is server-side rendered.
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
ListingPage.getInitialProps = async (appContext: NextPageContext) => {
  try {
    const token: string | null = getCookieFromReq(appContext?.req);

    if (token) {
      const {data}: {data: FavouritePropertyListingResponse} = await api({
        key: PropertyApiRoutes.LIST_FAVOURITE_PROPERTIES,
        isServer: true,
        token,
      });

      return {props: {error: false, favourites: data}};
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    console.log('SSR Error!');
  }

  return {props: {error: true}};
};

export default ListingPage;
