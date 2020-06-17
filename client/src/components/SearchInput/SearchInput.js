import React from 'react';
import styles from 'components/SearchInput/SearchInput.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';

const SearchInput = () => (
  <div className={styles.searchInputContainer}>
    <input className={styles.SearchInput} required />
    <label className={styles.searchLabel}>
      <div>
        <AiOutlineSearch className={styles.searchIcon} />
        <span className={styles.searchText}>Search</span>
      </div>
      <TiDelete className={styles.deleteIcon} />
    </label>
  </div>
);

export default SearchInput;
