import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const PredictSymptoms = () => {
    const [symptoms, setSymptoms] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (!symptoms.trim()) {
            setError('Please describe your symptoms first.');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await api.post('/predict/symptoms', { text: symptoms });
            setResult(response.data.prediction);
        } catch (err) {
            console.error(err);
            setError('Failed to analyze symptoms. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getLinkForPrediction = (diseaseName) => {
        if (!diseaseName) return null;
        const lower = diseaseName.toLowerCase();
        if (lower.includes('heart')) return '/predict/heart';
        if (lower.includes('liver')) return '/predict/liver';
        if (lower.includes('diabet')) return '/predict/diabetes';
        return null;
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/40"
            >
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        Smart Triage
                    </h1>
                    <p className="text-gray-600 mt-3 text-lg">
                        Describe how you're feeling in your own words, and our AI will suggest the most likely conditions and next steps.
                    </p>
                </div>

                <div className="mb-6">
                    <textarea
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder="E.g., I've been feeling very tired lately, and I have a sharp pain in my chest when walking upstairs..."
                        className="w-full h-40 p-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
                    ></textarea>
                </div>

                {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

                <div className="flex justify-center mb-8">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center gap-2"
                    >
                        {loading ? 'Analyzing...' : 'Analyze Symptoms'}
                    </button>
                </div>

                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100"
                    >
                        <h3 className="text-xl font-semibold text-indigo-900 mb-4 text-center">Analysis Results</h3>
                        
                        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                            <p className="text-sm text-gray-500 mb-1">Primary Prediction</p>
                            <p className="text-2xl font-bold text-indigo-700">{result.primary_prediction}</p>
                        </div>

                        {result.top_predictions && result.top_predictions.length > 0 && (
                            <div className="space-y-3">
                                <p className="text-sm text-gray-500 font-medium ml-1">Possible Conditions</p>
                                {result.top_predictions.map((pred, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-white/60 p-3 rounded-lg">
                                        <span className="font-medium text-gray-700">{pred.disease}</span>
                                        <span className="bg-indigo-100 text-indigo-700 py-1 px-3 rounded-full text-sm font-semibold">
                                            {pred.confidence}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {getLinkForPrediction(result.primary_prediction) && (
                            <div className="mt-6 text-center">
                                <p className="text-gray-600 mb-3">Based on these symptoms, we recommend taking our specific risk assessment test.</p>
                                <button
                                    onClick={() => navigate(getLinkForPrediction(result.primary_prediction))}
                                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Take the {result.primary_prediction} Test
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default PredictSymptoms;
