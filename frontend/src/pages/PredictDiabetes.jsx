import React, { useState } from 'react'
import api from '../api'
import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts'
import { CheckCircle2, AlertCircle, Loader2, Info, Activity } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { saveToLocalHistory } from '../utils/localHistory'

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
            const response = await api.post('/predict/diabetes', formData)
            setPrediction(response.data.prediction)
            
            // Save to local history
            saveToLocalHistory('Diabetes', formData, response.data.prediction)
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
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="gradient-bg min-h-screen py-16 px-[5%] transition-colors duration-300"
        >
            <div className="max-w-7xl mx-auto text-center mb-16">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest mb-4 border border-brand-500/20"
                >
                    <Activity className="w-4 h-4" /> Medical Analysis Engine
                </motion.div>
                <motion.h1 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight"
                >
                    Diabetes Risk Assessment
                </motion.h1>
                <motion.p 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-500 dark:text-slate-400 font-medium"
                >
                    Fill in the clinical parameters below for an AI-powered diagnostic prediction.
                </motion.p>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-8 items-start">
                <motion.div 
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-3 glass p-10 rounded-[40px] border border-white/20 dark:border-slate-800/50 shadow-2xl"
                >
                    <div className="flex items-center gap-3 mb-10 border-b border-slate-200/50 dark:border-slate-700/50 pb-6">
                        <div className="p-3 bg-brand-500 rounded-2xl text-white">
                            <Info className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white font-bold text-2xl">Diagnostic Entry</h3>
                            <p className="text-sm text-slate-500 font-medium tracking-tight">Ensure all metrics are as accurate as possible.</p>
                        </div>
                    </div>

                    <form onSubmit={handlePredict} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { label: 'Pregnancies', name: 'pregnancies', type: 'number' },
                                { label: 'Glucose Content', name: 'glucose', type: 'number' },
                                { label: 'Blood Pressure', name: 'blood_pressure', type: 'number' },
                                { label: 'BMI (kg/m²)', name: 'bmi', type: 'number', step: '0.1' },
                                { label: 'Age', name: 'age', type: 'number' },
                                { label: 'Pedigree Function', name: 'pedigree_function', type: 'number', step: '0.001' }
                            ].map((field, idx) => (
                                <motion.div 
                                    key={field.name}
                                    initial={{ y: 15, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 + (idx * 0.05) }}
                                >
                                    <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 ml-1">{field.label}</label>
                                    <input
                                        {...field} value={formData[field.name]} onChange={handleChange}
                                        className="input-glow w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all font-bold text-slate-900 dark:text-white placeholder-slate-400"
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit" disabled={loading}
                            className="btn-glow w-full bg-brand-600 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-brand-500/20 flex items-center justify-center text-lg mt-10"
                        >
                            {loading ? <Loader2 className="animate-spin mr-3 w-6 h-6" /> : "Run AI Diagnostic Scan"}
                        </motion.button>
                    </form>

                    <AnimatePresence>
                        {prediction && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className={`mt-10 p-8 rounded-[30px] flex items-center gap-6 border ${prediction === 'Diabetic' ? 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'}`}>
                                    <div className={`p-4 rounded-2xl ${prediction === 'Diabetic' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
                                        {prediction === 'Diabetic' ? <AlertCircle className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Diagnosis Result</div>
                                        <span className="font-black text-3xl tracking-tight uppercase">{prediction}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {error && (
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="mt-10 p-6 rounded-3xl bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 flex items-center gap-4 font-bold"
                        >
                            <AlertCircle className="w-6 h-6" />
                            {error}
                        </motion.div>
                    )}
                </motion.div>

                <motion.div 
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 glass p-12 rounded-[40px] border border-white/20 dark:border-slate-800/50 shadow-2xl flex flex-col items-center justify-center text-center sticky top-24"
                >
                    <div className="w-full h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                <PolarGrid stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 12, fontWeight: 700, className: 'text-slate-500 dark:text-slate-400' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Metrics" dataKey="A" stroke="#4f46e5" strokeWidth={4} fill="#4f46e5" fillOpacity={0.15}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-10 mb-4 tracking-tight transition-colors">Risk Bio-Map</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed transition-colors">
                        Visualization of input parameters normalized against clinical standards.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default PredictDiabetes
