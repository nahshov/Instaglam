import React, { useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import HomePageModal from 'components/Modals/HomePageModal/HomePageModal';
import UserIdentifier from 'components/UserIdentifier/UserIdentifier';
import Button from 'components/Button/Button';
import { postPropType, userPropType } from 'customPropTypes';
import styles from './HomePagePostHeader.module.scss';

const HomePagePostHeader = ({ username, profilePic, postId }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <header className={styles.headerPostContainer}>
      <div className={styles.postHeader}>
        <UserIdentifier profilePic={profilePic} username={username} />
        <Button btnRole="astext">
          <FiMoreHorizontal
            className={styles.moreIcon}
            onClick={() => { return setModalOpen(true); }}
          />
        </Button>
        {isModalOpen && (
        <HomePageModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} postId={postId} />)}
      </div>
    </header>
  );
};

HomePagePostHeader.propTypes = {
  ...postPropType,
  ...userPropType
};

export default HomePagePostHeader;
