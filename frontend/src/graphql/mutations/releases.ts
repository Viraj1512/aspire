import { gql } from '@apollo/client';

// Mark a release as seen
export const MARK_RELEASE_SEEN = gql`
  mutation markAsSeen($id: ID!) {
    markAsSeen(id: $id)
  }
`;