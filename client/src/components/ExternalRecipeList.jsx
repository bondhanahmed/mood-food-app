import React from 'react';

export default function ExternalRecipeList({ recipes, favourites, toggleFavourite }) {
    //console.log('ExternalRecipeList received:', recipes);
    
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
              <button
                className={`favourite-icon ${isFavourited ? 'favourited' : ''}`}
                onClick={() => toggleFavourite(recipe)}
              >
                ♥
              </button>
  
              <h3>{recipe.title}</h3>
              {recipe.image && <img src={recipe.image} alt={recipe.title} />}
              <p>
                <a href={`https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}`}
                   target="_blank" rel="noopener noreferrer">
                  View full recipe
                </a>
              </p>
            </div>
          );
        })}
      </div>
    );
  }

