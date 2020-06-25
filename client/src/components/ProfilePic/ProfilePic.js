import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from 'components/ProfilePic/ProfilePic.module.scss';
import { loadUser } from 'actions/auth';

const ProfilePic = ({ auth: { user } }) => (
  // Why profile pic is undefined when i try to assign it to img SRC

  <div className={styles.ProfilePic}>
    <img
      alt="default profile pic"
      src="https://orangesupplies.com/wp-content/uploads/2019/08/Author__Placeholder.png"
      className={styles.profileImg}
    />
  </div>
);
ProfilePic.propTypes = {
  auth: PropTypes.shape.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(ProfilePic);
