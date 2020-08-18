import { SET_ACTIVITIES_FEED, SET_ACTIVITIES_FEED_FOLLOWS, TOGGLE_ACTIVITIES_FEED_FOLLOWS } from 'actions/activities/activitiesFeedTypes';

const initialState = {
  userActivitiesFeed: [],
  activitiesFeedFollows: [],
  loading: true
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ACTIVITIES_FEED:
      return {
        ...state,
        userActivitiesFeed: payload,
        loading: false
      };
    case SET_ACTIVITIES_FEED_FOLLOWS:
      return {
        ...state,
        activitiesFeedFollows: payload,
        loading: false
      };
    case TOGGLE_ACTIVITIES_FEED_FOLLOWS:
      return {
        ...state,
        activitiesFeedFollows: state.activitiesFeedFollows.map(follow => {
          if (payload.userId === follow._id) {
            return { ...follow, isFollowed: payload.isFollowed };
          }
          return follow;
        })
      };
    default:
      return state;
  }
}
