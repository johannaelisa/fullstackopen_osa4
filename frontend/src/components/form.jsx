import React from 'react';

const Form = ({ addBlog, handleTitleChange, handleAuthorChange, handleUrlChange, newTitle, newAuthor, newUrl }) => {
  return (
    <div>
    <form onSubmit={addBlog}>
        <div><h2>add a new</h2></div>
        <div>title: <input value={newTitle} onChange={handleTitleChange}/></div>
        <div>author: <input value={newAuthor} onChange={handleAuthorChange} /></div>
        <div>url: <input value={newUrl} onChange={handleUrlChange} /></div>
        <div><button type="submit">add</button></div>
    </form>
    </div>
  );
}

export default Form