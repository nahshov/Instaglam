import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'components/Modals/Modal';
import ModalList from 'components/Modals/ModalList/ModalList';
import ModalListItem from 'components/Modals/ModalList/ModalListItem';
import TakingPicture from 'components/Modals//UploadPostModal/TakingPicture';
import Alert from 'components/Alert/Alert';
import Button from 'components/Button/Button';
import { submitAPost } from 'actions/posts/postActions';
import { setPostPicAlert } from 'actions/alerts/alertActions';
import styles from 'components/Navbar/NavUploadPost.module.scss';

const UploadPostModal = ({ isUploadPostModalOpen, setIsUploadPostModalOpen }) => {
  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postCaption, setPostCaption] = useState('');
  const [postMedia, setPostMedia] = useState('');

  const {
    alert: { message, alertLocation }
  } = useSelector(state => state);

  const dispatch = useDispatch();

  const video = useRef();

  const handleUploadPostOnClose = () => {
    if (video.current) {
      video.current.srcObject.getTracks().forEach((media) => media.stop());
    }
    setIsUploadPostModalOpen(false);
    setIsTakingPicture(false);
    setPostMedia('');
    dispatch(setPostPicAlert('', null, ''));
  };

  const handleOpenCamClick = async () => {
    try {
      const constrainsts = {
        video: true,
        audio: false
      };
      const stream = await navigator.mediaDevices.getUserMedia(constrainsts);
      video.current.srcObject = stream;
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!postMedia) {
      dispatch(setPostPicAlert('Must select a photo', 'Error', 'Upload Post'));
      return;
    }

    if (postMedia.size > 5000000) {
      dispatch(
        setPostPicAlert('The maximum size for a post picture is 5mb', 'Error', 'Upload Post')
      );
      return;
    }

    if (!postMedia.type.startsWith('image')) {
      dispatch(
        setPostPicAlert('Please upload an image', 'Error', 'Upload Post')
      );
      return;
    }

    setIsSubmitting(true);
    const fd = new FormData();
    fd.append('content', postCaption);
    fd.append('media', postMedia);
    dispatch(submitAPost(fd));
  };

  return (
    <Modal
      isOpen={isUploadPostModalOpen}
      isUploadPost
      setModalOpen={setIsUploadPostModalOpen}
      isAnimated
      handleUploadPostOnClose={handleUploadPostOnClose}
    >
      {isTakingPicture
        ? (
          <TakingPicture
            videoRef={video}
            setPostMedia={setPostMedia}
            handleUploadPostOnClose={handleUploadPostOnClose}
            setIsTakingPicture={setIsTakingPicture}
          />
        )
        : (
          <form className={styles.uploadPostForm} onSubmit={handleSubmit}>
            <ModalList>
              <div className={styles.uploadPostHeader}>
                <h3 style={{ padding: '0' }}>New Post</h3>
              </div>
              {message && alertLocation === 'Upload Post' && (
              <Alert alert={message} style={{ margin: '0', paddingBottom: '20px' }} />
              )}
              <ModalListItem>
                <input
                  type="text"
                  placeholder="Write a caption..."
                  className={styles.captionInput}
                  onChange={(e) => setPostCaption(e.target.value)}
                />
              </ModalListItem>
              <ModalListItem>
                <Button
                  type="button"
                  btnRole="astext btnBlock"
                  className={styles.uploadPhoto}
                  onClick={() => { setIsTakingPicture(true); handleOpenCamClick(); }}
                >
                  {' '}
                  Take a picture
                </Button>
              </ModalListItem>
              <ModalListItem>
                <label htmlFor="media" className={styles.uploadPhoto}>
                  {postMedia ? <span>Photo Selected &#10003;</span> : 'Upload Photo'}
                </label>
                <input
                  type="file"
                  name="media"
                  accept="image/png, image/jpg, image/jpeg"
                  id="media"
                  onChange={(e) => setPostMedia(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </ModalListItem>
              <ModalListItem>
                <Button
                  btnRole="astext btnBlock"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit post
                </Button>
              </ModalListItem>
              <ModalListItem>
                <Button
                  btnRole="astext btnBlock"
                  type="button"
                  onClick={handleUploadPostOnClose}
                >
                  Cancel
                </Button>
              </ModalListItem>
            </ModalList>
          </form>
        )}
    </Modal>
  );
};

UploadPostModal.propTypes = {
  isUploadPostModalOpen: PropTypes.bool.isRequired,
  setIsUploadPostModalOpen: PropTypes.func.isRequired
};

export default UploadPostModal;
