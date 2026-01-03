import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }
    const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown';

    return (
        <div className="container fade-in">
            <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                    borderRadius: '50%',
                    margin: '0 auto 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    color: 'white',
                    fontWeight: 'bold'
                }}>
                    {user.username.charAt(0).toUpperCase()}
                </div>

                <h1 style={{ marginBottom: '0.5rem' }}>{user.username}</h1>
                <p style={{ color: '#666', marginBottom: '2rem' }}>{user.email}</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    <div className="stat-card" style={{ padding: '1rem' }}>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>User ID</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{user.id}</div>
                    </div>
                    <div className="stat-card" style={{ padding: '1rem' }}>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>Account Type</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Standard</div>
                    </div>
                </div>

                <button onClick={() => navigate('/')} className="btn btn-secondary">
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
