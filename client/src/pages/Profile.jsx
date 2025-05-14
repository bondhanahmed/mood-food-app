import React, { useEffect, useState } from 'react';
import '../App.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';

const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'];

export default function Profile() {
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [dietaryPrefs, setDietaryPrefs] = useState([]);
    const [useFilter, setUseFilter] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!token) return;
        fetch('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => res.json())
        .then(data => {
            setEmail(data.email);
            setDietaryPrefs(data.dietaryPreferences || []);
            setUseFilter(data.useDietaryFilter || false);
        });
    }, [token]);

    const handleToggle = pref => {
        setDietaryPrefs(prev =>
        prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
        );
    };

    const handleSave = async () => {
        try {
        const res = await fetch('http://localhost:5000/api/users/profile', {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
            dietaryPreferences: dietaryPrefs,
            useDietaryFilter: useFilter,
            }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to save');
        setMessage('Profile updated successfully!');
        } catch (err) {
        setMessage(err.message);
        }
    };

    const goBack = () => navigate(-1);

    return (
        <div className="page-container">
        <div className="profile-top-bar">
            <FaArrowLeft className="icon-button" onClick={goBack} />
        </div>

        <div className="profile-card">
            <div className="avatar-container">
            <FaUserCircle className="avatar-icon" />
            </div>

            <section className="info-section">
            <h3 className="section-title">Personal Details</h3>
            <p><strong>Name:</strong> {user?.username}</p>
            <p><strong>Email:</strong> {email}</p>
            </section>

            <section className="info-section">
            <h3 className="section-title">Dietary Preferences</h3>
            {dietaryOptions.map(option => (
                <label key={option} className="checkbox-label">
                <input
                    type="checkbox"
                    checked={dietaryPrefs.includes(option)}
                    onChange={() => handleToggle(option)}
                />
                {option}
                </label>
            ))}
            <label className="checkbox-label toggle-margin">
                <input
                type="checkbox"
                checked={useFilter}
                onChange={e => setUseFilter(e.target.checked)}
                />
                Use dietary preferences for filtering
            </label>
            </section>

            <section className="info-section">
            <h3 className="section-title">Quick Links</h3>
            <button className="profile-nav-button" onClick={() => navigate('/dashboard')}>
                Dashboard →
            </button>
            <button className="profile-nav-button" onClick={() => navigate('/favourites')}>
                Favourite Recipes →
            </button>
            </section>

            {message && <p className="success-message">{message}</p>}
            <button onClick={handleSave} className="saveBtn">Save Profile</button>
            <button onClick={() => { logout(); navigate('/'); }} className="logoutBtn">Logout</button>
        </div>
        </div>
    );
}
