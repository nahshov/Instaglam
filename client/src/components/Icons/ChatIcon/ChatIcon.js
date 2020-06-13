import React from 'react';
import { FaRegPaperPlane, FaPaperPlane } from 'react-icons/fa';
import styles from './ChatIcon.module.scss';

const ChatIcon = ({ isFilled }) => {
	return (
		<React.Fragment>
			{isFilled ? (
				<FaPaperPlane className={styles.ChatIcon} />
			) : (
				<FaRegPaperPlane className={styles.ChatIcon} />
			)}
		</React.Fragment>
	);
};

export default ChatIcon;
