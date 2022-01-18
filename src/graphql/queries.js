/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCluelessWardrobeV1 = /* GraphQL */ `
  query GetCluelessWardrobeV1($itemId: String!) {
    getCluelessWardrobeV1(itemId: $itemId) {
      itemId
      itemName
      itemType
      lastWorn
      mainColor
      otherColors
    }
  }
`;
export const listCluelessWardrobeV1S = /* GraphQL */ `
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
