import Router, {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {NextPageContext} from 'next';
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
  PropertyListingResponse,
  PropertyApiRoutes,
  getEndpointProps,
  AppRoutes,
} from '../../api/constants';
import api from '../../api';

interface AppStateProps {
  initialDetails?: PropertyListingResponse;
  error: boolean;
}

const PropertyListingViewPage = ({
  initialDetails,
}: AppStateProps): JSX.Element => {
  const {isAuthenticated} = useStoreState((s) => s.auth);
  const router = useRouter();
  const {id} = router.query;

  // get property listings using swr
  const {
    data: propertyListing,
    error: propertyListingError,
    mutate,
  } = useGetRequest<PropertyListingResponse>(
    {
      url: `${
        getEndpointProps(PropertyApiRoutes.GET_PROPERTY_LISTING).path
      }/${id}`, // Note: id is being appended to path
      headers: {Authorization: `Bearer ${getToken()}`},
    },
    {initialData: initialDetails}
  );

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push(AppRoutes.SIGN_IN);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  if (propertyListingError) {
    return <div>failed to load data</div>;
  }

  if (!propertyListing) {
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
                      {propertyListing.data.title}
                    </h2>
                    <div tw="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                      <ListingCard
                        key={propertyListing.data.id}
                        item={propertyListing.data}
                        favourite={false} // Todo: get this data from SSR
                        mutate={mutate}
                      />
                    </div>
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
PropertyListingViewPage.getInitialProps = async (
  appContext: NextPageContext
) => {
  const id = appContext.query.id as string;

  try {
    const token: string | null = getCookieFromReq(appContext?.req);

    if (token && id) {
      const {data}: {data: PropertyListingResponse} = await api({
        key: PropertyApiRoutes.GET_PROPERTY_LISTING,
        isServer: true,
        token,
        route: [id],
      });

      return {error: false, initialDetails: data};
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    console.log('SSR Error!');
  }

  return {error: true};
};

export default PropertyListingViewPage;
