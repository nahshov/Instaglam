import PropTypes from 'prop-types';

export const userPropType = {
  username: PropTypes.string,
  profilePic: PropTypes.string
}

export const postPropType = {
  likes: PropTypes.number,
  comments: PropTypes.number,
  _id: PropTypes.string,
  media: PropTypes.string,
  user: PropTypes.shape(userPropType),
  content: PropTypes.string,
  profilePic: PropTypes.string,
  isUserliked: PropTypes.bool
};
