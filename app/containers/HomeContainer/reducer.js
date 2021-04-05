/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: homeContainerTypes, Creators: homeContainerCreators } = createActions({
  requestGetGithubRepos: ['repoName'],
  successGetGithubRepos: ['data'],
  failureGetGithubRepos: ['error'],
  clearGithubRepos: [],
  requestGetGithubUsers: ['username'],
  successGetGithubUsers: ['data'],
  failureGetGithubUsers: ['error'],
  clearGithubUsers: []
});
export const initialState = {
  repoName: null,
  reposData: [],
  reposError: null,
  username: '',
  users: [],
  userError: null
};

/* eslint-disable default-case, no-param-reassign */
export const homeContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case homeContainerTypes.REQUEST_GET_GITHUB_REPOS:
        draft.repoName = action.repoName;
        break;
      case homeContainerTypes.CLEAR_GITHUB_REPOS:
        return {
          ...draft,
          repoName: null,
          reposData: [],
          reposError: null
        };
      case homeContainerTypes.SUCCESS_GET_GITHUB_REPOS:
        draft.reposData = action.data;
        break;
      case homeContainerTypes.FAILURE_GET_GITHUB_REPOS:
        draft.reposError = get(action.error, 'message', 'something_went_wrong');
        break;
      case homeContainerTypes.REQUEST_GET_GITHUB_USERS:
        draft.username = action.username;
        break;
      case homeContainerTypes.CLEAR_GITHUB_USERS:
        return {
          ...draft,
          username: '',
          users: [],
          userError: null
        };
      case homeContainerTypes.SUCCESS_GET_GITHUB_USERS:
        draft.users = action.data;
        break;
      case homeContainerTypes.FAILURE_GET_GITHUB_USERS:
        draft.userError = get(action.error, 'message', 'something_went_wrong');
        break;
    }
  });

export default homeContainerReducer;
