import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ModalListItem from 'components/Modals/ModalList/ModalListItem';
import Button from 'components/Button/Button';
import styles from 'components/Navbar/NavUploadPost.module.scss';

const TakingPicture = ({ videoRef, setPostMedia, setIsTakingPicture }) => {
  const canvas = useRef();

  const handleTakePhotoClick = () => {
    const context = canvas.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 300, 300);
    canvas.current.toBlob((blob) => {
      const blobToFile = new File([blob], `${Date.now()}.jpeg`, { type: 'image/jpeg' });
      setPostMedia(blobToFile);
    });
  };

  return (
    <>
      <div className={styles.videoWrapper}>
        <ModalListItem>
          <div className={styles.videoDiv}>
            <h3>You</h3>
            <video ref={videoRef} autoPlay />
          </div>
        </ModalListItem>
        <ModalListItem>
          <div className={styles.videoDiv}>
            <h3>Your photo</h3>
            <canvas ref={canvas} width="300px" height="300px" />
          </div>
        </ModalListItem>
      </div>
      <div className={styles.takePictureButtonsDiv}>
        <ModalListItem>
          <Button
            type="button"
            btnRole="astext btnBlock"
            onClick={handleTakePhotoClick}
          >
            Take a photo!
          </Button>
        </ModalListItem>
        <ModalListItem>
          <Button
            type="button"
            btnRole="astext btnBlock"
            onClick={() => {
              setIsTakingPicture(false);
              videoRef.current.srcObject.getTracks().forEach((track) => { return track.stop(); });
            }}
          >
            Done
          </Button>
        </ModalListItem>
      </div>
    </>
  );
};

TakingPicture.propTypes = {
  videoRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
  setPostMedia: PropTypes.func.isRequired,
  setIsTakingPicture: PropTypes.func.isRequired
};

export default TakingPicture;
