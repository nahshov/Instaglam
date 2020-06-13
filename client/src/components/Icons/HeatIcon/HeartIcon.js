import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import styles from './HeartIcon.module.scss';

const HeartIcon = ({ isFilled }) => {
	return (
		<React.Fragment>
			{isFilled ? (
				<AiFillHeart className={styles.HeartIcon} />
			) : (
				<AiOutlineHeart className={styles.HeartIcon} />
			)}
		</React.Fragment>
	);
};

export default HeartIcon;
