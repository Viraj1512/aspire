export interface Owner {
  login: string;
  id: number;
  type: string;
  site_admin: boolean;
  html_url: string;
  avatar_url: string;
}

export interface IRepository {
  id: string;
  name: string;
  description?: string;
  html_url: string;
  commits_url: string;
  tags_url: string;
  releases_url: string;
  contributors_url: string;
  deployments_url: string;
  branches_url: string;
  stargazers_count: number;
  watchers_count: number;
  default_branch: string;
  size: number;
  language?: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  open_issues_count: number;
  license?: { name: string };
  topics?: string[];
  visibility: string;
  private: boolean;
  owner: Owner;
  releases?: IRelease[];
  seen?: boolean;
}

export interface IRelease {
  id: string;
  tag_name: string;
  name: string;
  body: string;
  created_at: string;
  html_url?: string;
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  seen?: boolean;
}
