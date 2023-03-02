import { gql } from 'graphql-tag';

export default gql`
  type Query {
    AccessCosmos(cosmosContainer: String, queryCommand: String): String
  }`;