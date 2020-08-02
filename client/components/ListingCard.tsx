/* eslint-disable jsx-a11y/click-events-have-key-events */
import {useFormState} from 'react-use-form-state';
import React, {useEffect} from 'react';
import {AxiosResponse} from 'axios';
import tw, {css} from 'twin.macro';

import Icon from './Icon';

import {
  FavouritePropertyListingResponse,
  FavouritePropertyIdsResponse,
  PropertyApiRoutes,
  PropertyListing,
} from '../api/constants';
import api from '../api';

type Props = {
  item: PropertyListing;
  favourite: boolean;
  mutate: () => Promise<
    | AxiosResponse<
        FavouritePropertyListingResponse | FavouritePropertyIdsResponse
      >
    | undefined
  >;
};

const ListingCard: React.FC<Props> = ({item, favourite, mutate}) => {
  const [
    {setField, values},
    {checkbox: checkboxProps, label: labelProps},
  ] = useFormState<{
    action: boolean;
  }>({action: favourite});

  useEffect(() => {
    // called on refetching
    setField('action', favourite);
  }, [favourite, setField]);

  async function handleSubmit(id: string, checked: boolean): Promise<void> {
    const action = checked ? 1 : 0;
    setField('action', checked);

    try {
      const {data}: {data: {status: boolean; message: string}} = await api({
        key: PropertyApiRoutes.PROPERTY_FAVOURITE_ACTION,
        params: {listingId: id, action},
      });

      if (data.status) {
        // check/uncheck action was successful
        // setLiked(checked);
      }

      // Call bound mutate for revalidation & refetching
      // https://swr.vercel.app/docs/mutation#bound-mutate
      mutate();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setField('action', !checked);
    }
  }

  return (
    <>
      <div tw="max-w-xs mx-auto bg-white shadow rounded-lg overflow-hidden">
        <img
          tw="h-48 w-full object-cover select-none"
          src={item.photos[0]?.url || ''}
          alt="cover"
        />

        <div tw="px-4 py-2">
          <h1 tw="text-gray-900 font-bold text-sm uppercase mb-0 select-none">
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
          <div
            tw="inline-flex"
            onClick={(): void => {
              handleSubmit(item.id, !values.action);
            }}
          >
            <label
              {...labelProps('action')}
              htmlFor={item.id}
              tw="block font-bold text-gray-500 cursor-pointer"
            >
              <input
                {...checkboxProps('action')}
                name={item.id}
                tw="mr-2 leading-tight hidden"
              />
              <Icon
                name="heart"
                css={[
                  tw`hover:text-gray-800 mr-3 text-gray-600 cursor-pointer`,

                  favourite &&
                    css`
                      svg {
                        fill: rgba(45, 55, 72, var(--text-opacity));
                      }
                    `,
                ]}
              />
            </label>
          </div>
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
