import React, {useEffect} from 'react';
import {NextPageContext} from 'next';
import tw, {css} from 'twin.macro';
import Router from 'next/router';

import BodyWrapper from '../components/BodyWrapper';
import ListingCard from '../components/ListingCard';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Loader from '../components/Loader';

import {SidebarContextProvider} from '../contexts/sidebar-context';
import {getToken, getCookieFromReq} from '../util/token';
import useGetRequest from '../api/useGetRequest';
import {useStoreState} from '../state/store';
import {
  FavouritePropertyListingResponse,
  PropertyApiRoutes,
  getEndpointProps,
  AppRoutes,
} from '../api/constants';
import api from '../api';

interface AppStateProps {
  initialFavourites?: FavouritePropertyListingResponse;
  error: boolean;
}

const FavouritesPage = ({initialFavourites}: AppStateProps): JSX.Element => {
  const {isAuthenticated} = useStoreState((s) => s.auth);

  // get property listings using swr
  const {data: favourites, error: favouritesError, mutate} = useGetRequest<
    FavouritePropertyListingResponse
  >(
    {
      url: getEndpointProps(PropertyApiRoutes.LIST_FAVOURITE_PROPERTIES).path,
      headers: {Authorization: `Bearer ${getToken()}`},
    },
    {initialData: initialFavourites}
  );

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push(AppRoutes.SIGN_IN);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  if (favouritesError) {
    return <div>failed to load data</div>;
  }

  if (!favourites) {
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
                <section tw="flex flex-1 flex-col sm:flex-row">
                  <div
                    css={[
                      tw`flex-shrink p-6 bg-white`,

                      css`
                        flex-grow: 2;
                        flex-basis: 0%;
                      `,
                    ]}
                  >
                    <h2 tw="text-gray-800 font-medium capitalize text-xl md:text-2xl pb-3">
                      Saved listings
                    </h2>

                    {favourites.data.__properties__.length > 0 ? (
                      <div tw="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                        {favourites.data.__properties__.map((item) => {
                          return (
                            <ListingCard
                              key={item.id}
                              item={item}
                              favourite={true}
                              mutate={mutate}
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <div>
                        <img
                          src="/no-data.png"
                          alt="empty"
                          css={[
                            tw`lg:w-8/12 flex items-center justify-center mx-auto`,

                            css`
                              max-width: 80%;
                            `,
                          ]}
                        />
                      </div>
                    )}
                  </div>
                </section>
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
FavouritesPage.getInitialProps = async (appContext: NextPageContext) => {
  try {
    const token: string | null = getCookieFromReq(appContext?.req);

    if (token) {
      const {data}: {data: FavouritePropertyListingResponse} = await api({
        key: PropertyApiRoutes.LIST_FAVOURITE_PROPERTIES,
        isServer: true,
        token,
      });

      return {error: false, initialFavourites: data};
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    console.log('SSR Error!');
  }

  return {error: true};
};

export default FavouritesPage;
