import React from 'react'
import Logo from '../Logo/Logo.js'
import styles from './Navbar.module.scss'
import {Link, NavLink} from 'react-router-dom';
import SearchInput from '../SearchInput/SearchInput.js';


const Navbar = () => {
    return (
        
        <nav className={styles.Navbar}>
            <div className={styles.content}>
            <Link exact to='/' >
                <Logo />
            </Link>
            <SearchInput />
            </div>
        </nav>
        
    )
}

export default Navbar
