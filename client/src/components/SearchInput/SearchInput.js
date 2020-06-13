import React from 'react'
import styles from './SearchInput.module.scss'

const SearchInput = () => {
    return (
        <div className={styles.SearchInputContainer}>
        <input className={styles.SearchInput} />
        <label className={styles.SearchPlaceholder}><i class="fas fa-search"></i>Search</label>
        </div>
    )
}

export default SearchInput
