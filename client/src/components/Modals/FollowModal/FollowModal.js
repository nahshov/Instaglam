import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowers, getFollowing } from 'actions/follows/followActions';
import { conditionalFollowSelector } from 'actions/follows/followSelectors';
import ModalList from '../ModalList/ModalList';
import Modal from '../Modal';

const FollowModal = ({
  title,
  isModalOpen,
  setIsModalOpen,
  userId,
  ...otherProps }) => {
  const follow = useSelector(state => conditionalFollowSelector(title)(state));

  const dispatch = useDispatch();

  useEffect(() => {
    if (title === 'Followers') {
      dispatch(getFollowers(userId));
    } else {
      dispatch(getFollowing(userId));
    }
  }, []);

  useEffect(() => {
    // console.log(follow);
  }, [follow]);

  return (
    <Modal isOpen={isModalOpen} setModalOpen={setIsModalOpen} {...otherProps}>
      <ModalList>
        <h1>{title}</h1>

      </ModalList>
    </Modal>
  );
};

FollowModal.propTypes = {
  title: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired
};

export default FollowModal;
