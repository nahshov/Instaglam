import {
  GET_POSTS,
  POSTS_ERROR,
  GET_USER_POSTS,
  USER_POSTS_ERROR,
  GET_POST,
  POST_ERROR,
  UPLOAD_POST_LOADING
} from 'actions/posts/postTypes';

const initialState = {
  loading: true,
  posts: [],
  postsOfUser: [],
  post: {},
  uploadPostLoadingProgress: '',
  error: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
        error: ''
      };
    case GET_USER_POSTS:
      return {
        ...state,
        loading: false,
        postsOfUser: payload,
        error: ''
      };
    case GET_POST:
      return {
        ...state,
        loading: false,
        error: '',
        post: payload
      };
    case USER_POSTS_ERROR:
      return {
        ...state,
        loading: false,
        postsOfUser: [],
        error: 'No posts uploaded.'
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        post: {},
        error: 'No results found.'
      };
    case UPLOAD_POST_LOADING:
      return {
        ...state,
        uploadPostLoadingPercentage: payload
      };
    default:
      return state;
  }
}
