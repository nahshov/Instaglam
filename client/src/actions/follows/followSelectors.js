import { createDeepEqualSelector } from '../createDeepEqualSelector';

const followSelector = state => state.follow;

export const followingSelector = createDeepEqualSelector(
  [followSelector],
  follow => follow.following
);

export const followersSelector = createDeepEqualSelector(
  [followSelector],
  follow => follow.followers
);
