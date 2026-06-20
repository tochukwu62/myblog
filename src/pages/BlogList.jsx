import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/tochukwu62/myblog/contents/public/posts')
      .then(res => {
        if (res.status === 404) {
          throw new Error('Repository or folder not found. Push your code to GitHub first.');
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const mdFiles = data.filter(file => file.name.endsWith('.md'));
          setPosts(mdFiles);
        } else {
          setError('Unexpected response from GitHub.');
        }
      })
      .catch(err => {
        console.error(err);
        setError(err.message || 'Failed to fetch posts.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading blog posts...</p>;
  if (error) return <p style={{ color: 'red' }}>⚠️ {error}</p>;

  return (
    <div>
      <h1>Blog</h1>
      {posts.length === 0 ? (
        <p>No posts yet. Visit <a href="/admin">/admin</a> to create one.</p>
      ) : (
        posts.map(post => (
          <div key={post.name}>
            <Link to={`/post/${post.name.replace('.md', '')}`}>
              {post.name.replace('.md', '')}
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;