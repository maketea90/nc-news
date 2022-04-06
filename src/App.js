import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import './App.css';
import AllArticles from './components/AllArticles';
import Home from './components/Home';
import ArticlesByTopic from './components/ArticlesByTopic';
import ArticleById from './components/ArticleById';
import { UserContext } from './contexts/loggedInUser';
import {useState} from 'react';

function App() {
  const [loggedInUser, setLoggedInUser] = useState('jessjelly')
  return (
    <UserContext.Provider value={loggedInUser}>
    <BrowserRouter>
    <div className="App">
      <h1>NC-News</h1>
      <nav className='section__articles'>
        <Link to='/'>Homepage </Link>
        <Link to='/articles'>View all articles</Link>
        <Link to='/articles/coding'>View coding articles</Link>
        <Link to='/articles/football'>View football articles</Link>
        <Link to='/articles/cooking'>View cooking articles</Link>
      </nav> 
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/articles' element={<AllArticles/>}/>
        <Route path='/articles/:topic' element={<ArticlesByTopic/>}/>
        <Route path='/article/:article_id' element={<ArticleById/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
