import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $description: String
    $quantity: Int!
    $categoryIds: [Int!]!
  ) {
    createProduct(
      name: $name
      description: $description
      quantity: $quantity
      categoryIds: $categoryIds
    ) {
      success
      message
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      success
      message
    }
  }
`;