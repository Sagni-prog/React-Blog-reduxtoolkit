import React,{useState} from 'react';
import styles from './input.module.css';
import style from './post.module.css';
import { useDispatch  } from 'react-redux';
import { addPost } from './postSlice';
import setId from '../../helper/setId';
import { useSelector } from 'react-redux';
import { selectAllPosts } from './postSlice';
import { addNewPost } from './postSlice';

const PostInput = () => {
  
  let id;
  const posts = useSelector(selectAllPosts);
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  // const [canSave,setCanSave] = useState(false)

  const dispatch = useDispatch();

  const changeTitle = e => setTitle(e.target.value);
  const changeContent = e => setContent(e.target.value);



  const handleSubmit = (e) => {
     e.preventDefault();

     id = setId(posts)
     dispatch(addNewPost({id,title,content}));
     setTitle('');
     setContent('');
     
  }
  
  return (
    <div className = {style.container}>
    <div className={styles.inner_container}>
      <div>
          <h1 className={styles.color}>Post Form</h1>
      </div>
      <div className={styles.input_field}>
          <form onSubmit={ handleSubmit } className={styles.form}>
              <div className={styles.field}>
                  <label>Title</label>
                  <input 
                        className={styles.input} 
                        value = {title} 
                        onChange = {changeTitle}
                      />
              </div>

              <div className={styles.field}>
                  <label>Content</label>
                  <textarea 
                          className={styles.area}
                          value = {content}
                          onChange = {changeContent} 
                  />
              </div>
              <button
                    className={styles.btn} 
                    type='submit'
                   >
                     Add Post
            </button>
          </form>
      </div>
     </div>
    </div>
  )
}

export default PostInput