import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { authenticatedUserSelector } from 'actions/auth/authSelectors';
import { getUserActivitiesFeedSelector } from 'actions/activities/activitiesFeedSelectors';
import { getUserActivitiesFeed } from 'actions/activities/activitiesFeedActions';
import Popover from 'components/Popover/Popover';
import PopoverList from 'components/Popover/PopoverList';
import PopoverListItem from 'components/Popover/PopoverListItem';
import ActivityItem from 'components/ActivityFeed/ActivityItem';
import PropTypes from 'prop-types';
import styles from './ActivityFeed.module.scss';

const structuredActivitieFeedsSelector = createStructuredSelector({
  user: authenticatedUserSelector,
  userActivities: getUserActivitiesFeedSelector
});

const ActivityFeed = ({ isActivityFeedOpen, setIsActivityFeedOpen, setHeartIconFilled }) => {
  const { user, userActivities } = useSelector(structuredActivitieFeedsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isActivityFeedOpen) {
      dispatch(getUserActivitiesFeed(user._id));
    }
  }, [isActivityFeedOpen]);

  return (
    isActivityFeedOpen
  && (
    <div
      className={styles.popoverWrapper}
      onClick={() => {
        setIsActivityFeedOpen(false);
        setHeartIconFilled(false);
      }}
    >
      <Popover
        isPopoverOpen
        style={{ top: '60px', right: '173px', zIndex: '5' }}
      >
        <PopoverListItem>
          {!userActivities.length ? <span className={styles.notFound}>No activities found.</span>
            : userActivities.map(activity => (
              <ActivityItem
                profilePic={activity.activities[activity.activities.length - 1].user.profilePic}
                usernames={[activity.activities[0].user.username, activity.activities[1].user.username]}
                activityLength={activity.activities.length}
              />
            ))}
        </PopoverListItem>
      </Popover>
    </div>
  )
  );
};

ActivityFeed.propTypes = {
  isActivityFeedOpen: PropTypes.bool.isRequired,
  setIsActivityFeedOpen: PropTypes.func.isRequired,
  setHeartIconFilled: PropTypes.func.isRequired
};

export default ActivityFeed;
