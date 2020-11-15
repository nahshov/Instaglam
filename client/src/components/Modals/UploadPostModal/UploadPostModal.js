import React, { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'components/Modals/Modal';
import ModalList from 'components/Modals/ModalList/ModalList';
import ModalListItem from 'components/Modals/ModalList/ModalListItem';
import TakingPicture from 'components/Modals//UploadPostModal/TakingPicture';
import Alert from 'components/Alert/Alert';
import Button from 'components/Button/Button';
import { SUBMIT_A_POST_REQUESTED } from 'actions/posts/postTypes';
import PropTypes from 'prop-types';
import styles from 'components/Navbar/NavUploadPost.module.scss';

const UploadPostModal = ({ isUploadPostModalOpen, setIsUploadPostModalOpen }) => {
  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadAlert, setUploadAlert] = useState('');
  const [postCaption, setPostCaption] = useState('');
  const [postMedia, setPostMedia] = useState('');

  const dispatch = useDispatch();

  const video = useRef();

  const handleUploadPostOnClose = useCallback(() => {
    if (video.current) {
      video.current.srcObject.getTracks().forEach((media) => { return media.stop(); });
    }
    setIsUploadPostModalOpen(false);
    setIsTakingPicture(false);
    setPostMedia('');
    setUploadAlert('');
  }, [setIsUploadPostModalOpen]);

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
      setUploadAlert('Must select a photo');
      return;
    }

    if (postMedia.size > 5000000) {
      setUploadAlert('The maximum size for a post picture is 5mb');
      return;
    }

    if (!postMedia.type.startsWith('image')) {
      setUploadAlert('Please upload an image');
      return;
    }

    setIsSubmitting(true);
      const fd = new FormData();
      fd.append('content', postCaption);
      fd.append('media', postMedia);
      dispatch({ type: SUBMIT_A_POST_REQUESTED, payload: {fd} });
  };

  return (
    <Modal
      isOpen={isUploadPostModalOpen}
      isUploadPost
      setModalOpen={setIsUploadPostModalOpen}
      isAnimated
      handleUploadPostOnClose={handleUploadPostOnClose}
    >
      <ModalList>
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
              <div className={styles.uploadPostHeader}>
                <h3 style={{ padding: '0' }}>New Post</h3>
              </div>
              {uploadAlert
              && <Alert style={{ margin: '0', paddingBottom: '20px' }}>{uploadAlert}</Alert>}
              <ModalListItem>
                <input
                  type="text"
                  placeholder="Write a caption..."
                  className={styles.captionInput}
                  onChange={(e) => { return setPostCaption(e.target.value); }}
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
                  onChange={(e) => { return setPostMedia(e.target.files[0]); }}
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
            </form>
          )}
      </ModalList>
    </Modal>
  );
};

UploadPostModal.propTypes = {
  isUploadPostModalOpen: PropTypes.bool.isRequired,
  setIsUploadPostModalOpen: PropTypes.func.isRequired
};

export default UploadPostModal;
