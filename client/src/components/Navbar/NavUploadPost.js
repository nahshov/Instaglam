import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CameraIcon from 'components/Icons/CameraIcon/CameraIcon';
import UploadPostModal from 'components/Modals/UploadPostModal/UploadPostModal';
import SettingsModalList from 'components/Modals/SettingsModal/SettingsModalList';
import SettingsModalListItem from 'components/Modals/SettingsModal/SettingsModalListItem';
import Alert from 'components/Alert/Alert';
import Button from 'components/Button/Button';
import { submitAPost } from 'actions/posts/postActions';
import styles from 'components/Navbar/NavUploadPost.module.scss';
import { setPostPicAlert } from '../../actions/alerts/alertActions';

const NavPostUpload = () => {
  const [isUploadPostModalOpen, setIsUploadPostModalOpen] = useState(false);
  const [postCaption, setPostCaption] = useState('');
  const [postMedia, setPostMedia] = useState('');

  const { alert: { message } } = useSelector(state => state);

  const dispatch = useDispatch();

  const handleClick = () => {
    setIsUploadPostModalOpen(false);
    dispatch(setPostPicAlert('', null));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!postMedia) {
      dispatch(setPostPicAlert('Must select a photo', 'Error'));
      return;
    }

    if (postMedia.size > 5000000) {
      dispatch(
        setPostPicAlert('The maximum size for a post picture is 5mb', 'Error')
      );
      return;
    }

    const fd = new FormData();
    fd.append('content', postCaption);
    fd.append('media', postMedia);
    dispatch(submitAPost(fd));
  };

  return (
    <>
      <CameraIcon className={styles.cameraIcon} onClick={() => setIsUploadPostModalOpen(true)} />
      {isUploadPostModalOpen && (
      <UploadPostModal
        isOpen={isUploadPostModalOpen}
        id="modalOverlay"
        onClick={(e) => e.target.id === 'modalOverlay' && handleClick()}
      >
        <div className={styles.uploadPostHeader}>
          <h3>New Post</h3>
        </div>
        {message && (
        <Alert style={{ margin: '0', paddingBottom: '20px' }}>{message}</Alert>
        )}
        <form className={styles.uploadPostForm} onSubmit={handleSubmit}>
          <SettingsModalList>
            <SettingsModalListItem>
              <input
                type="text"
                placeholder="Write a caption..."
                className={styles.captionInput}
                onChange={(e) => setPostCaption(e.target.value)}
              />
            </SettingsModalListItem>
            <SettingsModalListItem>
              <label htmlFor="media" className={styles.uploadPhoto}>
                Upload photo
              </label>
              <input
                type="file"
                name="media"
                accept="image/*"
                capture="camera"
                id="media"
                onChange={(e) => setPostMedia(e.target.files[0])}
                style={{ display: 'none' }}
              />
            </SettingsModalListItem>
            <SettingsModalListItem>
              <Button
                btnRole="astext btnBlock"
                type="submit"
              >
                Submit post
              </Button>
            </SettingsModalListItem>
            <SettingsModalListItem>
              <Button
                btnRole="astext btnBlock"
                type="button"
                onClick={handleClick}
              >
                Cancel
              </Button>
            </SettingsModalListItem>
          </SettingsModalList>
        </form>
      </UploadPostModal>
      )}
    </>
  );
};

export default NavPostUpload;
