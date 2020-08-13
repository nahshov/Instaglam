import React from 'react';
import Modal from 'components/Modals/Modal';
import ModalList from 'components/Modals/ModalList/ModalList';
import ModalListItem from 'components/Modals/ModalList/ModalListItem';
import Button from 'components/Button/Button';
import UserIdentifier from 'components/UserIdentifier/UserIdentifier';
import { likePropType, modalPropType } from 'customPropTypes';
import styles from './LikeModal.module.scss';

const LikeModal = ({ isModalOpen, setModalOpen, postLikers, postLikersLoading }) => {
  const isFollowed = false;
  return (
    <Modal className={styles.modalProperties} isOpen={isModalOpen} setModalOpen={setModalOpen}>
      <ModalList>
        <div className={styles.headerDesign}>
          <h3>Likes</h3>
        </div>
        <div className={styles.listItemWrapper}>
          {!postLikersLoading && postLikers.map(like => {
            return (
              <ModalListItem className={styles.LikeModalItem}>
                <UserIdentifier
                  key={like._id}
                  username={like.user.username}
                  profilePic={like.user.profilePic}
                />
                {isFollowed ? <Button btnRole="primary bold"> Unfollow </Button> : <Button btnRole="primary bold"> Follow</Button>}
              </ModalListItem>
            );
          })}
        </div>
      </ModalList>
    </Modal>
  );
};

LikeModal.propTypes = {
  ...likePropType,
  ...modalPropType
};

export default LikeModal;
