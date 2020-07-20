import React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import PropTypes from 'prop-types';
import styles from './HeartIcon.module.scss';

const HeartIcon = ({ isActive = false, isLike = false, ...otherProps }) => (
  <>
    {isActive ? (
      <AiFillHeart className={(isLike && styles.likeHeart)} {...otherProps} />
    ) : (
      <AiOutlineHeart {...otherProps} />
    )}
  </>
);

HeartIcon.defaultProps = {
  isActive: false,
  isLike: false
};

HeartIcon.propTypes = {
  isActive: PropTypes.bool,
  isLike: PropTypes.bool
};

export default HeartIcon;
