import {
  POSTS_LOADED,
  POSTS_LOADED_ERROR,
  POSTS_OF_USER_LOADED,
  POSTS_OF_USER_LOADED_ERROR
} from 'actions/types';

const initialState = {
  loading: true,
  posts: [],
  postsOfUser: [],
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
    case POSTS_OF_USER_LOADED_ERROR:
      return {
        ...state,
        loading: false,
        postsOfUser: [],
        error: 'No posts uploaded.'
      };
    default:
      return state;
  }
}
