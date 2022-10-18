import React from 'react'
import styles from './postList.module.css';
import style from './post.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { selectSinglePost,deletePost } from './postSlice';
import {FaThumbsUp} from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { Link,useNavigate } from 'react-router-dom';


const SinglePostPage = () => {

    const { postId } = useParams();
    const navigate = useNavigate()

    const dispatch = useDispatch()

  const post = useSelector((state) => selectSinglePost(state,Number(postId)));

  const handleDelete = () => {
      dispatch(deletePost({id: postId}))
      navigate('/')
      
  }

    

  return (
    <div className = {style.container}>
  <div className = {styles.inner_container}>
  <div className= {styles.posts}>
  <div className={ styles.post_text}>
    <h1>{post.title}</h1>                
     <p className= {styles.font}>{post.content}</p>
      <div className={styles.icon}>
         <FaThumbsUp className={styles.like} />  
          <p>0</p>
          <Link to = {`../../post/edit/${post.id}`}>Edit</Link>
          <p className={styles.delete} onClick = {handleDelete}>Delete</p>
        </div>
    </div>
  </div>
        
  </div> 
</div>

  )
}

export default SinglePostPage