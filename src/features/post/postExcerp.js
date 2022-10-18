import React from 'react'
import styles from './postList.module.css';

const postExcerp = ({props}) => {
 
    const posts = props.post
    
  return (
         <div className= {styles.posts}>
             <div className={ styles.post_text}>
                 <h1>{posts.title}</h1>
                 <p className= {styles.font}>{posts.content}</p>
          </div>
      </div>
  )
}

export default postExcerp