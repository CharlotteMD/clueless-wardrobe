import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import appSyncConfig from "./../aws-exports";
import DataEntry from "./data-entry";
import ApiPractise from "./api-practise";

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

    return (
        <ApolloProvider client={client}>
            {/* <DataEntry/> */}
            <ApiPractise />
        </ApolloProvider>
    )
}

export default ApiEntry;