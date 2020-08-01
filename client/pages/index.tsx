import React, {useEffect} from 'react';
import Router from 'next/router';
import 'twin.macro';

import BodyWrapper from '../components/BodyWrapper';
import DashboardPage from '../components/Dashboard';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

import {SidebarContextProvider} from '../contexts/sidebar-context';
import {useStoreState} from '../state/store';

const IndexPage: React.FC = () => {
  const {isAuthenticated} = useStoreState((s) => s.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push('/signin');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
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
