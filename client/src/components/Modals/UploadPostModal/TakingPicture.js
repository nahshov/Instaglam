import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ModalList from 'components/Modals/ModalList/ModalList';
import ModalListItem from 'components/Modals/ModalList/ModalListItem';
import Button from 'components/Button/Button';
import styles from 'components/Navbar/NavUploadPost.module.scss';

const TakingPicture = ({ videoRef, setPostMedia, setIsTakingPicture }) => {
  const canvas = useRef();

  const handleTakePhotoClick = () => {
    const context = canvas.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    canvas.current.toBlob((blob) => {
      const blobToFile = new File([blob], `${Date.now()}.jpeg`, { type: 'image/jpeg' });
      setPostMedia(blobToFile);
    });
  };

  return (
    <ModalList>
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
            <canvas ref={canvas} width="640px" height="480px" />
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
              videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            }}
          >
            Done
          </Button>
        </ModalListItem>
      </div>
    </ModalList>
  );
};

TakingPicture.propTypes = {
  videoRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
  setPostMedia: PropTypes.func.isRequired,
  setIsTakingPicture: PropTypes.func.isRequired
};

export default TakingPicture;
