/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from 'next/link';
import tw from 'twin.macro';
import React from 'react';

import Icon from './Icon';

import {useSidebarContext} from '../contexts/sidebar-context';

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useSidebarContext();

  return (
    <>
      {/* Sidebar Overlay */}
      <div
        css={[
          tw`lg:hidden fixed inset-0 z-20 block transition-opacity bg-black opacity-50`,

          isSidebarOpen ? tw`block` : tw`hidden`,
        ]}
        onClick={(): void => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        css={[
          tw`lg:translate-x-0 lg:static lg:inset-0 fixed inset-y-0 left-0 z-30 w-56 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2`,

          isSidebarOpen
            ? tw`ease-out translate-x-0`
            : tw`ease-in -translate-x-full`,
        ]}
      >
        <div tw="flex items-center justify-center mt-4 mb-4 border-b">
          <span tw="mx-2 text-2xl font-semibold text-black pb-4">
            Real Estate App
          </span>
        </div>

        <nav tw="mt-10">
          <Link href="/">
            <a tw="flex items-center px-6 py-2 mt-4 text-purple-500 cursor-pointer">
              <Icon name="inbox" />

              <span tw="mx-4">Dashboard</span>
            </a>
          </Link>

          <Link href="/settings">
            <a tw="hover:bg-opacity-25 hover:text-gray-900 flex items-center px-6 py-2 mt-4 text-gray-700 cursor-pointer">
              <Icon name="settings" />

              <span tw="mx-4">Settings</span>
            </a>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
