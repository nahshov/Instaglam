import { createSelector } from 'reselect';
import { createDeepEqualSelector } from '../createDeepEqualSelector';

const usersSelector = state => state.users;

export const userSelector = createDeepEqualSelector(
  [usersSelector],
  users => users.user
);
export const userIdSelector = createSelector(
  [userSelector],
  user => user._id
);

export const userLoadingSelector = createSelector(
  [usersSelector],
  users => users.userLoading
);
