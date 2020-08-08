import { createSelector } from 'reselect';

const profileModuleSelector = state => state.profile;

export const profileSelector = createSelector(
  [profileModuleSelector],
  profile => profile.profile
);

export const profileLoadingSelector = createSelector(
  [profileModuleSelector],
  profile => profile.profileLoading
);
