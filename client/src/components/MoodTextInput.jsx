import React, { useState } from 'react';

export default function MoodTextInput({ onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      // setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="moodText" style={{ fontWeight: 'bold' }}>
            Describe how you're feeling today:
        </label>
        <textarea
        id="moodText"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g., I’m exhausted and want something warm and quick to eat"
        rows={3}
        style={{
            display: 'block',
            width: '100%',
            padding: '0.75rem',
            marginTop: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            resize: 'vertical'
        }}
        />

        <button type="submit" style={{ marginTop: '0.75rem' }}>
            Generate Recipe Suggestions
        </button>
    </form>
  );
}
