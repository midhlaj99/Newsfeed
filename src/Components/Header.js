import React from 'react';
import styles from "./header.module.css"

function Header(){

    return(
        <div className={styles.header}>
            <span className={styles.text}>New York Times</span> 
        </div>
    )
}
export default Header