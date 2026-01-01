import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [surveys, setSurveys] = useState([]);

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const res = await api.get('/surveys');
                setSurveys(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSurveys();
    }, []);

    return (
        <div className="container fade-in">
            <div className="page-header">
                <h1>Dashboard</h1>
                <Link to="/create-survey" className="btn btn-primary">Create New Survey</Link>
            </div>

            <div className="glass-panel">
                <h2>Available Surveys</h2>
                <div className="card-grid">
                    {surveys.length === 0 ? (
                        <p>No surveys available. Create one!</p>
                    ) : (
                        surveys.map((survey) => (
                            <div key={survey.id} className="survey-card">
                                <h3>{survey.title}</h3>
                                <p>{survey.description}</p>
                                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                    <Link to={`/take-survey/${survey.id}`} className="btn btn-primary" style={{ fontSize: '0.9rem' }}>
                                        Take Survey
                                    </Link>
                                    {user && survey.userId === user.id && (
                                        <Link to={`/results/${survey.id}`} className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>
                                            View Results
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
