import {
  SET_POST,
  RESET_POST,
  TOGGLE_POST_OWNER_FOLLOW,
  TOGGLE_POST_COMMENT_LIKE
} from 'actions/post/postTypes';

const initialState = {
  post: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_POST:
      return {
        ...state,
        post: payload
      };
    case TOGGLE_POST_OWNER_FOLLOW:
      return {
        ...state,
        post: { ...state.post, user: { ...state.post.user, isFollowed: payload } }
      };
    case TOGGLE_POST_COMMENT_LIKE:
      return {
        ...state,
        
      }
    case RESET_POST:
      return {
        post: {}
      };
    default:
      return state;
  }
}
