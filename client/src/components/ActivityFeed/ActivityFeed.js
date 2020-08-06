import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { authenticatedUserSelector } from 'actions/auth/authSelectors';
import { getUserActivitiesFeedSelector } from 'actions/activities/activitiesFeedSelectors';
import { getUserActivitiesFeed } from 'actions/activities/activitiesFeedActions';
import Popover from 'components/Popover/Popover';
import PopoverList from 'components/Popover/PopoverList';
import PopoverListItem from 'components/Popover/PopoverListItem';
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
      userActivities.map(activity => console.log(activity.activities[0]));
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
          {!userActivities.length ? <span className={styles.notFound}>No activities found.</span> : userActivities.map(activity => (
            <div>
              <img src={activity.activities[0].user.profilePic} alt="):" />
              <span>{activity.activities.map((activity2, index) => (activity2.user.username))}</span>
            </div>
            // activity.activities.map((activity2, index) => (
            //   <div key={index}>
            //     <span>
            //       {activity2.user.username}
            //     </span>
            //   </div>
            // ))
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
