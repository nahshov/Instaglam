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
      const stateParsing = JSON.parse(JSON.stringify(state))
      const postParsing = JSON.parse(JSON.stringify(stateParsing.post))
      return {

        ...stateParsing,
        post: {
          ...postParsing,
          comments: state.post.comments.map(c => {
            const commentParsing = JSON.parse(JSON.stringify(c));
            return c._id === payload.commentId
              ? {
                ...commentParsing,
                isCommentLiked: payload.isCommentLiked,
                numOfLikes: c.numOfLikes + payload.numOfLikes
              }
              : c;
          })
        }
      };
    case RESET_POST:
      return {
        post: {}
      };
    default:
      return state;
  }
}
