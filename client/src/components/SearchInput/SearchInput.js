import React from 'react';
import styles from './SearchInput.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchInput = () => {
	return (
		<div className={styles.SearchInputContainer}>
			<input className={styles.SearchInput} />
			<label className={styles.SearchPlaceholder}>
				<AiOutlineSearch />Search
			</label>
		</div>
	);
};

export default SearchInput;
