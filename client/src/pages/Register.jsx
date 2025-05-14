import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
        const res = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Registration failed');

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        navigate('/profile');
        } catch (err) {
        setError(err.message);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Register</h2>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Register</button>
            </form>
            <p style={styles.link}>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: '#f3e8ff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
    },
    card: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 0 12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
    },
    title: {
        fontSize: '1.75rem',
        marginBottom: '1rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    input: {
        padding: '0.75rem',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '0.75rem',
        fontSize: '1rem',
        backgroundColor: '#7c3aed',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontSize: '0.9rem',
        marginBottom: '0.5rem',
    },
    link: {
        marginTop: '1rem',
        fontSize: '0.9rem',
    },
};

export default Register;
