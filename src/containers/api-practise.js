import { gql, useQuery } from '@apollo/client';

const ApiPractise = () => {

    const GET_ITEMS = gql`
        query getItems {
            listCluelessWardrobeV1S(filter: {
                itemType: {
                    eq: "cardigan"
                }
            }) {
                items {
                    itemName
                    itemId
                }
            }
        }
    `;
    
const { loading, error, data } = useQuery(GET_ITEMS);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error...</p>;

    return data.listCluelessWardrobeV1S.items.map(({                 
        itemId,
        itemName
    }) => (
        <div key={itemId}>
            <h1>{itemName}</h1>
        </div>
    ));
};

export default ApiPractise;