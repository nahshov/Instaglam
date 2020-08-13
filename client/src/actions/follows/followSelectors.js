import { createSelector } from 'reselect';

const followSelector = state => { return state.follow; };

export const conditionalFollowSelector = (type) => createSelector(
  [followSelector],
  follow => {
    switch (type) {
      case 'Followers':
        return { follows: follow.followers, loading: follow.followersLoading };
      case 'Following':
        return { follows: follow.following, loading: follow.followingLoading };
      case 'Likes':
        return { follows: follow.likers, loading: follow.followingLoading };
      default:
        return {};
    }
  }
);

export const followingSelector = createSelector(
  [followSelector],
  follow => { return follow.following; }
);

export const followersSelector = createSelector(
  [followSelector],
  follow => { return follow.followers; }
);
