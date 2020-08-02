import React, {useEffect} from 'react';
import {NextPageContext} from 'next';
import Router from 'next/router';
import tw, {css} from 'twin.macro';

import BodyWrapper from '../../components/BodyWrapper';
import ListingCard from '../../components/ListingCard';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

import {SidebarContextProvider} from '../../contexts/sidebar-context';
import {getToken, getCookieFromReq} from '../../util/token';
import useGetRequest from '../../api/useGetRequest';
import {useStoreState} from '../../state/store';
import {
  FavouritePropertyIdsResponse,
  PropertiesListingResponse,
  PropertyApiRoutes,
  getEndpointProps,
  AppRoutes,
} from '../../api/constants';
import api from '../../api';

interface AppStateProps {
  initialFavourites?: FavouritePropertyIdsResponse;
  initialListings?: PropertiesListingResponse;
  error: boolean;
}

const ListingPage = ({
  initialFavourites,
  initialListings,
}: AppStateProps): JSX.Element => {
  const {isAuthenticated} = useStoreState((s) => s.auth);

  // get id's using swr
  const {data: userFavourites, mutate} = useGetRequest<
    FavouritePropertyIdsResponse
  >(
    {
      url: getEndpointProps(PropertyApiRoutes.FAVOURITE_PROPERTIES_IDS).path,
      headers: {Authorization: `Bearer ${getToken()}`},
    },
    {initialData: initialFavourites}
  );

  // get property listings using swr
  const {data: listings, error: listingsError} = useGetRequest<
    PropertiesListingResponse
  >(
    {
      url: getEndpointProps(PropertyApiRoutes.GET_PROPERTY_LISTINGS).path,
      headers: {Authorization: `Bearer ${getToken()}`},
    },
    {initialData: initialListings}
  );

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
                      Listings
                    </h2>

                    {listings.data.length > 0 ? (
                      <div tw="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                        {listings.data.map((item) => {
                          const isInFavourites: boolean = (
                            userFavourites?.data || []
                          ).includes(item.id);

                          return (
                            <ListingCard
                              key={item.id}
                              item={item}
                              favourite={isInFavourites}
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
ListingPage.getInitialProps = async (appContext: NextPageContext) => {
  try {
    const token: string | null = getCookieFromReq(appContext?.req);

    if (token) {
      const {
        data: favourites,
      }: {data: FavouritePropertyIdsResponse} = await api({
        key: PropertyApiRoutes.FAVOURITE_PROPERTIES_IDS,
        isServer: true,
        token,
      });

      const {data: listings}: {data: PropertiesListingResponse} = await api({
        key: PropertyApiRoutes.GET_PROPERTY_LISTINGS,
        isServer: true,
        token,
      });

      return {
        error: false,
        initialFavourites: favourites,
        initialListings: listings,
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    console.log('SSR Error!');
  }

  return {error: true};
};

export default ListingPage;
