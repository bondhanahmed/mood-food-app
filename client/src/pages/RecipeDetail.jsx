import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function RecipeDetail() {
  const { source, id } = useParams(); // source = "internal" or "external"
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [recipe, setRecipe] = useState(null);
  const [unitType, setUnitType] = useState('metric');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const endpoint =
          source === 'external'
            ? `http://localhost:5000/api/external-recipes/detail/${id}`
            : `http://localhost:5000/api/recipes/${id}`;

        const res = await fetch(endpoint);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Failed to load recipe');
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRecipe();
  }, [id, source]);

  const handleToggleUnits = () => {
    setUnitType(prev => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  const handleBack = () => navigate(-1);

  const handleSave = async () => {
    if (!token || !recipe) return;

    try {
      // Save recipe (if external)
      if (source === 'external') {
        const saveRes = await fetch('http://localhost:5000/api/recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(recipe),
        });
        const saved = await saveRes.json();
        if (!saveRes.ok) throw new Error(saved.message || 'Save failed');

        // Add to favourites
        await fetch('http://localhost:5000/api/users/favourites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ recipeId: saved._id }),
        });
      } else {
        await fetch('http://localhost:5000/api/users/favourites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ recipeId: recipe._id }),
        });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail">
      <button onClick={handleBack} className="back-button"><FaArrowLeft /></button>

      <h2 className="title">{recipe.title}</h2>

      <div className="image-container">
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        {user && (
          <button onClick={handleSave} className="heart-button" title="Save to favourites">
            <FaHeart />
          </button>
        )}
      </div>

      <p className="description">{recipe.description || recipe.summary || 'No description provided.'}</p>

      <div className="tags-container">
        {(recipe.dietaryTags || recipe.dietLabels || []).map((tag, index) => (
          <span key={index} className={`tag ${tag.toLowerCase().replace(/\s/g, '-')}`}>
            {tag}
          </span>
        ))}
      </div>

      <div className="sections">
        <div className="instructions">
          <h3>Cooking Instructions</h3>
          {Array.isArray(recipe.instructions)
            ? <ol>{recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}</ol>
            : <p>{recipe.instructions}</p>}
        </div>

        <div className="ingredients-nutrients">
          <div className="tabs">
            <button onClick={() => setUnitType('metric')} className={unitType === 'metric' ? 'active' : ''}>Ingredients</button>
            <button onClick={() => setUnitType('imperial')} className={unitType === 'imperial' ? 'active' : ''}>Nutrients</button>
          </div>

          {unitType === 'metric' && (
            <ul className="ingredients-list">
              {(recipe.ingredients || []).map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          )}

          {unitType === 'imperial' && (
            <ul className="nutrients-list">
              {(recipe.nutrients?.imperial || []).map((nutrient, i) => (
                <li key={i}>{nutrient.name}: {nutrient.amount} {nutrient.unit}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
}
