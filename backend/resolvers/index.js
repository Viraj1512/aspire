import { Octokit, App } from "octokit";
import { Repository, Release } from '../models/index.js';
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const {
  data,
} = await octokit.rest.users.getAuthenticated();
console.log("Github Login Successful, %s", data.login);

export default {
  Query: {
    // Fetch all the tracked repositories from the database
    repositories: async () => {
      return await Repository.findAll({ include: [{
        model: Release,
        as: 'releases'
      }] });
    },
    // Fetch all the repositories from origin
    originRepositories: async () => {
      return await octokit.paginate(octokit.rest.repos.listForAuthenticatedUser, {
        per_page: 100,
      });;
    },
    // Fetch all the releases for the selected repository
    releases: async (_, { owner, repo }) => {
      return await octokit.paginate(octokit.rest.repos.listReleases, { owner, repo });
    },
  },
  Mutation: {
    // Add a new repository to the database to track
    addRepository: async (_, { owner, repo }) => {
      const { data } = await octokit.rest.repos.get({ owner, repo });

      // Fetch releases for the repository
      const releases = await octokit.paginate(octokit.rest.repos.listReleases, { owner, repo });
      
      // Add repository to the database
      const repository = await Repository.create({
        id: data.id,
        name: data.name,
        description: data.description,
        html_url: data.html_url,
        seen: true,
        releaseIds: releases.map(release => release.id),
      });

      // Add releases to the database
      const releasePromises = releases.map(async (release) => {
        return await Release.create({
          id: release.id,
          version: release.tag_name,
          name: release.name,
          html_url: release.html_url,
          published_at: release.published_at,
          repositoryId: repository.id,
          seen: false
        });
      });

      await Promise.all(releasePromises);
      return repository;
    },
    // Mark a release as seen
    markAsSeen: async (_, { id }) => {
      const release = await Release.findByPk(id);
      if (release) {
        release.seen = true;
        await release.save();
        return true;
      }
      return false;
    },
  },
};