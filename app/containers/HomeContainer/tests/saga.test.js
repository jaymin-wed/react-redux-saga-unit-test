/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getRepos, getUsers } from '@services/repoApi';
import { apiResponseGenerator } from '@utils/testUtils';
import homeContainerSaga, { getGithubRepos, getGithubUsers } from '../saga';
import { homeContainerTypes } from '../reducer';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();
  const repoName = 'mac';
  const username = 'test-user';
  let getGithubReposGenerator = getGithubRepos({ repoName });
  let getGithubUsersGenerator = getGithubUsers({ username });

  it('should start task to watch for REQUEST_GET_GITHUB_REPOS action', () => {
    const generator = homeContainerSaga();
    expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.REQUEST_GET_GITHUB_REPOS, getGithubRepos));
  });

  it('should start task to watch for REQUEST_GET_GITHUB_USERS action', () => {
    const generator = homeContainerSaga();
    generator.next();
    expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.REQUEST_GET_GITHUB_USERS, getGithubUsers));
  });

  it('should start task to watch for REQUEST_GET_GITHUB_REPOS action', () => {
    expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.REQUEST_GET_GITHUB_REPOS, getGithubRepos));
  });

  it('should ensure that the action FAILURE_GET_GITHUB_REPOS is dispatched when the api call fails', () => {
    const res = getGithubReposGenerator.next().value;
    expect(res).toEqual(call(getRepos, repoName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching repo informations.'
    };
    expect(getGithubReposGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: homeContainerTypes.FAILURE_GET_GITHUB_REPOS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_GITHUB_REPOS is dispatched when the api call succeeds', () => {
    getGithubReposGenerator = getGithubRepos({ repoName });
    const res = getGithubReposGenerator.next().value;
    expect(res).toEqual(call(getRepos, repoName));
    const reposResponse = {
      totalCount: 1,
      items: [{ repositoryName: repoName }]
    };
    expect(getGithubReposGenerator.next(apiResponseGenerator(true, reposResponse)).value).toEqual(
      put({
        type: homeContainerTypes.SUCCESS_GET_GITHUB_REPOS,
        data: reposResponse
      })
    );
  });

  it('should start task to watch for REQUEST_GET_GITHUB_USERS action', () => {
    expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.REQUEST_GET_GITHUB_USERS, getGithubUsers));
  });

  it('should ensure that the action FAILURE_GET_GITHUB_USERS is dispatched when the api call fails', () => {
    const res = getGithubUsersGenerator.next().value;
    expect(res).toEqual(call(getUsers, username));
    const errorResponse = {
      errorMessage: 'There was an error while fetching users informations.'
    };
    expect(getGithubUsersGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: homeContainerTypes.FAILURE_GET_GITHUB_USERS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_GITHUB_REPOS is dispatched when the api call succeeds', () => {
    getGithubUsersGenerator = getGithubUsers({ username });
    const res = getGithubUsersGenerator.next().value;
    expect(res).toEqual(call(getUsers, username));
    const usersResponse = {
      totalCount: 1,
      items: [
        {
          login: username,
          id: 1,
          avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/mojombo',
          html_url: 'https://github.com/mojombo'
        }
      ]
    };
    expect(getGithubUsersGenerator.next(apiResponseGenerator(true, usersResponse)).value).toEqual(
      put({
        type: homeContainerTypes.SUCCESS_GET_GITHUB_USERS,
        data: usersResponse
      })
    );
  });
});
