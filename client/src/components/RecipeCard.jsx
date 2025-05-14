import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaHeart } from 'react-icons/fa';


export default function RecipeCard({ recipe }) {
  const { user, token } = useAuth();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (!user) setSaved(false); // Reset if user logs out
  }, [user]);


  const handleSave = async () => {
    if (!token) return;

    try {
      // Saves recipe to DB (or skips if already saved)
      const saveRes = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: recipe.title,
          image: recipe.image,
          ingredients: recipe.ingredients || [],
          instructions: recipe.instructions || '',
          moodTags: recipe.moodTags || [],
          nutrients: recipe.nutrients || {},
        }),
      });

      const savedRecipe = await saveRes.json();
      if (!saveRes.ok) throw new Error(savedRecipe.message || 'Failed to save recipe');

      // Adds to favourites
      const favRes = await fetch('http://localhost:5000/api/users/favourites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recipeId: savedRecipe._id }),
      });

      const favData = await favRes.json();
      if (!favRes.ok) throw new Error(favData.message || 'Failed to add to favourites');

      setSaved(true);
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="border p-4 rounded shadow relative">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-bold mt-2">{recipe.title}</h2>
      <p>{recipe.ingredients.slice(0, 3).join(', ')}...</p>

      {/* Heart icon only if logged in */}
      {user && (
        <button
          onClick={handleSave}
          title={saved ? 'Saved!' : 'Save to favourites'}
          className="absolute top-2 right-2 text-red-500 hover:text-red-600"
        >
          <FaHeart fill={saved ? 'red' : 'lightgray'} />
        </button>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

