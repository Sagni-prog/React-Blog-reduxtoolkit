import React from 'react'
import styles from './header.module.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className={styles.nav}>
         <div className={styles.container}>
             <div className={styles.logo}>
                  <Link to= '/' >Blog</Link>
             </div>

             <div className ={styles.links}>
                 <ul>
                     <Link to='/' >Home</Link>
                     <Link to = 'addPost'>AddPost</Link>
                 </ul>
             </div>
         </div>
    </div>
  )
}

export default Header