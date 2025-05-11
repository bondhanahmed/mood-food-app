import React, { useState } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="topbar">
      <FaBars
        className="topbar-icon left"
        title="Menu"
        onClick={() => setMenuOpen(prev => !prev)}
      />

      <span className="topbar-logo">🍽️ MoodMeals</span>

      <FaUserCircle className="topbar-icon right" title="Profile" />

      {menuOpen && (
        <nav className="dropdown-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
          <Link to="/favourites" onClick={() => setMenuOpen(false)}>⭐ Favourites</Link>
          <Link to="/submit" onClick={() => setMenuOpen(false)}>📝 Submit Recipe</Link>
        </nav>
      )}
    </header>
  );
}
