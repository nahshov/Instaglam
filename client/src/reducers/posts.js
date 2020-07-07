import {
  POSTS_LOADED,
  POSTS_LOADED_ERROR,
  POSTS_OF_USER_LOADED,
  POSTS_OF_USER_LOADED_ERROR,
  POST_LOADED,
  POST_LOADED_ERROR
} from 'actions/posts/postTypes';

const initialState = {
  loading: true,
  posts: [],
  postsOfUser: [],
  post: {},
  isPostModal: false,
  error: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POSTS_OF_USER_LOADED:
      return {
        ...state,
        loading: false,
        postsOfUser: payload,
        error: ''
      };
    case POST_LOADED:
      return {
        ...state,
        loading: false,
        post: payload
      };
    case POSTS_OF_USER_LOADED_ERROR:
      return {
        ...state,
        loading: false,
        postsOfUser: [],
        error: 'No posts uploaded.'
      };
    case POST_LOADED_ERROR:
      return {
        ...state,
        loading: false,
        post: {},
        error: 'No results found.'
      };
    default:
      return state;
  }
}
