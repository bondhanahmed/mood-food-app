import React from 'react';

// UI component for displaying recipe information including image and caption
export default function RecipeCard({ recipe }) {
  return (
    <div className="border p-4 rounded shadow">
      <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
      <h2 className="text-xl font-bold mt-2">{recipe.title}</h2>
      <p>{recipe.ingredients.slice(0, 3).join(', ')}...</p>
    </div>
  );
}
