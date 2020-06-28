import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from 'components/SearchInput/SearchInput.module.scss';
import { searchUser as searchUserAction } from 'actions/users';
import { AiOutlineSearch } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { ListGroup } from 'react-bootstrap';

const SearchInput = ({ users: { user, loading }, searchUser }) => {
  const [value, setValue] = useState('');

  const handleChange = (val) => {
    setValue(val);
    searchUser(val);
  };

  let popover = (
    <Popover id="popover-basic">
      <Popover.Content>No result found</Popover.Content>
    </Popover>
  );

  useEffect(() => {
    console.log(user);
    popover = (
      <Popover id="popover-basic">
        {/* <Popover.Content> */}
        <ListGroup>
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
        {/* </Popover.Content> */}
      </Popover>
    );
  }, [user]);

  return (
    <div className={styles.searchInputContainer}>
      <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
        <input
          id="searchInput"
          className={styles.SearchInput}
          type="search"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          required
        />
      </OverlayTrigger>
      <label htmlFor="searchInput" className={styles.searchLabel}>
        <div>
          <AiOutlineSearch className={styles.searchIcon} />
          <span className={styles.searchText}>{!value ? 'Search' : value}</span>
        </div>
      </label>
      <button
        className={styles.deleteIconWrapper}
        type="button"
        onClick={() => {
          setValue('');
        }}
      >
        <TiDelete className={styles.deleteIcon} />
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps, { searchUser: searchUserAction })(
  SearchInput
);
