import { createStructuredSelector } from 'reselect';
import { createDeepEqualSelector } from '../createDeepEqualSelector';

const postsSelector = state => state.posts;

export const postsOfUserSelector = createDeepEqualSelector(
  [postsSelector],
  posts => posts.postsOfUser
);
export const postsOfUserLoadingSelector = createDeepEqualSelector(
  [postsSelector],
  posts => posts.postsOfUserLoading
);

export const postsOfUserAndLoadingSelector = createStructuredSelector({
  postsOfUser: postsOfUserSelector,
  postsOfUserLoading: postsOfUserLoadingSelector
});
