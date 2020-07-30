import { createSelector } from 'reselect';
import { createDeepEqualSelector } from '../createDeepEqualSelector';

const auth = state => state.auth;

export const isAuthenticatedSelector = createSelector(
  [auth],
  auth => auth.isAuthenticated
);

export const authLoadingSelector = createSelector(
  [auth],
  auth => auth.loading
);

export const authenticatedUserSelector = createDeepEqualSelector(
  [auth],
  auth => auth.user
);
