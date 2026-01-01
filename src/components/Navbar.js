import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar fade-in">
            <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>FeedbackApp</Link>
            </div>
            <div className="nav-links">
                {user ? (
                    <>
                        <Link to="/">Dashboard</Link>
                        <Link to="/create-survey">Create Survey</Link>
                        <Link to="/profile" style={{ marginLeft: '2rem', textDecoration: 'none' }}>
                            <span className="user-badge">Hello, {user.username}</span>
                        </Link>
                        <button onClick={handleLogout} className="btn btn-secondary" style={{ marginLeft: '1rem', padding: '0.4rem 0.8rem' }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register" className="btn btn-primary" style={{ color: 'white' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
