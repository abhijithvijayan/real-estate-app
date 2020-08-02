import React, {useState} from 'react';
import tw, {css} from 'twin.macro';

import ListingCard from './ListingCard';

import {PropertyListing, PropertyApiRoutes} from '../api/constants';
import api from '../api';

const DashboardPage: React.FC<{listings: PropertyListing[]}> = ({listings}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Todo: get action value from listing itself

  async function handleSubmit(id: string, checked: boolean): Promise<void> {
    setLoading(true);
    setSelectedId(id);
    // setLiked(!liked);

    const action = checked ? 1 : 0;

    try {
      const {data}: {data: {status: boolean; message: string}} = await api({
        key: PropertyApiRoutes.PROPERTY_FAVOURITE_ACTION,
        params: {listingId: id, action},
      });

      if (data.status) {
        setLiked(checked);
      } else {
        // Do nothing if status fails
      }

      return;
    } catch (err) {
      // backend response
      if (err?.response?.data?.response) {
        // invalid password
        // const {
        //   data: {response},
        // } = err.response;
        // if (response && response.statusText) {
        //   setError(response.statusText);
        // }
      }
    }

    setLoading(false);
    setSelectedId(null);
  }

  return (
    <>
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
          <div tw="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {listings.map((item) => {
              return (
                <ListingCard
                  key={item.id}
                  item={item}
                  handleSubmit={handleSubmit}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
