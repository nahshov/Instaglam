import React, { useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import PropTypes from 'prop-types';
import styles from './HeartIcon.module.scss';

const HeartIcon = ({ isFilled = false, isRed = false, ...otherProps }) => (
  <>
    {isFilled ? (
      <AiFillHeart className={(isRed && styles.likeHeart)} {...otherProps} />
    ) : (
      <AiOutlineHeart {...otherProps} />
    )}
  </>
);

HeartIcon.defaultProps = {
  isFilled: false,
  isRed: false
};

HeartIcon.propTypes = {
  isFilled: PropTypes.bool,
  isRed: PropTypes.bool
};

export default HeartIcon;
