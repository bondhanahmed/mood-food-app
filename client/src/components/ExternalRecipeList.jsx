import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';


export default function ExternalRecipeList({ recipes, favourites, toggleFavourite }) {
    //console.log('ExternalRecipeList received:', recipes);
    const { user } = useAuth();

    if (!recipes) {
        return <p>Loading external recipes...</p>;
    }

    if (!Array.isArray(recipes) || recipes.length === 0) {
        return <p>No external recipes found for this mood.</p>;
    }

    return (
      <div className="recipe-grid">
        <h2>Suggested Recipes for you</h2>
        {recipes.map((recipe) => {
          const isFavourited = favourites.some(fav => fav.id === recipe.id);
  
          return (
            <div className="recipe-card" key={recipe.id} style={{ position: 'relative' }}>
              
              {/* Only shows heart if user is logged in */}
              {user && (
                <button
                  className={`favourite-icon ${isFavourited ? 'favourited' : ''}`}
                  onClick={() => toggleFavourite(recipe)}
                >
                  ♥
                </button>
              )}
  
              <h3>
                <Link to={`/recipe/external/${recipe.id}`}>
                  {recipe.title}
                </Link>
              </h3>
              {recipe.image && <img src={recipe.image} alt={recipe.title} />}
              <p>
                <Link to={`/recipe/external/${recipe.id}`}>
                  View full recipe
                </Link>
              </p>
            </div>
          );
        })}
      </div>
    );
  }

