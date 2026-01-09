export const typeDefs = `#graphql
  type Category {
    id: Int!
    name: String!
  }

  type Product {
    id: Int!
    name: String!
    description: String
    quantity: Int!
    createdAt: String!
    categories: [Category!]!
  }

  type Pagination {
    page: Int!
    limit: Int!
    total: Int!
    totalPages: Int!
  }

  type CategoryResponse {
    success: Boolean!
    message: String!
    categories: [Category!]!
  }

  type ProductListResponse {
    success: Boolean!
    message: String!
    products: [Product!]!
    pagination: Pagination!
  }

  type MutationResponse {
    success: Boolean!
    message: String!
  }

  type Query {
    categories: CategoryResponse!

    products(
      search: String
      categoryIds: [Int!]
      page: Int
      limit: Int
    ): ProductListResponse!
  }

  type Mutation {
    createProduct(
      name: String!
      description: String
      quantity: Int!
      categoryIds: [Int!]!
    ): MutationResponse!

    deleteProduct(id: Int!): MutationResponse!
  }
`;
