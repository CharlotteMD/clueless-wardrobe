import React from 'react';
import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import ApiEntry from './containers/api-entry';

Amplify.configure(awsExports);

function App({ signOut, user }) {

  const token = user.signInUserSession.accessToken.jwtToken;

  return (
    <div className="App">
      <h1>Hello {user.attributes.email}</h1>
      <button onClick={signOut}>Sign out</button>
      <ApiEntry token ={token}/>
    </div>
  );
}

export default withAuthenticator(App);