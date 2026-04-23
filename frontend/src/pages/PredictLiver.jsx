import React, { useState } from 'react'
import api from '../api'
import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts'
import { CheckCircle2, AlertCircle, Loader2, Microscope, Activity } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const PredictLiver = () => {
    const [formData, setFormData] = useState({
        age: 0, gender: 1, total_bilirubin: 0, direct_bilirubin: 0,
        alkaline_phosphotase: 0, alamine_aminotransferase: 0,
        aspartate_aminotransferase: 0, total_protiens: 0,
        albumin: 0, albumin_and_globulin_ratio: 0
    })

    const [prediction, setPrediction] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const val = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value
        setFormData({ ...formData, [e.target.name]: val })
    }

    const handlePredict = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const response = await api.post('/predict/liver', formData)
            setPrediction(response.data.prediction)
        } catch (err) {
            setError("Backend Error: Please start the FastAPI server.")
        } finally {
            setLoading(false)
        }
    }

    const chartData = [
        { subject: 'Bilirubin', A: formData.total_bilirubin * 10, fullMark: 100 },
        { subject: 'Enzymes', A: formData.alkaline_phosphotase / 10, fullMark: 100 },
        { subject: 'Proteins', A: formData.total_protiens * 10, fullMark: 100 },
        { subject: 'Albumin', A: formData.albumin * 20, fullMark: 100 },
        { subject: 'Ratio', A: formData.albumin_and_globulin_ratio * 40, fullMark: 100 },
        { subject: 'Age', A: formData.age, fullMark: 100 },
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
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4 border border-emerald-500/20"
                >
                    <Activity className="w-4 h-4" /> Hepatic Analysis Engine
                </motion.div>
                <motion.h1 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight"
                >
                    Hepa-Link Diagnostic
                </motion.h1>
                <motion.p 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-500 dark:text-slate-400 font-medium"
                >
                    Comprehensive biomarker evaluation for liver functional integrity.
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
                        <div className="p-3 bg-emerald-500 rounded-2xl text-white">
                            <Microscope className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white font-bold text-2xl">Laboratory Metrics</h3>
                            <p className="text-sm text-slate-500 font-medium tracking-tight">Input serum level data from clinical reports.</p>
                        </div>
                    </div>

                    <form onSubmit={handlePredict} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { label: 'Age', name: 'age' },
                                { label: 'Total Bilirubin (mg/dL)', name: 'total_bilirubin', step: '0.1' },
                                { label: 'Alkaline Phosphotase (ALP)', name: 'alkaline_phosphotase' },
                                { label: 'Total Proteins (g/dL)', name: 'total_protiens', step: '0.1' },
                                { label: 'Serum Albumin', name: 'albumin', step: '0.1' },
                                { label: 'A/G Ratio', name: 'albumin_and_globulin_ratio', step: '0.1' }
                            ].map((f, idx) => (
                                <motion.div 
                                    key={f.name}
                                    initial={{ y: 15, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 + (idx * 0.05) }}
                                >
                                    <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 ml-1">{f.label}</label>
                                    <input 
                                        type="number" step={f.step || '1'} name={f.name} value={formData[f.name]} onChange={handleChange} 
                                        className="input-glow w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold text-slate-900 dark:text-white" 
                                    />
                                </motion.div>
                            ))}
                            <motion.div 
                                initial={{ y: 15, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-3 ml-1">Assigned Gender</label>
                                <select 
                                    name="gender" value={formData.gender} onChange={handleChange} 
                                    className="input-glow w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 text-slate-900 dark:text-white font-bold"
                                >
                                    <option value={1}>Male</option>
                                    <option value={0}>Female</option>
                                </select>
                            </motion.div>
                        </div>

                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit" disabled={loading} 
                            className="btn-glow w-full bg-emerald-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-emerald-500/20 flex items-center justify-center text-lg mt-8"
                        >
                            {loading ? <Loader2 className="animate-spin mr-3 w-6 h-6" /> : "Initiate Hepatic Scan"}
                        </motion.button>
                    </form>

                    <AnimatePresence>
                        {prediction && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                className="overflow-hidden"
                            >
                                <div className={`mt-10 p-8 rounded-[30px] flex items-center gap-6 border ${prediction.includes('Detected') ? 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'}`}>
                                    <div className={`p-4 rounded-2xl ${prediction.includes('Detected') ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
                                        {prediction.includes('Detected') ? <AlertCircle className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Hepatic Outcome</div>
                                        <span className="font-black text-2xl md:text-3xl tracking-tight uppercase">{prediction}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
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
                                <Radar dataKey="A" stroke="#10b981" strokeWidth={4} fill="#10b981" fillOpacity={0.15} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-10 mb-4 tracking-tight">Metabolic Index</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Visual analysis of liver biochemistry parameters normalized to clinical bounds.</p>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default PredictLiver
