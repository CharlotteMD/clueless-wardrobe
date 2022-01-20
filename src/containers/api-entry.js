import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";

import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
// import ApolloClient from "apollo-client";
import { ApolloProvider, ApolloClient, InMemoryCache, gql } from '@apollo/client';
// import { InMemoryCache } from "apollo-cache-inmemory";

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import appSyncConfig from "./../aws-exports";

const url = appSyncConfig.aws_appsync_graphqlEndpoint;
const region = appSyncConfig.aws_appsync_region;

const httpLink = createHttpLink({ uri: url });



const ApiEntry = ({ token }) => {

    const auth = {
        type: appSyncConfig.aws_appsync_authenticationType,
        apiKey: appSyncConfig.aws_appsync_apiKey,
        jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
        // credentials: async () => credentials, // Required when you use IAM-based auth.
      };

    const link = ApolloLink.from([
        createAuthLink({ url, region, auth }),
        createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
    ]);

    const client = new ApolloClient({
        link,
        cache: new InMemoryCache(),
    });

    const data = client
        .query({
            query: gql`
            query ListCluelessWardrobeV1S(
                $filter: TableCluelessWardrobeV1FilterInput
                $limit: Int
                $nextToken: String
              ) {
                listCluelessWardrobeV1S(
                  filter: $filter
                  limit: $limit
                  nextToken: $nextToken
                ) {
                  items {
                    itemId
                    itemName
                    itemType
                    lastWorn
                    mainColor
                    otherColors
                  }
                  nextToken
                }
              }
            `
        })
    .then(result => console.log(result));

    return (
        <ApolloProvider client={client}>
            <h1>{data}</h1>
        </ApolloProvider>
    )
}

export default ApiEntry;