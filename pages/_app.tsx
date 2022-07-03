import type { AppProps } from 'next/app';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProviderWithClient } from '../graphql/api';
import { store } from '../redux/store';
import '../styles/globals.scss';


export const Providers: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <ApolloProviderWithClient>
            <ReduxProvider store={store}>
                { children }
            </ReduxProvider>
        </ApolloProviderWithClient>
    );
}


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Providers>
            <Component {...pageProps} />
        </Providers>
    );
}

export default MyApp

// expose redux store to cypress
// @ts-ignore
if (typeof window !== 'undefined' && window.Cypress) {
    // @ts-ignore
    window.store = store;
}
