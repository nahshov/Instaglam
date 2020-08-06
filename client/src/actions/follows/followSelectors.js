import { createDeepEqualSelector } from '../createDeepEqualSelector';

const followSelector = state => { return state.follow; };

export const followingSelector = createDeepEqualSelector(
  [followSelector],
  follow => { return follow.following; }
);

export const followersSelector = createDeepEqualSelector(
  [followSelector],
  follow => { return follow.followers; }
);
