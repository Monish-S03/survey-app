import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import api from '../utils/api';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const SurveyResults = () => {
    const { id } = useParams();
    const [survey, setSurvey] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await api.get(`/surveys/${id}/results`);
                setSurvey(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchResults();
    }, [id]);

    if (!survey) return <div className="container">Loading...</div>;

    const totalResponses = survey.Responses ? survey.Responses.length : 0;

    return (
        <div className="container fade-in">
            <div className="page-header">
                <h1>Results: {survey.title}</h1>
            </div>

            <div className="glass-panel" style={{ marginBottom: '2rem' }}>
                <div className="stat-card">
                    <h3>Total Responses</h3>
                    <div className="stat-value">{totalResponses}</div>
                </div>
            </div>

            <div className="card-grid">
                {survey.Questions.map((q, index) => {
                    // Chart Data
                    if (q.type === 'mcq') {
                        const counts = {};
                        q.Options.forEach(op => counts[op.text] = 0);

                        if (q.Answers) {
                            q.Answers.forEach(ans => {
                                const opt = q.Options.find(o => o.id === ans.optionId);
                                if (opt) counts[opt.text] = (counts[opt.text] || 0) + 1;
                            });
                        }

                        const data = {
                            labels: Object.keys(counts),
                            datasets: [
                                {
                                    label: '# of Votes',
                                    data: Object.values(counts),
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.6)',
                                        'rgba(54, 162, 235, 0.6)',
                                        'rgba(255, 206, 86, 0.6)',
                                        'rgba(75, 192, 192, 0.6)',
                                        'rgba(153, 102, 255, 0.6)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        };

                        return (
                            <div key={q.id} className="glass-panel">
                                <h4>{index + 1}. {q.text}</h4>
                                <div style={{ height: '300px' }}>
                                    <Bar data={data} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        );
                    } else {
                        // Short Answer - just list them
                        return (
                            <div key={q.id} className="glass-panel">
                                <h4>{index + 1}. {q.text}</h4>
                                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    {q.Answers && q.Answers.map((ans, i) => (
                                        <div key={i} style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                                            {ans.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default SurveyResults;
