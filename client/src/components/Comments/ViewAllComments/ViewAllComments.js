import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import styles from './ViewAllComments.module.scss';

const ViewAllComments = ({ numOfComments, setIsPostModalOpen }) => (
  <div>
    {
        numOfComments > 2 ? (
          <div>
            <Button className={styles.viewAllBtn} btnRole="astext" onClick={() => setIsPostModalOpen(true)}>
              View all
              {' '}
              {numOfComments}
              {' '}
              comments
            </Button>

          </div>
        ) : ''
      }

  </div>
);

ViewAllComments.propTypes = {
  numOfComments: PropTypes.number.isRequired,
  setIsPostModalOpen: PropTypes.func.isRequired
};
export default ViewAllComments;
