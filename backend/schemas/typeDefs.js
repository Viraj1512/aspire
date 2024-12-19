import { gql } from "apollo-server";

const typeDefs = gql`
type Owner {
  login: String!
  id: Int!
  html_url: String!
  avatar_url: String!
  type: String!
  site_admin: Boolean!
}

type OriginRepository {
  id: ID!
  name: String!
  html_url: String!
  description: String
  commits_url: String!
  tags_url: String!
  releases_url: String!
  contributors_url: String!
  deployments_url: String!
  branches_url: String!
  stargazers_count: Int!
  watchers_count: Int!
  default_branch: String!
  size: Int!
  language: String
  created_at: String!
  updated_at: String!
  pushed_at: String
  open_issues_count: Int!
  license: String
  topics: [String]
  visibility: String!
  private: Boolean!
  owner: Owner!
}

type Author {
  login: String!
  avatar_url: String!
  html_url: String!
}

type OriginRelease {
  id: ID!
  tag_name: String!
  name: String!
  body: String!
  created_at: String!
  html_url: String
  author: Author!
}

type Release {
  id: ID!
  version: String!
  name: String!
  html_url: String!
  published_at: String!
  seen: Boolean!
}

type Repository {
  id: ID!
  name: String!
  description: String
  html_url: String!
  releases: [Release]
  seen: Boolean!
}

type Query {
  repositories: [Repository]
  originRepositories: [OriginRepository]
  releases(owner: String!, repo: String!): [OriginRelease]
}

type Mutation {
  addRepository(owner: String!, repo: String!): Repository
  markAsSeen(id: ID!): Boolean
}
`;

export default typeDefs;