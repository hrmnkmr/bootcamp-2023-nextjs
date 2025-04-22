import { AppProps } from 'next/app';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  // `Component` を `React.ComponentType` にキャスト
  const WrappedComponent = Component as React.ComponentType<any>;

  return <WrappedComponent {...pageProps} />;
}


// import loadsh from "lodash";
// loadsh.filter([1, 2, 3], (item) => item > 1);
