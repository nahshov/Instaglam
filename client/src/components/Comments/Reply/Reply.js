import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { togglePostCommentLike } from 'actions/post/postActions';
import Button from 'components/Button/Button';
import CreatedTime from 'components/CreatedTime/CreatedTime';
import NumOfLikes from 'components/HomePagePost/NumOfLikes/NumOfLikes';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import { replyPropType } from 'customPropTypes';
import styles from './Reply.module.scss';

const Reply = ({ reply, setReplyClicked }) => {
  const [heartClickLoading, setHeartClickLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLike = (async reply => {
    setHeartClickLoading(true);

    await dispatch(togglePostCommentLike(reply._id, reply.isCommentLiked));

    setHeartClickLoading(false);
  });

  return (
    <div className={styles.reply}>
      <div className={styles.replyHeader}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ height: 'auto' }} className={styles.replyData}>
            {reply.user.profilePic && <ProfilePic url={reply.user.profilePic} size="medium" />}
            <div>
              <div>
                <span>
                  <Link to={`/${reply.user.username}`} className={styles.postPageUsername}>
                    {reply.user.username}
                  </Link>
                &nbsp;
                </span>
                <span>
                  {reply.content}
                </span>
              </div>
              <div>
                <div className={styles.replyActions}>
                  <Link to={`/p/${reply.post}`}>
                    <CreatedTime style={{ margin: '0' }} created={reply.created} isPost />
                  </Link>
                  <NumOfLikes
                    id={reply.replyToComment ? reply.replyToComment : reply.post}
                    likes={reply.numOfLikes}
                    isComment
                    isSinglePost
                  />
                  <Button
                    style={{ margin: '0px 0px 0px 10px', padding: '0' }}
                    btnRole="astext primary"
                    onClick={() => setReplyClicked(
                      { wasClicked: true, parentCommentId: reply.replyToComment }
                    )}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.replyHeartIcon}>
            <HeartIcon
              isRed
              isFilled={reply.isCommentLiked}
              onClick={() => {
                handleLike(reply);
              }}
              heartClickLoading={heartClickLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Reply.propTypes = {
  ...replyPropType
};

export default Reply;
