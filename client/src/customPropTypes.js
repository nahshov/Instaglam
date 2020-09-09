import PropTypes from 'prop-types';

export const userPropType = {
  username: PropTypes.string,
  profilePic: PropTypes.string
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
  content: PropTypes.string,
  created: PropTypes.string,
  isCommentLiked: PropTypes.bool,
  numOfLikes: PropTypes.number,
  post: PropTypes.string,
  replyToComment: PropTypes.string,
  user: PropTypes.shape({
    username: PropTypes.string,
    _id: PropTypes.string
  }),
  __v: PropTypes.number,
  _id: PropTypes.string,
  isPostPage: PropTypes.bool

};
export const replyPropType = {
  content: PropTypes.string,
  created: PropTypes.string,
  isCommentLiked: PropTypes.bool,
  numOfLikes: PropTypes.number,
  post: PropTypes.string,
  replyToComment: PropTypes.string,
  user: PropTypes.shape({
    username: PropTypes.string,
    _id: PropTypes.string
  }),
  __v: PropTypes.number,
  _id: PropTypes.string,
  isPostPage: PropTypes.bool

};

export const activityPropTypes = {
  activity: PropTypes.shape({
    _id: PropTypes.string,
    referredUser: PropTypes.string,
    referredEntity: PropTypes.shape({
      _id: PropTypes.string,
      media: PropTypes.string
    }),
    activities: PropTypes.arrayOf(PropTypes.shape({
      activityId: PropTypes.shape({
        _id: PropTypes.string,
        content: PropTypes.string
      }),
      user: PropTypes.shape({
        _id: PropTypes.string
      })
    }))
  })
};

export const activityItemsPropTypes = {
  profilePic: PropTypes.string,
  usernames: PropTypes.arrayOf(PropTypes.string),
  activityLength: PropTypes.number,
  activityType: PropTypes.string,
  activityUsernamesText: PropTypes.string,
  created: PropTypes.element.isRequired,
  ...activityPropTypes
};

export const postPropType = {
  numOfLikes: PropTypes.number,
  numOfComments: PropTypes.number,
  _id: PropTypes.string,
  media: PropTypes.string,
  user: PropTypes.oneOfType([
    PropTypes.string, PropTypes.shape(
      {
        _id: PropTypes.string,
        username: PropTypes.string,
        profilePic: PropTypes.string
      }
    )
  ]),
  comments: PropTypes.arrayOf(PropTypes.shape({
    ...commentsPropType
  })),
  content: PropTypes.string,
  profilePic: PropTypes.string,
  isPostLiked: PropTypes.bool
};
