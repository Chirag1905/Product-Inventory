import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      success
      categories {
        id
        name
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts(
    $search: String
    $categoryIds: [Int!]
    $page: Int!
    $limit: Int!
  ) {
    products(
      search: $search
      categoryIds: $categoryIds
      page: $page
      limit: $limit
    ) {
      success
      products {
        id
        name
        quantity
        createdAt
        categories {
          id
          name
        }
      }
      pagination {
        page
        total
        totalPages
      }
    }
  }
`;