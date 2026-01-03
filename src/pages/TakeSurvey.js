import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const TakeSurvey = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [survey, setSurvey] = useState(null);
    const [answers, setAnswers] = useState({}); 

    useEffect(() => {
        const fetchSurvey = async () => {
            try {
                const res = await api.get(`/surveys/${id}`);
                setSurvey(res.data);
                const initialAnswers = {};
                res.data.Questions.forEach(q => {
                    initialAnswers[q.id] = { questionId: q.id };
                });
                setAnswers(initialAnswers);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSurvey();
    }, [id]);

    const handleInputChange = (questionId, value, isOption = false) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: {
                questionId,
                text: isOption ? null : value,
                optionId: isOption ? value : null
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                surveyId: id,
                answers: Object.values(answers)
            };
            await api.post('/surveys/response', payload);
            alert('Survey submitted successfully!');
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Failed to submit survey');
        }
    };

    if (!survey) return <div className="container">Loading...</div>;

    return (
        <div className="container fade-in">
            <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '0.5rem' }}>{survey.title}</h1>
                <p style={{ marginBottom: '2rem', color: '#666' }}>{survey.description}</p>

                <form onSubmit={handleSubmit}>
                    {survey.Questions.map((q) => (
                        <div key={q.id} className="input-group" style={{ marginBottom: '2rem' }}>
                            <label style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{q.text}</label>

                            {q.type === 'short_answer' ? (
                                <textarea
                                    className="input-field"
                                    rows="3"
                                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                                    required
                                />
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {q.Options.map((opt) => (
                                        <label key={opt.id} style={{ fontWeight: 'normal', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <input
                                                type="radio"
                                                name={`q-${q.id}`}
                                                value={opt.id}
                                                onChange={(e) => handleInputChange(q.id, e.target.value, true)}
                                                required
                                            />
                                            {opt.text}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <button type="submit" className="btn btn-primary">Submit Answers</button>
                </form>
            </div>
        </div>
    );
};

export default TakeSurvey;
