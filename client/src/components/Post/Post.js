import React from 'react';
import styles from './Post.module.scss';
import ProfilePic from 'components/ProfilePic/ProfilePic';


const Post = () => {
    return (
        <article className={styles.postContainer}>
           <div className={styles.postHeader}>
               <div className={styles.userIdentifier}>
                    <profilePic />
                    
               </div>
           </div>
        </article>
    )
}

export default Post
