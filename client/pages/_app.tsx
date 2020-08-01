/**
 *  real-estate-app
 *
 *  @author abhijithvijayan <https://abhijithvijayan.in>
 */

import 'emoji-log';
import {useEffect} from 'react';
import {AppProps} from 'next/app';
import Head from 'next/head';
import {ThemeProvider} from 'styled-components';

// common styles
import '../styles/main.scss';

// ToDo: types
// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-webpack-loader-syntax, import/no-unresolved, node/no-missing-require
const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../styles/base/_variables.scss'); // extract sass variables

export interface Theme {
  [key: string]: string;
}

function App({Component, pageProps}: AppProps): JSX.Element {
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

        <link rel="manifest" href="/manifest.json" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default App;
