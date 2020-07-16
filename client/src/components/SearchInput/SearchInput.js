import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styles from 'components/SearchInput/SearchInput.module.scss';
import { searchUsers } from 'actions/users/userActions';
import Popover from 'components/Popover/Popover';
import PopoverList from 'components/Popover/PopoverList';
import PopoverListItem from 'components/Popover/PopoverListItem';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { TiDelete } from 'react-icons/ti';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDebounce } from '../../hooks/useDebounce';

const SearchInput = () => {
  const [value, setValue] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { users, usersLoading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();

  const { debounce } = useDebounce((val) => {
    dispatch(searchUsers(val));
    setIsPopoverOpen(true);
  }, 2000);

  const handleChange = (val) => {
    setValue(val);
    if (!val) {
      setIsPopoverOpen(false);
    } else {
      debounce(val);
    }
  };

  const handleMouseDown = (user) => {
    setValue('');
    history.push(`/${user.username}`);
  };

  return (
    <div className={styles.searchInputContainer}>
      <Popover isPopoverOpen={isPopoverOpen}>
        {(!users.length || error) && !usersLoading ? (
          <PopoverListItem style={{ justifyContent: 'center' }}>
            <span className={styles.notFound}>No results found.</span>
          </PopoverListItem>
        ) : (
          <PopoverList>
            {users.map((user) => (
              <PopoverListItem key={user.created}>
                {usersLoading ? (
                  <LoadingSpinner className={styles.searchProfilePic} />
                ) : (
                  <Link
                    to={`/${user.username}`}
                    onMouseDown={() => handleMouseDown(user)}
                    style={{ cursor: 'pointer', width: '100%' }}
                  >
                    <ProfilePic
                      url={user.profilePic}
                      className={styles.searchProfilePic}
                    />
                    <span>{user.username}</span>
                  </Link>
                )}
              </PopoverListItem>
            ))}
          </PopoverList>
        )}
      </Popover>
      <input
        id="searchInput"
        className={`${styles.SearchInput}`}
        type="search"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        required
        onFocus={() => value && setIsPopoverOpen(true)}
        onBlur={() => setIsPopoverOpen(false)}
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
        onMouseDown={() => {
          setIsPopoverOpen(false);
          setValue('');
        }}
      >
        {usersLoading ? (
          <LoadingSpinner className={styles.deleteIcon} />
        ) : (
          <TiDelete className={styles.deleteIcon} />
        )}
      </button>
    </div>
  );
};

export default SearchInput;
