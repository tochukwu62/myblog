import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BlogList from './pages/BlogList';
import Post from './pages/Post';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Home</Link>
        <span style={{ margin: '0 1rem' }}>|</span>
        {/* Use a normal anchor so the browser loads the admin page separately */}
        <a href="/admin">Admin</a>
      </nav>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/post/:slug" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;