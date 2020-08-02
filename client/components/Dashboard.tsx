import tw, {css} from 'twin.macro';
import React from 'react';

import ListingCard from './ListingCard';

import {ProductListing} from '../api/constants';

const DashboardPage: React.FC<{listings: ProductListing[]}> = ({listings}) => {
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
              return <ListingCard key={item.id} item={item} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
