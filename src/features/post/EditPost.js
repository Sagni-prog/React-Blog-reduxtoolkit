import React,{useState} from 'react';
import styles from './input.module.css';
import style from './post.module.css';
import { useDispatch  } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectSinglePost } from './postSlice';
import { useParams,useNavigate } from 'react-router-dom';
import { updatePost } from './postSlice';

const EditPost = () => {
    
    const { postId } = useParams();
    const navigate = useNavigate()

    const post = useSelector((state) => selectSinglePost(state,Number(postId)));
       
  const [title,setTitle] = useState(post?.title);
  const [content,setContent] = useState(post?.content);
 

  const dispatch = useDispatch();

  const changeTitle = e => setTitle(e.target.value);
  const changeContent = e => setContent(e.target.value);



  const handleSubmit = (e) => {
     e.preventDefault();
     dispatch(updatePost({id: post.id,title,content}));
     setTitle('');
     setContent('');
     navigate(`/post/${postId}`)
     
  }
  
  return (
    <div className = {style.container}>
    <div className={styles.inner_container}>
      <div>
          <h1 className={styles.color}>Edit Post</h1>
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

export default EditPost