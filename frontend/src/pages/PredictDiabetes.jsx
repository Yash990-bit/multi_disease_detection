import React, { useState } from 'react'
import axios from 'axios'
import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts'
import { CheckCircle2, AlertCircle, Loader2, Info } from 'lucide-react'

const PredictDiabetes = () => {
    const [formData, setFormData] = useState({
        pregnancies: 0, glucose: 0, blood_pressure: 0,
        skin_thickness: 0, insulin: 0, bmi: 0,
        pedigree_function: 0, age: 0
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
            setError("Backend Error: Connection Refused. Ensure FastAPI (api.py) is running on port 8000.")
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
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-16 px-[5%] transition-colors duration-300">
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-extrabold text-brand-900 dark:text-white mb-4">Diabetes Risk Engine</h1>
                <p className="text-brand-500 dark:text-brand-400 font-semibold text-sm bg-brand-50 dark:bg-brand-900/30 inline-block px-4 py-1.5 rounded-full border border-brand-100 dark:border-brand-800 transition-colors">
                    Clinical Feature Assessment
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
                <div className="bg-white dark:bg-slate-800 p-12 rounded-[40px] border border-slate-200 dark:border-slate-700 shadow-xl transition-colors">
                    <div className="flex items-center gap-2 mb-8 border-b border-slate-100 dark:border-slate-700 pb-4">
                        <Info className="w-5 h-5 text-brand-500 dark:text-brand-400" />
                        <h3 className="text-brand-900 dark:text-white font-bold text-xl">Diagnostic Parameters</h3>
                    </div>

                    <form onSubmit={handlePredict} className="space-y-6">
                        <div className="grid grid-cols-2 gap-8">
                            {[
                                { label: 'Pregnancies', name: 'pregnancies', type: 'number' },
                                { label: 'Glucose', name: 'glucose', type: 'number' },
                                { label: 'Blood Pressure', name: 'blood_pressure', type: 'number' },
                                { label: 'BMI (kg/m²)', name: 'bmi', type: 'number', step: '0.1' },
                                { label: 'Age', name: 'age', type: 'number' },
                                { label: 'Pedigree Func', name: 'pedigree_function', type: 'number', step: '0.001' }
                            ].map((field) => (
                                <div key={field.name}>
                                    <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">{field.label}</label>
                                    <input
                                        {...field} value={formData[field.name]} onChange={handleChange}
                                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-brand-50 dark:focus:ring-brand-900/30 transition-all font-semibold text-brand-900 dark:text-white"
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            type="submit" disabled={loading}
                            className="w-full bg-brand-500 text-white font-bold py-5 rounded-2xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-100 dark:shadow-none flex items-center justify-center text-lg mt-10"
                        >
                            {loading ? <Loader2 className="animate-spin mr-3 w-6 h-6" /> : "Initiate AI Diagnostic"}
                        </button>
                    </form>

                    {prediction && (
                        <div className={`mt-10 p-6 rounded-3xl flex items-center gap-4 border ${prediction === 'Diabetic' ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400' : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400'}`}>
                            {prediction === 'Diabetic' ? <AlertCircle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                            <span className="font-extrabold text-xl uppercase tracking-tighter">Result: {prediction}</span>
                        </div>
                    )}
                    {error && (
                        <div className="mt-10 p-6 rounded-3xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center gap-3 font-medium">
                            <AlertCircle className="w-6 h-6" />
                            {error}
                        </div>
                    )}
                </div>

                <div className="bg-white dark:bg-slate-800 p-12 rounded-[40px] border border-slate-200 dark:border-slate-700 shadow-xl flex flex-col items-center justify-center text-center transition-colors">
                    <div className="w-full h-[450px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                <PolarGrid stroke="#f1f5f9" className="dark:opacity-10" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 600 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Metrics" dataKey="A" stroke="#4f46e5" strokeWidth={4} fill="#4f46e5" fillOpacity={0.1}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <h3 className="text-2xl font-bold text-brand-900 dark:text-white mt-10 mb-2 transition-colors">Importance Matrix</h3>
                    <p className="text-slate-400 dark:text-slate-500 max-w-sm transition-colors">
                        Our AI analyzes these variables in non-linear combinations to determine your unique risk profile.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PredictDiabetes
