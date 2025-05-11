import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    console.log("Fetching recipe with ID:", id);

    fetch(`http://localhost:5000/api/recipes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched recipe:", data); // debugging
        setRecipe(data);
      })
      .catch((err) => {
        console.error("Error fetching recipe:", err);
        setRecipe(null); // prevent endless loading
      });
  }, [id]);
  
  if (recipe === null) return <p>Recipe not found or failed to load.</p>;
  if (!recipe) return <p>Loading...</p>;
  

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} style={{ maxWidth: '300px' }} />
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <p><strong>Mood Tags:</strong> {recipe.moodTags.join(', ')}</p>
      <p><strong>Nutrients:</strong> {Object.entries(recipe.nutrients).map(([key, val]) => `${key}: ${val}`).join(', ')}</p>
    </div>
  );
}
