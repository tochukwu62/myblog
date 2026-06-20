import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Post = () => {
  const { slug } = useParams();
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/tochukwu62/myblog/main/public/posts/${slug}.md`)
      .then(res => res.text())
      .then(text => setContent(text))
      .catch(err => console.error(err));
  }, [slug]);

  return (
    <div>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default Post;