import React from 'react';
import Post from './features/post/Post';
import './App.css';
import PostInput from './features/post/PostInput';
import PostList from './features/post/PostList';
import Header from './features/post/header/Header';
import SinglePostPage from './features/post/SinglePostPage';
import EditPost from './features/post/EditPost';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

function App() {
  return (
    <div >
       <Router>
        <Header />
          <Routes>
            <Route index element = {<PostList />} />
            <Route path = '/' element = {<PostList />} />
              <Route path = 'addPost' element = {<PostInput />} />

                <Route path = '/post'>
                    <Route path = ":postId" element = {<SinglePostPage />} />
                    <Route path = "edit/:postId" element = {<EditPost />} />
                </Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
