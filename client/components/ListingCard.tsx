import 'twin.macro';
import React from 'react';

import Icon from './Icon';

import {ProductListing} from '../api/constants';

const ListingCard: React.FC<{item: ProductListing}> = ({item}) => {
  return (
    <>
      <div tw="max-w-xs mx-auto bg-white shadow rounded-lg overflow-hidden">
        <img
          tw="h-48 w-full object-cover"
          src={item.photos[0]?.url || ''}
          alt="cover"
        />

        <div tw="px-4 py-2">
          <h1 tw="text-gray-900 font-bold text-sm uppercase mb-0">
            {item.shortDescription}
          </h1>
        </div>

        <div tw="px-4">
          <h1 tw="text-orange-300 font-semibold text-lg">$129</h1>
        </div>

        <div tw="px-4">
          <p tw="text-gray-600 text-xs">{item.longDescription}</p>
        </div>

        <div tw="flex items-center px-4">
          <p tw="text-gray-600 text-xs mr-2">{item.noOfRooms} Rooms</p>
          <p tw="text-gray-600 text-xs mr-2">{item.noOfBedRooms} BHK</p>
          <p tw="text-gray-600 text-xs">
            {item.squareMeter} ft<sup>2</sup>
          </p>
        </div>

        <div tw="flex items-center justify-end px-4 pt-2 pb-4">
          <Icon
            name="heart"
            tw="cursor-pointer mr-3 text-gray-600 hover:text-gray-800"
          />
          <Icon
            name="external-link"
            tw="cursor-pointer text-gray-600 hover:text-gray-800"
          />
        </div>
      </div>
    </>
  );
};

export default ListingCard;
