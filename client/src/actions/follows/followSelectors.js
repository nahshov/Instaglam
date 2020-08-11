import { createSelector } from 'reselect';

const followSelector = state => { return state.follow; };

export const conditionalFollowSelector = (type) => createSelector(
  [followSelector],
  follow => (type === 'Followers' ? follow.followers : follow.following)
);

export const followingSelector = createSelector(
  [followSelector],
  follow => { return follow.following; }
);

export const followersSelector = createSelector(
  [followSelector],
  follow => { return follow.followers; }
);
