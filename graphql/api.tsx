import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import React from 'react';
import { SERVER_URL } from '../variables';
import { Mutation, Query } from './types';


export type GraphQLResponse = Mutation & Query;

////////////////////////////////////////////////////////////////////////////

//const link = createUploadLink({ uri: 'https://mamba-backend.herokuapp.com/graphql' });
const link = createUploadLink({ uri: SERVER_URL });

export const apolloClient = new ApolloClient({
    // @ts-ignore
    //link: link,
    uri: SERVER_URL,
    cache: new InMemoryCache()
});

export const ApolloProviderWithClient: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <ApolloProvider client={apolloClient}>
        { children }
    </ApolloProvider>
);
