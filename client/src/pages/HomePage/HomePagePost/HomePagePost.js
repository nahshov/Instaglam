import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { FiMoreHorizontal } from 'react-icons/fi';
import { RiChat3Line } from 'react-icons/ri';
import { GrBookmark } from 'react-icons/gr';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import ShareModalIcon from 'components/Icons/ChatIcon/ChatIcon';
import Button from 'components/Button/Button';
import SettingsModal from 'components/Modals/SettingsModal/SettingsModal';
import SettingsModalList from 'components/Modals/SettingsModal/SettingsModalList';
import SettingsModalListItem from 'components/Modals/SettingsModal/SettingsModalListItem';
import styles from './HomePagePost.module.scss';

const HomePagePost = ({ post }) => {
  const { likes, comments, content, user: { username = '', profilePic = '' }, media, created, _id } = post;
  const handleSubmit = e => {
    e.preventDefault();
  };
  const [isPostSettingsModalOpen, setPostSettingsModalOpen] = useState(false);
  const [isHeartIconFilled, setHeartIconFilled] = useState(false);

  return (
    <article className={styles.postContainer}>
      <header className={styles.headerPostContainer}>
        <div className={styles.postHeader}>
          <div className={styles.userIdentifier}>
            <Link to={`/${username}`}>
              <ProfilePic url={profilePic} className={styles.profilePicLink} />
            </Link>
            <Link to={`/${username}`}>
              {username}
            </Link>
          </div>
          <FiMoreHorizontal
            className={styles.moreIcon}
            onClick={() => setPostSettingsModalOpen(true)}
          />
          {isPostSettingsModalOpen && (
          <SettingsModal
            isOpen={isPostSettingsModalOpen}
            setModalOpen={setPostSettingsModalOpen}
          >
            <SettingsModalList>
              <SettingsModalListItem>
                <Button btnRole="danger btnBlock astext">Unfollow</Button>
              </SettingsModalListItem>
              <SettingsModalListItem>
                <Link to={`/p/${_id}`}>
                  <Button btnRole="btnBlock astext">Go To Post</Button>
                </Link>
              </SettingsModalListItem>
              <SettingsModalListItem>
                <Button btnRole="btnBlock astext">Share</Button>
              </SettingsModalListItem>
              <SettingsModalListItem>
                <Button btnRole="btnBlock astext">Copy Link</Button>
              </SettingsModalListItem>
              <SettingsModalListItem>
                <Button btnRole="btnBlock astext" onClick={() => setPostSettingsModalOpen(false)}>Cancel</Button>
              </SettingsModalListItem>
            </SettingsModalList>
          </SettingsModal>
          )}
        </div>
      </header>
      <img alt="post media" src={media} className={styles.postPicture} />
      <div className={styles.iconsWrapper}>
        <div className={styles.leftIconsWrapper}>
          <HeartIcon isActive={isHeartIconFilled} likedHeart onClick={() => setHeartIconFilled(!isHeartIconFilled)} />
          <RiChat3Line className={styles.chatIcon} />
          <ShareModalIcon className={styles.ShareModalIcon} />
        </div>
        <GrBookmark className={styles.bookMark} />
      </div>
      <div className={styles.likesAmount}>
        {likes}
        &nbsp;likes
      </div>
      <div className={styles.postContentContainer}>
        <Link to={`/${username}`}>
          <span className={styles.username}>
            {username}
          </span>
        </Link>
        <span>{content}</span>
      </div>
      <a href="#" className={styles.postAge}>*** ***** AGO</a>
      <form onSubmit={handleSubmit} className={styles.commentContainer}>
        <textarea id="commentTextArea" placeholder="Add a comment" className={styles.commentInput} />
        <button type="submit" className={styles.postButton}>Post</button>
      </form>
    </article>
  );
};
export default HomePagePost;
