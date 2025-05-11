import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecipeForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    moodTags: '',
    calories: '',
    protein: '',
    fat: '',
    carbs: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend Validation
    if (!formData.title || !formData.ingredients || !formData.instructions) {
      alert("Please fill in all required fields.");
      return;
    }

    if (
      isNaN(formData.calories) || formData.calories <= 0 ||
      isNaN(formData.protein) || formData.protein < 0 ||
      isNaN(formData.fat) || formData.fat < 0 ||
      isNaN(formData.carbs) || formData.carbs < 0
    ) {
      alert("Please enter valid positive numbers for nutrition values.");
      return;
    }

    const imageURLPattern = /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/i;
    if (formData.image && !imageURLPattern.test(formData.image)) {
      alert("Please enter a valid image URL (jpg, png, webp, etc.).");
      return;
    }

    const recipe = {
      title: formData.title,
      ingredients: formData.ingredients.split(',').map((s) => s.trim()),
      instructions: formData.instructions,
      moodTags: formData.moodTags.split(',').map((s) => s.trim()),
      nutrients: {
        calories: Number(formData.calories),
        protein: Number(formData.protein),
        fat: Number(formData.fat),
        carbs: Number(formData.carbs)
      },
      image: formData.image
    };

    fetch('http://localhost:5000/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe)
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to submit recipe');
        return res.json();
      })
      .then((data) => {
        alert('Recipe submitted successfully!');
        navigate(`/recipe/${data._id}`);
      })
      .catch((err) => {
        console.error(err);
        alert('Something went wrong!');
      });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <button onClick={() => navigate('/')} style={{ marginBottom: '1.5rem' }}>
        ← Back to Home
      </button>

      <h2>Submit a New Recipe</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '500px',
          gap: '0.75rem'
        }}
      >
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />

        <textarea
          name="ingredients"
          placeholder="Ingredients (comma-separated)"
          value={formData.ingredients}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />

        <textarea
          name="instructions"
          placeholder="Instructions"
          value={formData.instructions}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        
        <label style={{ fontWeight: 'bold' }}>Select Mood Tags:</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {["happy", "sad", "stressed", "tired", "balanced", "comfort", "energised", "uplifting", "stress-relief"].map((tag) => (
                <label key={tag} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="checkbox"
                    value={tag}
                    checked={formData.moodTags.split(',').includes(tag)}
                    onChange={(e) => {
                    const current = formData.moodTags.split(',').filter(Boolean);
                    const updated = e.target.checked
                        ? [...current, tag]
                        : current.filter((t) => t !== tag);
                    setFormData((prev) => ({ ...prev, moodTags: updated.join(',') }));
                    }}
                    style={{ marginRight: '0.4rem' }}
                />
                {tag}
                </label>
            ))}
        </div>


        <input
          name="calories"
          type="number"
          placeholder="Calories"
          value={formData.calories}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />

        <input
          name="protein"
          type="number"
          placeholder="Protein (g)"
          value={formData.protein}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />

        <input
          name="fat"
          type="number"
          placeholder="Fat (g)"
          value={formData.fat}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />

        <input
          name="carbs"
          type="number"
          placeholder="Carbs (g)"
          value={formData.carbs}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />

        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />

        <div style={{ marginTop: '1rem' }}>
          <button type="submit" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  );
}
