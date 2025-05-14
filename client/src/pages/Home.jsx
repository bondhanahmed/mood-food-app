import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import MoodSelector from '../components/MoodSelector';
import RecipeCard from '../components/RecipeCard';

// Home page where users select their mood and get recipes
function Home() {
  const [mood, setMood] = useState('');
  const [recipes, setRecipes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (mood) {
      // Fetch recipes based on selected mood
      fetch(`/api/recipes/mood/${mood}`)
        .then(res => res.json())
        .then(data => setRecipes(data));
    }
  }, [mood]);

  return (
    <div className="p-4">
      <MoodSelector setMood={setMood} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {recipes.map(recipe => (
          <RecipeCard key={`${recipe._id}-${user ? user._id : 'guest'}`} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default Home;
