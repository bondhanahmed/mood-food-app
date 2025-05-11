import React from 'react';

export default function FavouritesPage({ favourites, toggleFavourite }) {
  if (!favourites || favourites.length === 0) {
    return <p style={{ padding: '2rem' }}>No recipes have been favourited yet.</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Favourite Recipes</h2>
      <div className="recipe-grid">
        {favourites.map((recipe) => (
          <div className="recipe-card" key={recipe.id || recipe._id} style={{ position: 'relative' }}>
            <button
              className="favourite-icon favourited"
              onClick={() => toggleFavourite(recipe)}
            >
              ♥
            </button>

            <h3>{recipe.title}</h3>

            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
              />
            )}

            {recipe.sourceUrl ? (
              <p>
                <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
                  View full recipe
                </a>
              </p>
            ) : (
              <p>
                <a href={`/recipe/${recipe._id}`}>
                  View saved recipe
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
