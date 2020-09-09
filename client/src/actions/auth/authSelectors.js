import { createSelector } from 'reselect';
import { createDeepEqualSelector } from '../createDeepEqualSelector';

const auth = state => { return state.auth; };

export const isAuthenticatedSelector = createDeepEqualSelector(
  [auth],
  auth => { return auth.isAuthenticated; }
);

export const authLoadingSelector = createSelector(
  [auth],
  auth => { return auth.loading; }
);

export const authenticatedUserSelector = createDeepEqualSelector(
  [auth],
  auth => { return auth.user; }
);
