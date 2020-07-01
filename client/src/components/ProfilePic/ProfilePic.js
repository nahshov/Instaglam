import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'assets/img/spinner.gif';
import styles from './ProfilePic.module.scss';

const ProfilePic = ({ url = '', className = '' }) => (
  <div className={className}>
    <img alt="default profile pic" src={url || Spinner} />
  </div>
);

ProfilePic.defaultProps = {
  url: '',
  className: ''
};

ProfilePic.propTypes = {
  url: PropTypes.string,
  className: PropTypes.string
};

export default ProfilePic;
