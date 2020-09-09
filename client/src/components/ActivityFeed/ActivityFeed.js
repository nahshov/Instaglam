import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { authenticatedUserSelector } from 'actions/auth/authSelectors';
import { userActivitiesFeedSelector } from 'actions/activities/activitiesFeedSelectors';
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
  userActivities: userActivitiesFeedSelector
});

const mediaQueryList = window.matchMedia('(max-width: 700px)');

const ActivityFeed = () => {
  const [localLoading, setLocalLoading] = useState(true);
  const [isHeartIconFilled, setHeartIconFilled] = useState(false);
  const [isActivityFeedOpen, setIsActivityFeedOpen] = useState(false);
  const [hideTriangle, setHideTriangle] = useState(mediaQueryList.matches);
  const { user, userActivities } = useSelector(structuredActivitieFeedSelector);

  const dispatch = useDispatch();

  const handleMediaQuery = () => {
    setHideTriangle(mediaQueryList.matches);

    if ((mediaQueryList.matches || window.innerWidth < 700) && isActivityFeedOpen) {
      document.body.setAttribute('style', 'overflow: hidden;');
    } else {
      document.body.removeAttribute('style');
    }
  };

  useEffect(() => {
    if (window.innerWidth < 700 && isActivityFeedOpen) {
      document.body.setAttribute('style', 'overflow: hidden;');
    } else {
      document.body.removeAttribute('style');
    }
    mediaQueryList.addEventListener('change', handleMediaQuery);

    return () => {
      mediaQueryList.removeEventListener('change', handleMediaQuery);
    };
  }, [isActivityFeedOpen]);

  return (
    (
      <div className={styles.activityFeedWrapper}>
        <HeartIcon
          className={styles.heartIcon}
          isFilled={isHeartIconFilled}
          onClick={async () => {
            setHeartIconFilled(!isHeartIconFilled);
            setIsActivityFeedOpen(!isActivityFeedOpen);
            await dispatch(getUserActivitiesFeed(user._id));
            await dispatch(getFollows(user._id, 'following'));
            setLocalLoading(false);
          }}
        />
        {isActivityFeedOpen && (
          <>
            <div
              className={styles.popoverWrapper}
              onClick={() => {
                setIsActivityFeedOpen(false);
                setHeartIconFilled(false);
              }}
            />
            <Popover
              isPopoverOpen
              isActivityFeed
              hideTriangle={hideTriangle}
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
                onClick={() => {
                  setIsActivityFeedOpen(false);
                  setHeartIconFilled(false);
                }}
              >
                <ActivityItem
                  activity={activity}
                />
              </PopoverListItem>
            ))
}
                  </PopoverList>
                )}
            </Popover>
          </>
        )}
      </div>
    )
  );
};

export default ActivityFeed;
