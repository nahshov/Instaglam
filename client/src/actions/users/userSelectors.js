import { createSelector } from 'reselect';
import { createDeepEqualSelector } from '../createDeepEqualSelector';

const usersSelector = state => { return state.users; };

export const userSelector = createDeepEqualSelector(
  [usersSelector],
  users => { return users.user; }
);
export const userIdSelector = createSelector(
  [userSelector],
  user => { return user._id; }
);

export const userLoadingSelector = createSelector(
  [usersSelector],
  users => { return users.userLoading; }
);
