/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {useState} from 'react';
import Link from 'next/link';
import 'twin.macro';

import Icon from './Icon';

import {useSidebarContext} from '../contexts/sidebar-context';
import {AppRoutes} from '../api/constants';

const Header: React.FC = () => {
  const setIsSidebarOpen = useSidebarContext()[1];
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <>
      <header tw="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
        <div tw="flex items-center">
          <button
            onClick={(): void => setIsSidebarOpen(true)}
            type="button"
            tw="focus:outline-none lg:hidden text-gray-500"
          >
            <Icon name="burger" tw="w-6 h-6" />
          </button>

          <div tw="lg:mx-0 relative mx-4">
            <Icon
              name="search"
              tw="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"
            />

            <input
              tw="sm:w-64 focus:border-indigo-600 w-32 pl-10 pr-4 rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        <div tw="flex items-center">
          <button type="button" tw="focus:outline-none flex mx-4 text-gray-600">
            <Icon name="bell" />
          </button>

          <div tw="relative">
            <button
              onClick={(): void => setDropdownOpen(!dropdownOpen)}
              type="button"
              tw="focus:outline-none relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow"
            >
              <img
                tw="object-cover w-full h-full"
                src="https://i.imgur.com/PgeHecN.png"
                alt="Unicorn Profile"
                width={999}
                height={1008}
              />
            </button>

            {dropdownOpen && (
              <>
                <div
                  onClick={(): void => setDropdownOpen(false)}
                  tw="fixed inset-0 z-10 w-full h-full"
                />

                <div tw="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
                  <Link href={AppRoutes.PROFILE}>
                    <a tw="hover:bg-indigo-600 hover:text-white block px-4 py-2 text-sm text-gray-700 cursor-pointer">
                      Profile
                    </a>
                  </Link>

                  <Link href={AppRoutes.SIGN_OUT}>
                    <a tw="hover:bg-indigo-600 hover:text-white block px-4 py-2 text-sm text-gray-700 cursor-pointer">
                      Logout
                    </a>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
