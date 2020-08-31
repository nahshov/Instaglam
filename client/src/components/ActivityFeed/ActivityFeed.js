import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { authenticatedUserSelector } from 'actions/auth/authSelectors';
import { userActivitiesFeedSelector } from 'actions/activities/activitiesFeedSelectors';
import { followsSelector } from 'actions/follows/followSelectors';
import { getUserActivitiesFeed } from 'actions/activities/activitiesFeedActions';
import { getFollows } from 'actions/follows/followActions';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import Popover from 'components/Popover/Popover';
import PopoverList from 'components/Popover/PopoverList';
import PopoverListItem from 'components/Popover/PopoverListItem';
import ActivityItem from 'components/ActivityFeed/ActivityItem';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import styles from './ActivityFeed.module.scss';

const structuredActivitieFeedSelector = createStructuredSelector({
  user: authenticatedUserSelector,
  userActivities: userActivitiesFeedSelector,
  follows: followsSelector
});

const ActivityFeed = () => {
  const [localLoading, setLocalLoading] = useState(true);
  const [isHeartIconFilled, setHeartIconFilled] = useState(false);
  const [isActivityFeedOpen, setIsActivityFeedOpen] = useState(false);
  const { user, userActivities, follows } = useSelector(structuredActivitieFeedSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserActivitiesFeed(user._id));
    dispatch(getFollows(user._id, 'following'))
      .then(() => {
        setLocalLoading(false);
      });
  }, []);

  return (
    (
      <div>
        <HeartIcon
          className={styles.heartIcon}
          isFilled={isHeartIconFilled}
          onClick={() => {
            setHeartIconFilled(!isHeartIconFilled);
            setIsActivityFeedOpen(!isActivityFeedOpen);
          }}
        />
        {isActivityFeedOpen && (
        <div
          className={styles.popoverWrapper}
          onClick={() => {
            // setIsActivityFeedOpen(false);
            setHeartIconFilled(false);
          }}
        >
          <Popover
            isPopoverOpen
            style={{ top: '60px', right: '111px', width: '100%', maxWidth: '600px' }}
          >
            {localLoading
              ? (
                <div className={styles.loadingSpinnerDiv}>
                  <LoadingSpinner />
                </div>
              )
              : (
                <PopoverList>
                  {
          !userActivities.length
            ? (
              <PopoverListItem>
                <span className={styles.notFound}>No activities found.</span>
              </PopoverListItem>
            )
            : userActivities.map(activity => (
              <PopoverListItem
                key={activity._id}
              >
                <ActivityItem
                  activity={activity}
                  authenticatedUserId={user._id}
                />
              </PopoverListItem>
            ))
}
                </PopoverList>
              )}

          </Popover>
        </div>
        )}
      </div>
    )
  );
};

export default ActivityFeed;
