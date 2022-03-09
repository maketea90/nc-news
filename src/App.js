import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import './App.css';
import AllArticles from './components/AllArticles';
import Home from './components/Home';
import ArticlesByTopic from './components/ArticlesByTopic';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <nav>
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
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
