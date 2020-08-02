/**
 *  real-estate-app
 *
 *  @author abhijithvijayan <https://abhijithvijayan.in>
 */

import App, {AppProps, AppInitialProps, AppContext} from 'next/app';
import {ThemeProvider} from 'styled-components';
import {StoreProvider} from 'easy-peasy';
import {parseCookies} from 'nookies';
import {useEffect} from 'react';
import Head from 'next/head';
import 'emoji-log';

import {initializeStore, StoreModelProps} from '../state/store';
import {decodeToken, DecodedTokenPayload} from '../util/token';

// common styles
import '../styles/main.scss';

// ToDo: types
// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-webpack-loader-syntax, import/no-unresolved, node/no-missing-require
const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/base/_variables.scss'); // extract sass variables

export interface Theme {
  [key: string]: string;
}

interface AppStateProps extends AppProps {
  initialState: StoreModelProps;
}

function CustomNextApp({
  Component,
  pageProps,
  initialState,
}: AppStateProps): JSX.Element {
  const store = initializeStore(initialState);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.emoji('🦄', '_app rendered');
  }, []);

  return (
    <>
      <Head>
        <title>Real Estate App</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>

      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </ThemeProvider>
      </StoreProvider>
    </>
  );
}

// Every page is server-side rendered.
CustomNextApp.getInitialProps = async (
  appContext: AppContext
): Promise<{
  initialState: any;
  pageProps: any;
}> => {
  // initialize store in server
  const store = initializeStore();

  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps: AppInitialProps = await App.getInitialProps(appContext);
  const cookies = parseCookies(appContext.ctx);

  // Parse
  const token = cookies.token || null;

  const tokenPayload: DecodedTokenPayload | null = token
    ? decodeToken(token)
    : null;

  if (tokenPayload) {
    store.dispatch.auth.set(tokenPayload);
  }

  return {...appProps, initialState: store.getState()};
};

export default CustomNextApp;
