import PropTypes from 'prop-types';

export const userPropType = {
  username: PropTypes.string,
  profilePic: PropTypes.string
};

export const postPropType = {
  numOfLikes: PropTypes.number,
  numOfComments: PropTypes.number,
  _id: PropTypes.string,
  media: PropTypes.string,
  user: PropTypes.string,
  content: PropTypes.string,
  profilePic: PropTypes.string,
  isUserliked: PropTypes.bool
};

export const likePropType = {
  likes: PropTypes.string,
  postLikes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      post: PropTypes.string,
      user: {
        _id: PropTypes.string,
        username: PropTypes.string,
        profilePic: PropTypes.string
      },
      created: PropTypes.string,
      __v: PropTypes.number
    })
  ),
  loading: PropTypes.bool
};

export const modalPropType = {
  isModalOpen: PropTypes.bool,
  setModalOpen: PropTypes.bool
};

export const profilePropType = {
  bio: PropTypes.string,
  created: PropTypes.string,
  email: PropTypes.string,
  fullName: PropTypes.string,
  profilePic: PropTypes.string,
  username: PropTypes.string,
  numOfFollowing: PropTypes.number,
  numOfFollowers: PropTypes.number,
  __v: PropTypes.number,
  _id: PropTypes.string
};

export const commentsPropType = {
  likes: PropTypes.number,
  replyToComment: PropTypes.string,
  _id: PropTypes.string,
  user: PropTypes.string,
  post: PropTypes.string,
  content: PropTypes.string,
  created: PropTypes.string,
  __v: PropTypes.number
};
