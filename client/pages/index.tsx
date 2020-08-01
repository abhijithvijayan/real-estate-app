import 'twin.macro';
import React from 'react';

import BodyWrapper from '../components/BodyWrapper';
import DashboardPage from '../components/Dashboard';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

import {SidebarContextProvider} from '../contexts/sidebar-context';

const IndexPage: React.FC = () => {
  return (
    <>
      <SidebarContextProvider>
        <BodyWrapper>
          <div tw="flex h-screen bg-gray-200">
            <Sidebar />

            <div tw="flex flex-col flex-1 overflow-hidden">
              <Header />

              <main tw="flex flex-col flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <DashboardPage />
              </main>
            </div>
          </div>
        </BodyWrapper>
      </SidebarContextProvider>
    </>
  );
};

export default IndexPage;
