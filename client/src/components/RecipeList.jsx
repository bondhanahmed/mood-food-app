import React from 'react';
import { Link } from 'react-router-dom';

export default function RecipeList({ recipes }) {
  if (!Array.isArray(recipes)) return null;

  return (
    <div className="recipe-grid">
      <h2>Our Mood-Matched Recipes</h2>
      {recipes.length === 0 ? (
        <p>No internal recipes available for this mood.</p>
      ) : (
        recipes.map((recipe) => (
          <div className="recipe-card" key={recipe._id}>
            <h3>
              <Link to={`/recipe/${recipe._id}`} style={{ textDecoration: 'none', color: '#0077cc' }}>
                {recipe.title}
              </Link>
            </h3>

            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
              />
            )}

            <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <p><strong>Mood Tags:</strong> {recipe.moodTags.join(', ')}</p>
          </div>
        ))
      )}
    </div>
  );
}
