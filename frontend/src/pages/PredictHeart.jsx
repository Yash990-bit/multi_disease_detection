import React, { useState } from 'react'
import axios from 'axios'
import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts'
import { CheckCircle2, AlertCircle, Loader2, Heart } from 'lucide-react'

const PredictHeart = () => {
    const [formData, setFormData] = useState({
        age: 0, sex: 'Male', cp: 'Typical Angina', trestbps: 0,
        chol: 0, fbs: 'False', restecg: 'Normal', thalch: 0,
        exang: 'No', oldpeak: 0, slope: 'Flat', ca: 0, thal: 'Normal'
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
            setError("Backend Error: Please start the FastAPI server.")
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
        <div className="bg-slate-50 min-h-screen py-16 px-[5%]">
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-extrabold text-brand-900 mb-4">Cardio-Sync Analysis</h1>
                <p className="text-brand-500 font-semibold text-sm bg-brand-50 inline-block px-4 py-1.5 rounded-full border border-brand-100">
                    Heart Disease Prediction System
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
                <div className="bg-white p-12 rounded-[40px] border border-slate-200 shadow-xl">
                    <div className="flex items-center gap-2 mb-8 border-b border-slate-100 pb-4">
                        <Heart className="w-5 h-5 text-red-500" />
                        <h3 className="text-brand-900 font-bold text-xl">Cardiac Assessment</h3>
                    </div>

                    <form onSubmit={handlePredict} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { label: 'Age', name: 'age' },
                                { label: 'Max Heart Rate', name: 'thalch' },
                                { label: 'Resting BP', name: 'trestbps' },
                                { label: 'Cholesterol', name: 'chol' },
                                { label: 'Vessels (0-3)', name: 'ca' },
                                { label: 'ST Depression', name: 'oldpeak' }
                            ].map((f) => (
                                <div key={f.name}>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">{f.label}</label>
                                    <input type="number" name={f.name} value={formData[f.name]} onChange={handleChange} className="w-full px-5 py-3 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white text-sm font-semibold" />
                                </div>
                            ))}
                            <div className="col-span-2 grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Sex</label>
                                    <select name="sex" value={formData.sex} onChange={handleChange} className="w-full px-4 py-3 rounded-2xl border border-slate-100 bg-slate-50 text-xs font-bold"><option>Male</option><option>Female</option></select>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Chest Pain</label>
                                    <select name="cp" value={formData.cp} onChange={handleChange} className="w-full px-4 py-3 rounded-2xl border border-slate-100 bg-slate-50 text-xs font-bold">
                                        <option>Typical Angina</option><option>Atypical Angina</option><option>Non-anginal Pain</option><option>Asymptomatic</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="w-full bg-brand-500 text-white font-bold py-5 rounded-2xl shadow-xl shadow-brand-100 flex items-center justify-center text-lg mt-8">
                            {loading ? <Loader2 className="animate-spin mr-3 w-6 h-6" /> : "Initiate Cardio Scan"}
                        </button>
                    </form>

                    {prediction && (
                        <div className={`mt-10 p-6 rounded-3xl flex items-center gap-4 border ${prediction.includes('Detected') ? 'bg-red-50 border-red-100 text-red-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
                            <CheckCircle2 className="w-6 h-6" /> <span className="text-xl font-bold uppercase tracking-tight">{prediction}</span>
                        </div>
                    )}
                </div>

                <div className="bg-white p-12 rounded-[40px] border border-slate-200 shadow-xl flex flex-col items-center justify-center text-center">
                    <div className="w-full h-[450px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                <PolarGrid stroke="#f1f5f9" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 600 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar dataKey="A" stroke="#4f46e5" strokeWidth={4} fill="#4f46e5" fillOpacity={0.1} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <h3 className="text-2xl font-bold text-brand-900 mt-10 mb-2">Cardiac DNA</h3>
                    <p className="text-slate-400 max-w-sm">A multi-axial overview of your heart health identifiers.</p>
                </div>
            </div>
        </div>
    )
}

export default PredictHeart
