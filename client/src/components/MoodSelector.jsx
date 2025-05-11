import React from 'react';

const moods = ['happy', 'sad', 'stressed', 'tired', 'balanced'];

export default function MoodSelector({ onSelectMood, disabled }) {
  return (
    <div className="mood-buttons">
      {moods.map((mood) => (
        <button
          key={mood}
          className="mood-button"
          onClick={() => {
            console.log('Selected mood:', mood);
            onSelectMood(mood)
          }}
          disabled={disabled}
        >
          {mood}
        </button>
      ))}
    </div>
  );
}
