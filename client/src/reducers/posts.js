import {
  GET_POSTS,
  POSTS_ERROR,
  GET_USER_POSTS,
  USER_POSTS_ERROR,
  GET_POST,
  POST_ERROR
} from 'actions/posts/postTypes';

const initialState = {
  loading: true,
  posts: [],
  postsOfUser: [],
  post: {},
  error: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
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
    default:
      return state;
  }
}
