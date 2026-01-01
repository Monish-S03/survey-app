import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const CreateSurvey = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([
        { text: '', type: 'short_answer', options: [] }
    ]);
    const navigate = useNavigate();

    const addQuestion = () => {
        setQuestions([...questions, { text: '', type: 'short_answer', options: [] }]);
    };

    const updateQuestion = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const addOption = (qIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options.push({ text: '' });
        setQuestions(newQuestions);
    };

    const updateOption = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex].text = value;
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/surveys', { title, description, questions });
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Failed to create survey');
        }
    };

    return (
        <div className="container fade-in">
            <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '2rem' }}>Create a New Survey</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Survey Title</label>
                        <input
                            className="input-field"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Description</label>
                        <textarea
                            className="input-field"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <hr style={{ margin: '2rem 0', borderColor: 'var(--glass-border)' }} />

                    {questions.map((q, qIndex) => (
                        <div key={qIndex} className="glass-panel" style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.5)' }}>
                            <div className="input-group">
                                <label>Question {qIndex + 1}</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    placeholder="Enter question text"
                                    value={q.text}
                                    onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Type</label>
                                <select
                                    className="input-field"
                                    value={q.type}
                                    onChange={(e) => updateQuestion(qIndex, 'type', e.target.value)}
                                >
                                    <option value="short_answer">Short Answer</option>
                                    <option value="mcq">Multiple Choice</option>
                                </select>
                            </div>

                            {q.type === 'mcq' && (
                                <div style={{ marginLeft: '1rem', borderLeft: '3px solid var(--primary-color)', paddingLeft: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Options</label>
                                    {q.options.map((opt, oIndex) => (
                                        <div key={oIndex} style={{ display: 'flex', marginBottom: '0.5rem' }}>
                                            <input
                                                className="input-field"
                                                type="text"
                                                placeholder={`Option ${oIndex + 1}`}
                                                value={opt.text}
                                                onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                                required
                                            />
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => addOption(qIndex)} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
                                        + Add Option
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button type="button" onClick={addQuestion} className="btn btn-secondary">
                            Add Question
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Publish Survey
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSurvey;
