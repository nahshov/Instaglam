import React, { useState } from 'react';
import CameraIcon from 'components/Icons/CameraIcon/CameraIcon';
import UploadPostModal from 'components/Modals/UploadPostModal/UploadPostModal';
import styles from 'components/Navbar/NavUploadPost.module.scss';

const NavPostUpload = () => {
  const [isUploadPostModalOpen, setIsUploadPostModalOpen] = useState(false);

  return (
    <>
      <CameraIcon
        className={styles.cameraIcon}
        onClick={() => { return setIsUploadPostModalOpen(true); }}
      />
      {isUploadPostModalOpen
      && (
      <UploadPostModal
        isUploadPostModalOpen={isUploadPostModalOpen}
        setIsUploadPostModalOpen={setIsUploadPostModalOpen}
      />
      )}
    </>
  );
};

export default NavPostUpload;
