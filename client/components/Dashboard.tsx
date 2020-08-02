import React from 'react';
import tw, {css} from 'twin.macro';

import ListingCard from './ListingCard';

import {PropertyListing, FavouritePropertyListing} from '../api/constants';

type Props = {
  listings: PropertyListing[];
  favourites: FavouritePropertyListing[];
};

const DashboardPage: React.FC<Props> = ({listings, favourites}) => {
  const favouritePropertyIdCollection = favourites.map((item) => item.id);
  // Todo: get action value from listing itself

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
              const isInFavourites: boolean = favouritePropertyIdCollection.includes(
                item.id
              );

              return (
                <ListingCard
                  key={item.id}
                  item={item}
                  favourite={isInFavourites}
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
