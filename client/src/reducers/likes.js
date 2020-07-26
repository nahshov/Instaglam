import {
  GET_LIKES_OF_POST,
  // GET_LIKES_OF_COMMENT,
  TOGGLE_LIKE
} from 'actions/likes/likeTypes';

const initialState = {
  likesReferences: [],
  fetchLikesLoading: true,
  hasUserLiked: false,
  isLikeLoading: true
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LIKES_OF_POST:
      return {
        ...state,
        likesReferences: payload,
        fetchLikesLoading: false
      };
    case TOGGLE_LIKE:
      return {
        ...state,
        hasUserLiked: !state.hasUserLiked,
        isLikeLoading: false
      };
    default:
      return state;
  }
}
