import React, {useEffect} from 'react';
import {destroyCookie} from 'nookies';
import {AppContext} from 'next/app';
import Router from 'next/router';

import {useStoreActions} from '../state/store';
import {AppRoutes} from '../api/constants';

const LogoutPage = (): JSX.Element => {
  const logout = useStoreActions((s) => s.auth.logout);
  const reset = useStoreActions((s) => s.reset);

  useEffect(() => {
    logout();
    reset();

    Router.push(AppRoutes.ROOT);
  }, [logout, reset]);

  return <div />;
};

// This doesn't work sometimes
LogoutPage.getInitialProps = async (
  appContext: AppContext
): Promise<unknown> => {
  destroyCookie(appContext.ctx, 'token');

  // https://err.sh/vercel/next.js/empty-object-getInitialProps
  return {logout: true};
};

export default LogoutPage;
