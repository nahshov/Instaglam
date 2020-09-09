import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
// import { authenticatedUserSelector } from 'actions/auth/authSelectors';
// import { followsSelector } from 'actions/follows/followSelectors';
// import { toggleFollows, getFollows } from 'actions/follows/followActions';
// import { setNumOfFollowers } from 'actions/profile/profileActions';
import Modal from '../Modal';
import ModalList from '../ModalList/ModalList';
import ModalListItem from '../ModalList/ModalListItem';
import Button from '../../Button/Button';

// const structuredFollowSelector = createStructuredSelector({
//   follows: followsSelector,
//   authenticatedUser: authenticatedUserSelector
// });

const HomePageModal = ({ postId = '', isModalOpen, setModalOpen }) => {

  // const { follows, authenticatedUser, profile } = useSelector(structuredFollowSelector);
  // const dispatch = useDispatch();

  // const handleFollow = async () => {
  //   await dispatch(toggleFollows(profile._id, isFollowed));
  //   await dispatch(getFollows(authenticatedUser._id, 'following'));
  //   if (isFollowed) {
  //     dispatch(setNumOfFollowers(-1));
  //   } else {
  //     dispatch(setNumOfFollowers(1));
  //   }
  // };

  return (

    <Modal
      isOpen={isModalOpen}
      setModalOpen={setModalOpen}
      isAnimated
    >
      <ModalList>
        <ModalListItem>
          <Button btnRole="danger btnBlock astext">Unfollow</Button>
        </ModalListItem>
        <ModalListItem>
          <Link to={`/p/${postId}`}>
            <Button btnRole="btnBlock astext">Go To Post</Button>
          </Link>
        </ModalListItem>
        <ModalListItem>
          <Button btnRole="btnBlock astext">Share</Button>
        </ModalListItem>
        <ModalListItem>
          <Button btnRole="btnBlock astext">Copy Link</Button>
        </ModalListItem>
        <ModalListItem>
          <Button btnRole="btnBlock astext" onClick={() => { return setModalOpen(false); }}>Cancel</Button>
        </ModalListItem>
      </ModalList>
    </Modal>
  );
};

HomePageModal.defaultProps = {
  postId: ''
};
HomePageModal.propTypes = {
  postId: PropTypes.string
};
export default HomePageModal;
