import '../styles/globals.scss';
import '../styles/scrollbar.scss';
import '../styles/inputs.scss';
import '../styles/font.scss';
import type { AppProps } from 'next/app';
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import PreLayer from 'services/preLayer';
import Window from 'components/windows/window';
import { store } from 'stores/store';
import Suggest from 'components/suggests [ modal ]/suggest';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PreLayer />
      <Suggest />
      <Window />

      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
