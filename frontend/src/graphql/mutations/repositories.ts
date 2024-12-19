import { gql } from '@apollo/client';

// Add a new repository to the database to track
export const ADD_REPOSITORY = gql`
  mutation AddRepository($owner: String!, $repo: String!) {
    addRepository(owner: $owner, repo: $repo) {
      id
      name
      description
    }
  }
`;