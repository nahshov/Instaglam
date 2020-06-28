import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from 'components/SearchInput/SearchInput.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';
import { searchUser as searchUserAction } from 'actions/users';

const SearchInput = ({ users: { user, loading }, searchUser }) => {
  const [value, setValue] = useState('');

  const handleChange = (val) => {
    setValue(val);
    searchUser(val);
  };

  return (
    <div className={styles.searchInputContainer}>
      <input
        id="searchInput"
        className={styles.SearchInput}
        type="search"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        required
      />
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
          console.log('s;ajndad');
          setValue('');
        }}
      >
        <TiDelete className={styles.deleteIcon} />
      </button>
    </div>
  );
};

SearchInput.propTypes = {
  users: PropTypes.shape({
    user: PropTypes.object,
    loading: PropTypes.bool
  }).isRequired,
  searchUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps, { searchUser: searchUserAction })(
  SearchInput
);
