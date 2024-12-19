import { gql } from "@apollo/client";

// Fetch all the releases for the selected repository
export const GET_RELEASES = gql`
  query GetReleases($owner: String!, $repo: String!) {
    releases(owner: $owner, repo: $repo) {
      id
      tag_name
      name
      body
      created_at
      html_url
      author {
        login
        avatar_url
        html_url
      }
    }
  }
`;
