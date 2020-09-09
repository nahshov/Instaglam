import { createSelector } from 'reselect';

const postModuleSelector = state => state.post;

export const postSelector = createSelector(
  [postModuleSelector],
  post => post.post
)
export const postsOfUserSelector = createSelector(
  [postModuleSelector],
  post => post.postsOfUser
)