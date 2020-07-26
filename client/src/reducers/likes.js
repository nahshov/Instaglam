import {
  TOGGLE_LIKE_ID,
  GET_LIKES_OF_POST
} from 'actions/likes/likeTypes';

const initialState = {
  likesOfPost: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LIKES_OF_POST:
      return {
        ...state,
        likesOfPost: payload
      };
    case TOGGLE_LIKE_ID:
      return {
        ...state,
        likesOfPost: state.likesOfPost.map(like => {
          if (!payload.newLike) {
            return { ...like, _id: null };
          }
          if (payload.oldLikeId === like._id) {
            return { ...like, _id: payload.newLike._id };
          }

          return like;
        })// newLike oldLikeId
      };
    default:
      return state;
  }
}
