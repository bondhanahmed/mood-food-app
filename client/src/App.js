import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import './App.css';

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import TopBar from './components/TopBar';
import MoodSelector from './components/MoodSelector';
import RecipeList from './components/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import RecipeForm from './pages/RecipeForm';
import ExternalRecipeList from './components/ExternalRecipeList';
import FilterBar from './components/FilterBar';
import { Link } from 'react-router-dom';
import FavouritesPage from './pages/FavouritesPage';
import MoodTextInput from './components/MoodTextInput';


function App() {
  const { user } = useAuth();
  const [moodKeywords, setMoodKeywords] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [moodLogs, setMoodLogs] = useState([]);
  const [externalRecipes, setExternalRecipes] = useState([]);
  const [filters, setFilters] = useState({ cuisine: '', maxTime: '', diet: '' });
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem('favourites');
    return stored ? JSON.parse(stored) : [];
  });
  
  const toggleFavourite = (recipe) => {
    const uniqueKey = `${recipe.id || recipe._id}-${recipe.title}`;
    setFavourites((prevFaves) => {
      const exists = prevFaves.some(fav => `${fav.id || fav._id}-${fav.title}` === uniqueKey);
      return exists
        ? prevFaves.filter(fav => `${fav.id || fav._id}-${fav.title}` !== uniqueKey)
        : [...prevFaves, recipe];
    });
  };
  const handleNlpMoodInput = async (text) => {
    console.log("User submitted mood description:", text);
    try {
      const response = await fetch('http://localhost:5000/api/nlp/mood-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: text })
      });

      const data = await response.json();
      if (data.keywords?.mood) {
        setSelectedMood(data.keywords.mood);
        setMoodKeywords(data.keywords.foods || []);
        console.log("Detected mood:", data.keywords.mood);
        console.log("Suggested foods:", data.keywords.foods); 
      } else {
        console.warn("No mood returned from NLP response");
      }
    } catch (error) {
      console.error('Error during NLP mood fetch:', error);
    }
  };


  useEffect(() => {
    const sorted = [...favourites].sort((a, b) => a.title.localeCompare(b.title));
    localStorage.setItem('favourites', JSON.stringify(sorted));
  }, [favourites]);
  
  
  useEffect(() => {
    const hasFilter = selectedMood || moodKeywords.length > 0 || filters.cuisine || filters.maxTime || filters.diet;

    if (!hasFilter) return;

    const searchTerm = moodKeywords[0] || selectedMood || 'healthy';
    const encodedTerm = encodeURIComponent(searchTerm);

    // Fetch internal recipes if mood is present
    if (selectedMood) {
      fetch(`http://localhost:5000/api/recipes/mood/${selectedMood}`)
        .then((res) => res.json())
        .then((data) => setRecipes(data))
        .catch((err) => console.error('Error fetching internal recipes:', err));
    }


    // Fetch Spoonacular recipes
    fetch(`http://localhost:5000/api/external-recipes/${encodedTerm}?cuisine=${filters.cuisine}&maxTime=${filters.maxTime}&diet=${filters.diet}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Spoonacular response for mood/filters:', data);
        setExternalRecipes(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error('Error fetching Spoonacular recipes:', err));
  }, [selectedMood, moodKeywords, filters.cuisine, filters.maxTime, filters.diet]);


  const logMood = () => {
    if (selectedMood) {
      const newLog = {
        mood: selectedMood,
        timestamp: new Date().toLocaleString()
      };
      setMoodLogs((prevLogs) => [newLog, ...prevLogs]);

      fetch('http://localhost:5000/api/moodlogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood: selectedMood })
      }).catch((err) => console.error('Failed to save mood log:', err));
    }
  };

  return (
    <>
    <TopBar key={user ? user.username : 'guest'} />

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1 style={{padding: '0.5rem', fontFamily: 'Calibri', color: 'blueviolet'}}>Foodie Recommender</h1>
            
            <Link to="/favourites" className="favourites-link">
              ⭐ View My Saved Recipes
            </Link>

            <MoodTextInput onSubmit={handleNlpMoodInput} />
            <FilterBar onFilterChange={setFilters} style={{padding: '2rem'}}/>
            <MoodSelector onSelectMood={setSelectedMood}/>

            {(selectedMood || externalRecipes.length > 0) && (
              <>
                {selectedMood && (
                  <>
                    <p><strong>Selected mood:</strong> {selectedMood}</p>
                    <button onClick={logMood}>Log This Mood</button>
                    <RecipeList recipes={recipes} />
                  </>
                )}
                <ExternalRecipeList
                  recipes={externalRecipes}
                  favourites={favourites}
                  toggleFavourite={toggleFavourite}
                />
              </>
            )}


            {moodLogs.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h3>Logged Moods (this session)</h3>
                <ul>
                  {moodLogs.map((log, index) => (
                    <li key={index}>
                      <strong>{log.mood}</strong> – {log.timestamp}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        }
      />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      <Route path="/submit" element={<RecipeForm />} />
      <Route
        path="/favourites"
        element={
        <FavouritesPage
          favourites={favourites}
          toggleFavourite={toggleFavourite}
        />
        }
      />

      <Route path="/profile" element={<Profile />} />

    </Routes>
    </>
  );
}

export default App;