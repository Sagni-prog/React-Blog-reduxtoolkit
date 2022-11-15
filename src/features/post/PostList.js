import React,{useEffect,useState} from 'react'
import styles from './postList.module.css';
import style from './post.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { 
      selectAllPosts,
      getPostStatus,
      getPostError,
      fetchPosts,
      likePost 
  } from './postSlice';
  import {FaThumbsUp} from 'react-icons/fa'
import { Link } from 'react-router-dom';


const PostList = () => {

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostStatus);
    const postError = useSelector(getPostError);
    const dispatch = useDispatch();

    const [readMore,setReadMore] = useState(false);
    const [reducedId,setReducedId] = useState()
    


    useEffect(() => {
          if(postStatus === 'idle'){
            dispatch(fetchPosts())  
                  
          }  
    },[postStatus,dispatch])

    const handleReadMore = (id) => {
          setReadMore(!readMore)
          setReducedId(id)
          console.log(posts) 
    }
   const handleLike = (post) => {
      dispatch(likePost(post))
   }

    let RenderedPost;
    if(postStatus === 'loading'){
     RenderedPost = <h1>loading...</h1>
    }
     else if(postStatus === 'succeded'){
          RenderedPost = posts.map((post,index) => {
      
       return(
            <div key={index} className= {styles.posts}>         
             {
              !(readMore && (reducedId === post.id)) ? (
                 <div className={ styles.post_text}>
                     <h1>{post.title}</h1>                
                          <p className= {styles.font}>
                            {post.content.substring(0,80)}...
                            <span onClick={() => handleReadMore(post.id)}>
                              Read more
                              </span>
                              </p>
                             </div>  
                             ) : (
                              <div className={ styles.post_text}>
                              <h1>{post.title}</h1>
                              {
                                <>
                                    <p className= {styles.font}>{post.content}</p>
                                    <span onClick={() => handleReadMore(post.id)}>Read less</span>

                                </>
                                 
                              }
                          </div> 
                             )
                       }
                       {
                          post.likes.length ?
                         post.likes.map((like,index) => (
                          
                          <div key={index} className={styles.icon}>       
                          <FaThumbsUp className={styles.like} onClick={ () => handleLike(post) } />  
                                 <p>
                                   {like.likes}
                              </p>
                         </div>
                        
                         )):
 
                          <div className={styles.icon}>       
                          <FaThumbsUp className={styles.like} onClick={ () => handleLike(post) } />  
                                 <p>
                                  0
                              </p>
                         </div>
                        
                      
                       }
                        {/* <div className={styles.icon}>       
                             <FaThumbsUp className={styles.like} onClick={ () => handleLike(post.id) } />  
                                    <p>
                                      {
                                       post.likes.length ? 
                                       post.likes.map((like) => like.likes):
                                         0
                                      }
                                 </p>
                            </div> */}
                        </div>
              )
            })
        }
        else if(postStatus === 'failed'){
            RenderedPost = <p className={styles.warning}>{postError}</p>
        }

  return (
    <div className = {style.container}>
        <div className = {styles.inner_container}>
               { RenderedPost} 
        </div> 
    </div>
    )
  }

export default PostList