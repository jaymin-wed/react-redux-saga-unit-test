import { put, call, takeLatest } from 'redux-saga/effects';
import { getRepos, getUsers, getUser } from '@services/repoApi';
import { homeContainerTypes, homeContainerCreators } from './reducer';

const { REQUEST_GET_GITHUB_REPOS, REQUEST_GET_GITHUB_USERS } = homeContainerTypes;
const {
  successGetGithubRepos,
  failureGetGithubRepos,
  successGetGithubUsers,
  failureGetGithubUsers
} = homeContainerCreators;
export function* getGithubRepos(action) {
  const response = yield call(getRepos, action.repoName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetGithubRepos(data));
  } else {
    yield put(failureGetGithubRepos(data));
  }
}

export function* getGithubUsers(action) {
  const response = yield call(getUsers, action.username);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetGithubUsers(data));
  } else {
    yield put(failureGetGithubUsers(data));
  }
}

// Individual exports for testing
export default function* homeContainerSaga() {
  yield takeLatest(REQUEST_GET_GITHUB_REPOS, getGithubRepos);
  yield takeLatest(REQUEST_GET_GITHUB_USERS, getGithubUsers);
}
