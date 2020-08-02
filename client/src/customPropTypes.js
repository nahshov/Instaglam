import PropTypes from 'prop-types';

export const userPropType = {
  username: PropTypes.string,
  profilePic: PropTypes.string
};

export const postPropType = {
  likes: PropTypes.number,
  comments: PropTypes.number,
  _id: PropTypes.string,
  media: PropTypes.string,
  user: PropTypes.string,
  content: PropTypes.string,
  profilePic: PropTypes.string,
  isUserliked: PropTypes.bool
};

export const likePropType = {
  likes: PropTypes.string
};

export const searchedUserPropType = {
  bio: PropTypes.string,
  created: PropTypes.string,
  email: PropTypes.string,
  fullName: PropTypes.string,
  profilePic: PropTypes.string,
  username: PropTypes.string,
  __v: PropTypes.number,
  _id: PropTypes.string
};
