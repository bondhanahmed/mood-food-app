import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

  return (
    <header className="topbar">
      {/* Left: Menu icon */}
      <FaBars
        className="topbar-icon left"
        title="Menu"
        onClick={() => setMenuOpen(prev => !prev)}
      />

      {/* Centre: Logo */}
      <span className="topbar-logo">🍽️ MoodMeals</span>

      {/* Right: Auth status */}
      <div className="topbar-icon right" style={{ position: 'relative' }}>
        {!user ? (
          <Link to="/login" className="login-button">
            Login
          </Link>
        ) : (
          <>
            <FaUserCircle
              className="cursor-pointer"
              title="Profile"
              size={24}
              onClick={() => setProfileOpen(prev => !prev)}
            />
            {profileOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-header">👋 {user.username}</div>
                <Link to="/profile" onClick={() => setProfileOpen(false)}>Profile</Link>
                <Link to="/favourites" onClick={() => setProfileOpen(false)}>Favourites</Link>
                <Link to="/dashboard" onClick={() => setProfileOpen(false)}>Dashboard</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Dropdown nav menu (left hamburger) */}
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
