import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { authenticatedUserSelector } from 'actions/auth/authSelectors';
import { getUserActivitiesFeedSelector } from 'actions/activities/activitiesFeedSelectors';
import { getUserActivitiesFeed } from 'actions/activities/activitiesFeedActions';
import { getFollows } from 'actions/follows/followActions';
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

const ActivityFeed = ({ setIsActivityFeedOpen, setHeartIconFilled }) => {
  const { user, userActivities } = useSelector(structuredActivitieFeedsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserActivitiesFeed(user._id));
    dispatch(getFollows(user._id, 'following'));
  }, []);

  return (
    (
      <div
        className={styles.popoverWrapper}
        onClick={() => {
        // setIsActivityFeedOpen(false);
          setHeartIconFilled(false);
        }}
      >
        <Popover
          isPopoverOpen
          style={{ top: '60px', right: '111px', width: '30%' }}
        >
          <PopoverList>
            {
            !userActivities.length
              ? (
                <PopoverListItem>
                  <span className={styles.notFound}>No activities found.</span>
                </PopoverListItem>
              )
              : userActivities.map(activity => (
                !!activity.activities.length
                && (
                <PopoverListItem>
                  <ActivityItem
                    key={activity._id}
                    profilePic={activity.activities[activity.activities.length - 1].user.profilePic}
                    usernames={
                  activity.activities.length >= 2
                    ? [activity.activities[activity.activities.length - 1].user.username,
                      activity.activities[activity.activities.length - 2].user.username]
                    : [activity.activities[0].user.username]
}
                    activityLength={activity.activities.length}
                    activityType={activity.activityType}
                    referredEntityType={activity.referredEntityType}
                    referredEntity={activity.referredEntity}
                    userOfActivity={activity.activities.map(user => user.user._id)}
                    user={user}
                  />
                </PopoverListItem>
                )
              ))
}
          </PopoverList>
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
