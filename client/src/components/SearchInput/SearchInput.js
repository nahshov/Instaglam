import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from 'components/SearchInput/SearchInput.module.scss';
import { searchUser as searchUserAction } from 'actions/users';
import { AiOutlineSearch } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';
import Popover, { ArrowContainer } from 'react-tiny-popover';

const SearchInput = ({ users: { users, loading }, searchUser }) => {
  const [value, setValue] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleChange = (val) => {
    if (!val) {
      setIsPopoverOpen(false);
    } else {
      setIsPopoverOpen(true);
    }
    setValue(val);
    searchUser(val);
  };

  return (
    <div className={styles.searchInputContainer}>
      <Popover
        isOpen={isPopoverOpen}
        position="bottom"
        disableReposition
        onClickOutside={() => setIsPopoverOpen(false)}
        content={() =>
          users.map((user) => <div key={user.created}>{user.username}</div>)
        }
        className={styles.popover}
      >
        <input
          id="searchInput"
          className={styles.SearchInput}
          type="search"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          required
          onFocus={() => value && setIsPopoverOpen(true)}
          onBlur={() => setIsPopoverOpen(false)}
        />
      </Popover>
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

SearchInput.propTypes = {
  searchUser: PropTypes.func.isRequired,
  users: PropTypes.shape({
    loading: PropTypes.bool,
    users: PropTypes.array
  }).isRequired
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps, { searchUser: searchUserAction })(
  SearchInput
);
