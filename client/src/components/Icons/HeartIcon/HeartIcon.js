import React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import PropTypes from 'prop-types';
import styles from './HeartIcon.module.scss';

const HeartIcon = ({ isFilled = false, isRed = false, heartClickLoading = false, ...otherProps }) => (
  <>
    {isFilled ? (
      <AiFillHeart
        className={(isRed && styles.likeHeart)}
        style={heartClickLoading ? { pointerEvents: 'none' } : {}}
        {...otherProps}
      />
    ) : (
      <AiOutlineHeart
        {...otherProps}
        style={heartClickLoading ? { pointerEvents: 'none' } : {}}
      />
    )}
  </>
);

HeartIcon.defaultProps = {
  isFilled: false,
  isRed: false,
  heartClickLoading: false
};

HeartIcon.propTypes = {
  isFilled: PropTypes.bool,
  isRed: PropTypes.bool,
  heartClickLoading: PropTypes.bool
};

export default HeartIcon;
