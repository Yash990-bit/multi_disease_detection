import React, { useState } from 'react'
import axios from 'axios'
import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

const PredictDiabetes = () => {
    const [formData, setFormData] = useState({
        pregnancies: 0,
        glucose: 0,
        blood_pressure: 0,
        skin_thickness: 0,
        insulin: 0,
        bmi: 0,
        pedigree_function: 0,
        age: 0
    })

    const [prediction, setPrediction] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handlePredict = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const response = await axios.post('/api/predict/diabetes', formData)
            setPrediction(response.data.prediction)
        } catch (err) {
            setError("Failed to get prediction from server. Please ensure the backend is running.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    
    const chartData = [
        { subject: 'Glucose', A: formData.glucose / 2, fullMark: 100 },
        { subject: 'BMI', A: formData.bmi * 2, fullMark: 100 },
        { subject: 'Age', A: formData.age, fullMark: 100 },
        { subject: 'BP', A: formData.blood_pressure, fullMark: 100 },
        { subject: 'Insulin', A: formData.insulin / 10, fullMark: 100 },
        { subject: 'Pedigree', A: formData.pedigree_function * 50, fullMark: 100 },
    ]

    return (
        <div className="bg-white min-h-screen py-12 px-[5%]">
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-extrabold text-teal-900 mb-2">Diabetes Risk Analysis</h1>
                <p className="text-teal-500 font-medium text-sm">Enter clinical features below to analyze risk probability.</p>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">

                <div className="bg-white p-10 rounded-[32px] border border-teal-100 shadow-sm">
                    <h3 className="text-teal-900 font-bold border-b border-teal-50 pb-2 mb-8">Patient Features</h3>

                    <form onSubmit={handlePredict} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Pregnancies</label>
                                <input
                                    type="number" name="pregnancies" value={formData.pregnancies} onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-teal-50 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Glucose</label>
                                <input
                                    type="number" name="glucose" value={formData.glucose} onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-teal-50 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Blood Pressure</label>
                                <input
                                    type="number" name="blood_pressure" value={formData.blood_pressure} onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-teal-50 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">BMI</label>
                                <input
                                    type="number" step="0.1" name="bmi" value={formData.bmi} onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-teal-50 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Age</label>
                                <input
                                    type="number" name="age" value={formData.age} onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-teal-50 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Pedigree Function</label>
                                <input
                                    type="number" step="0.001" name="pedigree_function" value={formData.pedigree_function} onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-teal-50 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <button
                            type="submit" disabled={loading}
                            className="w-full bg-teal-500 text-white font-bold py-4 rounded-full hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 flex items-center justify-center"
                        >
                            {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                            Run Diagnostic
                        </button>
                    </form>

                    {prediction && (
                        <div className={`mt-8 p-4 rounded-2xl flex items-center gap-3 ${prediction === 'Diabetic' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                            {prediction === 'Diabetic' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                            <span className="font-bold uppercase tracking-tight">Outcome: {prediction}</span>
                        </div>
                    )}
                    {error && (
                        <div className="mt-8 p-4 rounded-2xl bg-orange-50 text-orange-700 flex items-center gap-3 italic text-sm">
                            <AlertCircle className="w-5 h-5" />
                            {error}
                        </div>
                    )}
                </div>

                <div className="bg-white p-10 rounded-[32px] border border-teal-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="w-full h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Metrics"
                                    dataKey="A"
                                    stroke="#00897b"
                                    strokeWidth={3}
                                    fill="#00897b"
                                    fillOpacity={0.15}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <h3 className="text-xl font-bold text-teal-900 mt-6 mb-2">Feature Visualization</h3>
                    <p className="text-sm text-gray-400 max-w-sm">
                        Visual representation of your clinical features. Higher values in certain areas indicate higher risk impact.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PredictDiabetes
