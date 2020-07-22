import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { FiMoreHorizontal } from 'react-icons/fi';
import HomePageModal from 'components/Modals/HomePageModal/HomePageModal';
import Button from 'components/Button/Button';
import styles from './HomePagePostHeader.module.scss';

const HomePagePostHeader = ({ username, profilePic, _id }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <header className={styles.headerPostContainer}>
      <div className={styles.postHeader}>
        <div className={styles.userIdentifier}>
          <Link to={`/${username}`}>
            <ProfilePic url={profilePic} size="medium" />
          </Link>
          <Link to={`/${username}`}>
            {username}
          </Link>
        </div>
        <Button btnRole="astext">
          <FiMoreHorizontal
            className={styles.moreIcon}
            onClick={() => setModalOpen(true)}
          />
        </Button>
        {isModalOpen && (
        <HomePageModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} _id={_id} />)}
      </div>
    </header>
  );
};

export default HomePagePostHeader;
