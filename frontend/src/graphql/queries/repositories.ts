import { gql } from '@apollo/client';

// Fetch all the tracked repositories from the database
export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      id
      name
      description
      seen
      html_url
      releases {
        id
        version
        name
        html_url
        published_at
        seen
      }
    }
  }
`;

// Fetch all the repositories from origin
export const GET_ORIGIN_REPOSITORIES = gql`
  query GetOriginRepositories {
    originRepositories {
      id
      name
      description
      html_url
      description
      commits_url
      tags_url
      releases_url
      contributors_url
      deployments_url
      branches_url
      stargazers_count
      watchers_count
      default_branch
      size
      language
      created_at
      updated_at
      pushed_at
      open_issues_count
      license
      topics
      visibility
      private
      owner {
        login
        avatar_url
        html_url
      }
    }
  }
`;
