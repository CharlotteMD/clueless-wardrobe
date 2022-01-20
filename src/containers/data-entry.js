import { gql, useQuery } from '@apollo/client';

const DataEntry = () => {

    const WARDROBE_LIST = gql`
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
    `;
    
const { loading, error, data } = useQuery(WARDROBE_LIST);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error...</p>;

console.log(data);

    return data.listCluelessWardrobeV1S.items.map(({                 
        itemId,
        itemName,
        itemType,
        lastWorn,
        mainColor,
        otherColors 
    }) => (
        <div key={itemId}>
            <h2>{itemName}</h2>
            <p>{lastWorn}</p>
            <p>Colors: {mainColor} {otherColors}</p>
        </div>
    ));
};

export default DataEntry;