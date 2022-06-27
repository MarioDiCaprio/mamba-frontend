import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import { Mutation, Query } from './types';


export type GraphQLResponse = Mutation & Query;

////////////////////////////////////////////////////////////////////////////

export const apolloClient = new ApolloClient({
    uri: 'https://mamba-backend.herokuapp.com/graphql',
    cache: new InMemoryCache()
});

export const ApolloProviderWithClient: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <ApolloProvider client={apolloClient}>
        { children }
    </ApolloProvider>
);
