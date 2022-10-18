import { 
        nanoid,
        createSlice,
        createAsyncThunk 
} from "@reduxjs/toolkit";
import http from "../../http/useApi";


export const fetchPosts = createAsyncThunk('posts/fetchPosts',async() => {
   const response = await http.get('/');
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPOsts',async(newPost) => {
    const response = await http.post('/add',newPost);
    return newPost;
})

export const updatePost = createAsyncThunk('posts/updataPost',async(newPost) => {

   const { id } = newPost;
     const response = await http.patch(`update/${id}`,newPost)
      return newPost
});

export const deletePost = createAsyncThunk('posts/deletePost',async(postId) => { 
    const { id } = postId 
     const result = await http.delete(`delete/${id}`)
      return postId
})

const initialState =  {
    posts: [],
    status: 'idle',
    error: null
    }


export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
      addPost: {
            reducer(state,action){
               state.posts.push(action.payload)
            },
            prepare(title,content){
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content
                     }
                 }
             }
       },
  },
    extraReducers(builder){
        builder 
              .addCase(fetchPosts.pending,(state) => {
                  state.status = 'loading'
              })

              .addCase(fetchPosts.fulfilled,(state,action) => {
                  state.status = 'succeded'
                  const loadedPosts = action.payload;
                  state.posts = state.posts.concat(loadedPosts);
             })

             .addCase(fetchPosts.rejected,(state,action) => {
                 state.status = 'failed'
                 state.error = action.error.message
             })

             .addCase(addNewPost.pending,(state) => {
                 state.status = 'post_loading'
             })

             .addCase(addNewPost.fulfilled,(state,action) => {
                 state.status =  'add_secceded'
                 state.posts.push(action.payload)
             })

             .addCase(addNewPost.rejected,(state,action) => {

                 state.status = 'post_failed'
                 state.error = action.error.message
                 console.log(state.error)
             })

             .addCase(updatePost.fulfilled,(state,action) => {
                 state.status = 'update_succeded'
                const { id } = action.payload
                const posts = state.posts.filter(post => post.id !== id)
                state.posts = [...posts,action.payload]
             })

             .addCase(deletePost.fulfilled,(state,action) => {
                const { id } = action.payload
                state.posts = state.posts.filter(post => post.id !== id)
                
             })
        }
   })
export const selectSinglePost = (state,postId) => state.posts.posts.find(post => post.id === postId)
export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export const { addPost } = postSlice.actions;
export default postSlice.reducer;