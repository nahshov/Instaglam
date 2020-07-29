import { createSelector } from 'reselect';
import { createDeepEqualSelector } from '../createDeepEqualSelector';

const usersSelector = state => state.users;

export const userSelector = createDeepEqualSelector(
  [usersSelector],
  users => users.user
);

export const userLoadingSelector = createSelector(
  [usersSelector],
  user => user.userLoading
);
