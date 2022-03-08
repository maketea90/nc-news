import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import './App.css';
import AllArticles from './components/AllArticles';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <nav>
        <Link to='/'>Homepage </Link>
        <Link to='/articles'>View all articles</Link>
      </nav> 
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/articles' element={<AllArticles/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
