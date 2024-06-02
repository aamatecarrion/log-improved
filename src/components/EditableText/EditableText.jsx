import React, { useState } from 'react';
import './EditableText.css';

const EditableText = ({ initialText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className='editableText'>
      {isEditing ? (
        <input
          className='editableText__input'
          type='text'
          value={text}
          onBlur={handleBlur}
          onChange={handleChange}
          autoFocus
        />
      ) : (
        <span className='editableText__display' onClick={handleTextClick}>
          {text}
        </span>
      )}
    </div>
  );
};

export default EditableText;