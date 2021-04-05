import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('github');

export const getRepos = repoName => repoApi.get(`/search/repositories?q=${repoName}`);

export const getUsers = username => repoApi.get(`/search/users?q=${username}`);

export const getUser = username => repoApi.get(`/users/${username}`);