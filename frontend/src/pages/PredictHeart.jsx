import React, { useState } from 'react'
import axios from 'axios'
import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

const PredictHeart = () => {
    const [formData, setFormData] = useState({
        age: 0,
        sex: 'Male',
        cp: 'Typical Angina',
        trestbps: 0,
        chol: 0,
        fbs: 'False',
        restecg: 'Normal',
        thalch: 0,
        exang: 'No',
        oldpeak: 0,
        slope: 'Flat',
        ca: 0,
        thal: 'Normal'
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
            const response = await axios.post('/api/predict/heart', formData)
            setPrediction(response.data.prediction)
        } catch (err) {
            setError("Failed to get prediction. Ensure backend is running.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const chartData = [
        { subject: 'BP', A: formData.trestbps / 2, fullMark: 100 },
        { subject: 'Chol', A: formData.chol / 4, fullMark: 100 },
        { subject: 'HR', A: formData.thalch / 2, fullMark: 100 },
        { subject: 'Age', A: formData.age, fullMark: 100 },
        { subject: 'Vessels', A: formData.ca * 25, fullMark: 100 },
        { subject: 'Peak', A: formData.oldpeak * 20, fullMark: 100 },
    ]

    return (
        <div className="bg-white min-h-screen py-12 px-[5%]">
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-extrabold text-teal-900 mb-2">Heart Risk Analysis</h1>
                <p className="text-teal-500 font-medium text-sm">Enter cardiac health metrics for detailed diagnostic.</p>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
                <div className="bg-white p-10 rounded-[32px] border border-teal-100 shadow-sm">
                    <h3 className="text-teal-900 font-bold border-b border-teal-50 pb-2 mb-8">Cardiac Biomarkers</h3>

                    <form onSubmit={handlePredict} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Age</label>
                                <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-teal-50 bg-gray-50/30 text-sm" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Sex</label>
                                <select name="sex" value={formData.sex} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-teal-50 bg-gray-50/30 text-sm">
                                    <option>Male</option><option>Female</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Chest Pain</label>
                                <select name="cp" value={formData.cp} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-teal-50 bg-gray-50/30 text-sm text-xs">
                                    <option>Typical Angina</option><option>Atypical Angina</option>
                                    <option>Non-anginal Pain</option><option>Asymptomatic</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Resting BP</label>
                                <input type="number" name="trestbps" value={formData.trestbps} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-teal-50 bg-gray-50/30 text-sm" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Cholesterol</label>
                                <input type="number" name="chol" value={formData.chol} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-teal-50 bg-gray-50/30 text-sm" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Max HR</label>
                                <input type="number" name="thalch" value={formData.thalch} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-teal-50 bg-gray-50/30 text-sm" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Vessels (0-3)</label>
                                <input type="number" name="ca" value={formData.ca} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-teal-50 bg-gray-50/30 text-sm" />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full bg-teal-500 text-white font-bold py-3.5 rounded-full shadow-lg shadow-teal-100 flex items-center justify-center">
                            {loading && <Loader2 className="animate-spin mr-2 w-4 h-4" />} Run Analysis
                        </button>
                    </form>

                    {prediction && (
                        <div className={`mt-6 p-4 rounded-2xl flex items-center gap-3 ${prediction.includes('Detected') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                            <CheckCircle2 className="w-4 h-4" /> <span className="text-sm font-bold uppercase tracking-wider">{prediction}</span>
                        </div>
                    )}
                </div>

                <div className="bg-white p-10 rounded-[32px] border border-teal-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="w-full h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar dataKey="A" stroke="#00897b" strokeWidth={3} fill="#00897b" fillOpacity={0.1} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <h3 className="text-xl font-bold text-teal-900 mt-6 mb-2">Cardiac Insights</h3>
                    <p className="text-[13px] text-gray-400 max-w-xs">We analyze multiple factors including cholesterol and max heart rate to visualize potential risk factors.</p>
                </div>
            </div>
        </div>
    )
}

export default PredictHeart
