import React from 'react';

//const cuisines = ['Italian', 'Chinese', 'Mexican', 'Indian', 'Thai', 'French', 'American'];
//const times = [15, 30, 60]; // in minutes

export default function FilterBar({ onFilterChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="filter-bar" style={{ marginBottom: '1rem' }}>
      <label>
        Cuisine:
        <select name="cuisine" onChange={handleChange} defaultValue="">
          <option value="">Any</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
          <option value="French">French</option>
          <option value="Thai">Thai</option>
          <option value="American">American</option>
        </select>
      </label>

      <label style={{ marginLeft: '1rem' }}>
        Max Time (min):
        <input
          type="number"
          name="maxTime"
          min="0"
          onChange={handleChange}
          placeholder="e.g. 30"
        />
      </label>

      <label style={{ marginLeft: '1rem' }}>
        Dietary:
        <select name="diet" onChange={handleChange} defaultValue="">
          <option value="">Any</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten free">Gluten Free</option>
          <option value="dairy free">Dairy Free</option>
          <option value="ketogenic">Ketogenic</option>
          <option value="pescetarian">Pescetarian</option>
        </select>
      </label>
    </div>
  );
}
