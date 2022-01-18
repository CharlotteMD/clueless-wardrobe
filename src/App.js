import React, { useState, useEffect } from 'react';
import { Amplify, API } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { listCluelessWardrobeV1S } from './graphql/queries';

Amplify.configure(awsExports);

function App({ signOut, user }) {

  const [wardrobe, setWardrobe] = useState([])

  useEffect(() => {
    fetchAllWardrobe();
  }, []);

  async function fetchAllWardrobe() {
    try {
      const wardrobeListData = await API.graphql({ query: listCluelessWardrobeV1S });
      setWardrobe(wardrobeListData.data.listCluelessWardrobeV1S.items)
      console.log(wardrobeListData.data.listCluelessWardrobeV1S.items)
    } catch (err) {
      console.log({ err })
      console.log(wardrobe)
    }
  }


  

  return (
    <div className="App">
      <h1>Hello {user.attributes.email}</h1>
      <button onClick={signOut}>Sign out</button>
      {
        wardrobe.map(i => (
          <div key={i.id}>
            <h3>{i.itemName}</h3>
            <p>Type: {i.itemType}</p>
          </div>
        ))
      }
    </div>
  );
}

export default withAuthenticator(App);