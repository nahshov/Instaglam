import {
  SET_POSTS,
  GET_USER_POSTS,
  USER_POSTS_ERROR,
  GET_POST,
  POST_ERROR,
  TOGGLE_POST_LIKE,
  RESET_POSTS_OF_USER_LOADING,
  SET_LOADING,
  GET_ALL_LIKES_OF_A_POST,
  GET_ALL_COMMENTS_OF_A_POST,
  RESET_POSTS,
  ADD_COMMENT_TO_HOME_PAGE_POST,
  TOGGLE_HOME_COMMENT_LIKE
} from 'actions/posts/postTypes';

const initialState = {
  loading: true,
  posts: [],
  postsOfUser: [],
  postsOfUserLoading: true,
  post: {},
  noMorePosts: false,
  uploadPostLoadingProgress: '',
  postLikes: [],
  error: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_POSTS:

      if (payload.initialLoad) {
        return {
          ...state,
          posts: payload.posts,
          noMorePosts: payload.noMorePosts,
          loading: false,
          error: ''
        };
      }

      return {
        ...state,
        posts: [...state.posts, ...payload.posts],
        noMorePosts: payload.noMorePosts,
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
        posts: state.posts
          .map(post => {
            return (
              post._id === payload.postId
                ? { ...post,
                  isPostLiked: payload.isLike,
                  numOfLikes: post.numOfLikes + payload.numOfLikes }
                : post);
          })
      };
    case TOGGLE_HOME_COMMENT_LIKE:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === payload.postId) {
            return {
              ...post,
              comments: post.comments.map(c => (
                c._id === payload.commentId
                  ? {
                    ...c,
                    isCommentLiked: payload.isCommentLiked,
                    numOfLikes: c.numOfLikes + payload.numOfLikes
                  }
                  : c))
            };
          }
          return post;
        }) };
    // belongs to homepage state module
    case ADD_COMMENT_TO_HOME_PAGE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.map(post => {
          return (
            post._id === payload.postId ? {
              ...post,
              comments:
              !post.comments.length ? [payload.comment] : [payload.comment, post.comments[0]],
              numOfComments: post.numOfComments + payload.numOfComments
            } : post
          );
        })
      };
    case RESET_POSTS_OF_USER_LOADING:
      return {
        ...state,
        postsOfUserLoading: true
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload
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
    case RESET_POSTS:
      return {
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
    default:
      return state;
  }
}
