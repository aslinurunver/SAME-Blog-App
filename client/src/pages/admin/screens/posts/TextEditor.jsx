import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean']
  ]
};

const TextEditor = (props) => {
  const [value, setValue] = useState('');
  props.desc(value);

  return <ReactQuill theme="snow" modules={modules} value={value} desc={value} onChange={setValue} />;
};

export default TextEditor;
