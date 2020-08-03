import {
  GET_POSTS,
  GET_USER_POSTS,
  USER_POSTS_ERROR,
  GET_POST,
  POST_ERROR,
  TOGGLE_POST_LIKE,
  RESET_POSTS_OF_USER_LOADING,
  GET_ALL_LIKES_OF_A_POST,
  GET_ALL_COMMENTS_OF_A_POST
} from 'actions/posts/postTypes';

const initialState = {
  loading: true,
  posts: [],
  postsOfUser: [],
  postsOfUserLoading: true,
  post: {},
  uploadPostLoadingProgress: '',
  postLikes: [],
  postComments: [],
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
        postsOfUserLoading: false,
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
        postsOfUserLoading: false,
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
    case TOGGLE_POST_LIKE:
      return {
        ...state,
        loading: false,
        posts: state.posts
          .map(post => (
            post._id === payload.postId
              ? { ...post, isUserLiked: payload.isLike, numOfLikes: post.numOfLikes + payload.numOfLikes }
              : post))
      };
    case RESET_POSTS_OF_USER_LOADING:
      return {
        ...state,
        postsOfUserLoading: true
      };
    case GET_ALL_LIKES_OF_A_POST:
      return {
        ...state,
        loading: false,
        postLikes: payload
      };
    case GET_ALL_COMMENTS_OF_A_POST:
      return {
        ...state,
        loading: false,
        postComments: payload
      };
    default:
      return state;
  }
}
