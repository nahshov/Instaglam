import React from 'react';
import styles from './SearchInput.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';

const SearchInput = () => {
	return (
		<div className={styles.searchInputContainer}>
			<input className={styles.SearchInput} />
			<label className={styles.searchLabel}>
                <div>
				    <AiOutlineSearch className={styles.searchIcon}/> <span>Search</span>
                </div>
                <TiDelete className={styles.deleteIcon} />
			</label>
		</div>
	);
};

export default SearchInput;
