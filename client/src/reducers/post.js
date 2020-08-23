import {
  SET_POST,
  RESET_POST,
  TOGGLE_POST_OWNER_FOLLOW
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
      console.log(payload)
      return {
        ...state,
        post: { ...state.post, user: { ...state.post.user, isFollowed: payload } }
      };
    case RESET_POST:
      return {
        post: {}
      };
    default:
      return state;
  }
}
