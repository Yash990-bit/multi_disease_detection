import React, { useState } from 'react'
import axios from 'axios'
import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

const PredictLiver = () => {
    const [formData, setFormData] = useState({
        age: 0,
        gender: 1, 
        total_bilirubin: 0,
        direct_bilirubin: 0,
        alkaline_phosphotase: 0,
        alamine_aminotransferase: 0,
        aspartate_aminotransferase: 0,
        total_protiens: 0,
        albumin: 0,
        albumin_and_globulin_ratio: 0
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
            const response = await axios.post('/api/predict/liver', formData)
            setPrediction(response.data.prediction)
        } catch (err) {
            setError("Failed to get prediction.")
            console.error(err)
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
        <div className="bg-white min-h-screen py-12 px-[5%]">
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-extrabold text-teal-900 mb-2">Liver Risk Analysis</h1>
                <p className="text-teal-500 font-medium text-sm">Analyze liver function biomarkers with AI precision.</p>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
                <div className="bg-white p-10 rounded-[32px] border border-teal-100 shadow-sm">
                    <h3 className="text-teal-900 font-bold border-b border-teal-50 pb-2 mb-8">Clinical Biomarkers</h3>

                    <form onSubmit={handlePredict} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Age</label>
                                <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-teal-50 bg-gray-50/30 text-sm" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-teal-50 bg-gray-50/30 text-sm">
                                    <option value={1}>Male</option><option value={0}>Female</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Total Bilirubin</label>
                                <input type="number" step="0.1" name="total_bilirubin" value={formData.total_bilirubin} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-teal-50 bg-gray-50/30 text-sm" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Enzyme Levels</label>
                                <input type="number" name="alkaline_phosphotase" value={formData.alkaline_phosphotase} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-teal-50 bg-gray-50/30 text-sm" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Proteins</label>
                                <input type="number" step="0.1" name="total_protiens" value={formData.total_protiens} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-teal-50 bg-gray-50/30 text-sm" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Alb/Glob Ratio</label>
                                <input type="number" step="0.1" name="albumin_and_globulin_ratio" value={formData.albumin_and_globulin_ratio} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-teal-50 bg-gray-50/30 text-sm" />
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
                    <h3 className="text-xl font-bold text-teal-900 mt-6 mb-2">Liver Diagnostics</h3>
                    <p className="text-[13px] text-gray-400 max-w-xs">Visualization of liver function metrics based on your biomarker data.</p>
                </div>
            </div>
        </div>
    )
}

export default PredictLiver
