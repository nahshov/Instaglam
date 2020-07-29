import { defaultMemoize, createSelectorCreator } from 'reselect';
import isEqual from 'lodash.isequal';

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual
);
const usersSelector = state => state.users;

export const userSelector = createDeepEqualSelector(
  [usersSelector],
  users => users.user
);

export const userLoadingSelector = createDeepEqualSelector(
  [usersSelector],
  user => user.userLoading
);
