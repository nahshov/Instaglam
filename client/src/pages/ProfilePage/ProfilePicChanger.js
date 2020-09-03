import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Alert from 'components/Alert/Alert';
import Modal from 'components/Modals/Modal';
import ModalList from 'components/Modals/ModalList/ModalList';
import ModalListItem from 'components/Modals/ModalList/ModalListItem';
import Button from 'components/Button/Button';
import { removeProfilePic, uploadProfilePic } from 'actions/auth/authActions';
import { profilePropType } from 'customPropTypes';
import styles from './ProfilePicChanger.module.scss';

const ProfilePicChanger = ({ isAuthenticatedUser, searchedUser }) => {
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [profilePicAlert, setProfilePicAlert] = useState('');

  const dispatch = useDispatch();

  const toggleProfilePicModal = () => {
    if (isAuthenticatedUser) {
      setSettingsModalOpen(!isSettingsModalOpen);
    }
  };

  const handleSelectedFile = e => {
    if (e.target.files[0].size > 1000000) {
      setProfilePicAlert('The maximum size for a profile picture is 1mb');
      setTimeout(() => {
        setProfilePicAlert('');
      }, 4500);
      setSettingsModalOpen(false);
    }
    dispatch(uploadProfilePic(e.target.files[0]));
    setSettingsModalOpen(false);
  };

  const removeCurrentPhoto = () => {
    dispatch(removeProfilePic());
    setSettingsModalOpen(false);
  };

  return (
    <>
      <div className={styles.profilePageProfilePic}>
        <button
          type="button"
          className={styles.changeProfilePicButton}
          onClick={toggleProfilePicModal}
        >

          <div className={styles.profilePic}>
            <img
              alt="Change avatar"
              src={searchedUser.profilePic}
            />
          </div>
        </button>
        {profilePicAlert && <Alert style={{ fontSize: '10px' }}>{profilePicAlert}</Alert>}
      </div>
      {isSettingsModalOpen && (
      <Modal
        isOpen={isSettingsModalOpen}
        setModalOpen={setSettingsModalOpen}
        isAnimated
      >
        <ModalList>
          <h3>Change Profile Photo</h3>
          <ModalListItem>
            <label htmlFor="profilePic" className={styles.uploadPhoto}>
              Upload Photo
            </label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              onChange={handleSelectedFile}
              style={{ display: 'none' }}
            />
          </ModalListItem>
          <ModalListItem>
            <Button
              btnRole="astext danger btnBlock"
              onClick={removeCurrentPhoto}
            >
              Remove Current Photo
            </Button>
          </ModalListItem>
          <ModalListItem>
            <Button btnRole="astext btnBlock" onClick={toggleProfilePicModal}>
              Cancel
            </Button>
          </ModalListItem>
        </ModalList>
      </Modal>
      )}
    </>
  );
};

ProfilePicChanger.propTypes = {
  isAuthenticatedUser: PropTypes.bool.isRequired,
  searchedUser: PropTypes.shape(profilePropType).isRequired
};

export default ProfilePicChanger;
