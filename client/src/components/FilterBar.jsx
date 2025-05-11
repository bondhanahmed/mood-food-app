import React from 'react';

const cuisines = ['Italian', 'Chinese', 'Mexican', 'Indian', 'Thai', 'French', 'American'];
const times = [15, 30, 60]; // in minutes

export default function FilterBar({ onFilterChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label>
        Cuisine:
        <select name="cuisine" onChange={handleChange} defaultValue="">
          <option value="" disabled>Select a cuisine</option>
          {cuisines.map(c => (
            <option key={c} value={c.toLowerCase()}>{c}</option>
          ))}
        </select>
      </label>

      <label style={{ marginLeft: '1rem' }}>
        Max Cooking Time:
        <select name="maxTime" onChange={handleChange} defaultValue="">
          <option value="" disabled>Select time</option>
          {times.map(t => (
            <option key={t} value={t}>{t} minutes</option>
          ))}
        </select>
      </label>
    </div>
  );
}
