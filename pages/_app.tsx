import type { AppProps } from 'next/app';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProviderWithClient } from '../graphql/api';
import { store } from '../redux/store';
import '../styles/globals.scss';


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProviderWithClient>
            <ReduxProvider store={store}>
                <Component {...pageProps} />
            </ReduxProvider>
        </ApolloProviderWithClient>

    );
}

export default MyApp
