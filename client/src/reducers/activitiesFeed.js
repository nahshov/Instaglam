import { GET_ACTIVITIES_FEED } from 'actions/activities/activitiesFeedTypes';

const initialState = {
  userActivitiesFeed: [],
  loading: true
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ACTIVITIES_FEED:
      return {
        ...state,
        userActivitiesFeed: payload,
        loading: false
      };
    default:
      return state;
  }
}
