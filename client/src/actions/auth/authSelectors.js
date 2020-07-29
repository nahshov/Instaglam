import { createSelector } from 'reselect';
import { createDeepEqualSelector } from '../createDeepEqualSelector';

const auth = state => state.auth;

export const isAuthenticatedSelector = createDeepEqualSelector(
  [auth],
  auth => auth.isAuthenticated
);

export const authenticatedUserSelector = createDeepEqualSelector(
  [auth],
  auth => auth.user
);

export const authLoadingSelector = createDeepEqualSelector(
  [auth],
  auth => auth.loading
);

export const authenticatedUsernameSelector = createSelector(
  auth,
  authenticatedUserSelector,
  user => user.username
);
