import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '../Icons/HomeIcon/HomeIcon';
import ChatIcon from '../Icons/ChatIcon/ChatIcon';
import ExploreIcon from '../Icons/ExploreIcon/ExploreIcon';
import styles from './NavLinks.module.scss';
import HeartIcon from '../Icons/HeatIcon/HeartIcon';
import ProfilePic from '../ProfilePic/ProfilePic';

const NavLinks = () => {
	const [
		homeIcon,
		setHomeIcon
	] = useState(true);

	const [
		chatIcon,
		setChatIcon
	] = useState(true);

	const [
		exploreIcon,
		setExploreIcon
	] = useState(true);

	return (
		<div className={styles.NavLinks}>
			<NavLink
				exact
				to='/'
				isActive={match => {
					if (!match) {
						setHomeIcon(false);
					} else {
						setHomeIcon(true);
					}
				}}
			>
				<HomeIcon isFilled={homeIcon} />
			</NavLink>
			<NavLink
				exact
				to='/direct/inbox'
				isActive={match => {
					if (!match) {
						setChatIcon(false);
					} else {
						setChatIcon(true);
					}
				}}
			>
				<ChatIcon isFilled={chatIcon} />
			</NavLink>
			<NavLink
				exact
				to='/explore'
				isActive={match => {
					if (!match) {
						setExploreIcon(false);
					} else {
						setExploreIcon(true);
					}
				}}
			>
				<ExploreIcon isFilled={exploreIcon} />
			</NavLink>
			<HeartIcon />
			<NavLink
				exact
				to='/profile'
				className={styles.profilePicLink}
				activeClassName={styles.activeProfilePic}
			>
				<ProfilePic />
			</NavLink>
		</div>
	);
};

export default NavLinks;
