import { createStructuredSelector, createSelector } from 'reselect';
import { createDeepEqualSelector } from '../createDeepEqualSelector';

const postsSelector = state => { return state.posts; };

export const postsOfUserSelector = createDeepEqualSelector(
  [postsSelector],
  posts => { return posts.postsOfUser; }
);
export const postsOfUserLoadingSelector = createSelector(
  [postsSelector],
  posts => { return posts.postsOfUserLoading; }
);

export const postsOfUserAndLoadingSelector = createStructuredSelector({
  postsOfUser: postsOfUserSelector,
  postsOfUserLoading: postsOfUserLoadingSelector
});
