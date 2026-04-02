import React, { useEffect, useState, useMemo } from 'react'
import api from '../api'
import { 
    History as HistoryIcon, Clock, Activity, Calendar, Shield, Trash2, Loader2, 
    TrendingUp, LayoutGrid, AlertCircle, CheckCircle2 
} from 'lucide-react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart
} from 'recharts'

const History = () => {
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [deletingId, setDeletingId] = useState(null)
    const [view, setView] = useState('list') // 'list' or 'trends'
    const [activeTrend, setActiveTrend] = useState('Diabetes')

    const fetchHistory = async () => {
        try {
            const response = await api.get('/history')
            if (Array.isArray(response.data)) {
                setLogs(response.data)
            } else {
                setLogs([])
                setError("Received invalid payload format from the server.")
            }
        } catch (err) {
            console.error("Failed to fetch history", err)
            setError("Cannot connect to diagnostic database. Server might be booting up or offline.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchHistory()
    }, [])

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this record?")) return

        setDeletingId(id)
        try {
            await api.delete(`/history/${id}`)
            setLogs(logs.filter(log => log.id !== id))
        } catch (err) {
            alert("Failed to delete record")
        } finally {
            setDeletingId(null)
        }
    }

    const trendData = useMemo(() => {
        return logs
            .filter(log => log.disease_type === activeTrend)
            .map(log => {
                const data = typeof log.input_data === 'string' ? JSON.parse(log.input_data.replace(/'/g, '"')) : log.input_data
                return {
                    date: new Date(log.timestamp).toLocaleDateString(),
                    timestamp: new Date(log.timestamp).getTime(),
                    ...data
                }
            })
            .sort((a, b) => a.timestamp - b.timestamp)
    }, [logs, activeTrend])

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-16 px-[5%] transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-brand-500 rounded-[24px] flex items-center justify-center text-white shadow-xl shadow-brand-100 dark:shadow-none">
                            <HistoryIcon className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-extrabold text-brand-900 dark:text-white transition-colors">Diagnostic Vault</h1>
                            <p className="text-brand-500 dark:text-brand-400 font-bold text-sm bg-brand-50 dark:bg-brand-900/30 inline-block px-3 py-1 rounded-full border border-brand-100 dark:border-brand-800 mt-2 transition-colors">Historical Health Data</p>
                        </div>
                    </div>

                    <div className="flex items-center bg-white dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm self-start md:self-center">
                        <button 
                            onClick={() => setView('list')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${view === 'list' ? 'bg-brand-500 text-white shadow-lg' : 'text-slate-400 hover:text-brand-500'}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                            Feed View
                        </button>
                        <button 
                            onClick={() => setView('trends')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${view === 'trends' ? 'bg-brand-500 text-white shadow-lg' : 'text-slate-400 hover:text-brand-500'}`}
                        >
                            <TrendingUp className="w-4 h-4" />
                            Trends View
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-500 transition-colors"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-32 bg-white dark:bg-slate-800 rounded-[60px] border border-red-100 dark:border-red-900/30 shadow-sm transition-colors">
                        <Activity className="w-16 h-16 text-red-500 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">{error}</h3>
                        <p className="text-slate-400 mt-2">Try refreshing the page in a few moments.</p>
                    </div>
                ) : logs.length === 0 ? (
                    <div className="text-center py-32 bg-white dark:bg-slate-800 rounded-[60px] border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
                        <Shield className="w-16 h-16 text-slate-100 dark:text-slate-700 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-brand-900 dark:text-white transition-colors">Vault is Empty</h3>
                        <p className="text-slate-400 dark:text-slate-500 mt-2 transition-colors">Generate a diagnostic report to populate your history.</p>
                    </div>
                ) : view === 'list' ? (
                    <div className="grid gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {logs.map((log) => (
                            <div key={log.id} className="bg-white dark:bg-slate-800/50 p-6 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/20 rounded-[16px] flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all">
                                        <Activity className="w-6 h-6 text-brand-600 dark:text-brand-400 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-brand-900 dark:text-white transition-colors">{log.disease_type} Scan</h4>
                                        <div className="flex items-center gap-4 mt-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">
                                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-brand-300 dark:text-brand-700 transition-colors" /> {new Date(log.timestamp).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-brand-300 dark:text-brand-700 transition-colors" /> {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className={`px-6 py-3 rounded-2xl font-black text-xs shadow-inner uppercase tracking-tighter transition-colors ${(log.result || '').includes('Detected') || log.result === 'Diabetic' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'}`}>
                                        {log.result || 'Unknown'}
                                    </div>

                                    <button
                                        onClick={() => handleDelete(log.id)}
                                        disabled={deletingId === log.id}
                                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all border border-transparent hover:border-red-100 dark:hover:border-red-900/20"
                                        title="Delete Record"
                                    >
                                        {deletingId === log.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
                            {['Diabetes', 'Heart', 'Liver'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setActiveTrend(type)}
                                    className={`px-6 py-3 rounded-2xl font-bold transition-all border whitespace-nowrap ${activeTrend === type ? 'bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-200 dark:shadow-none' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-brand-300'}`}
                                >
                                    {type} Analytics
                                </button>
                            ))}
                        </div>

                        {trendData.length < 2 ? (
                            <div className="bg-white dark:bg-slate-800 p-20 rounded-[60px] border border-slate-200 dark:border-slate-700 text-center shadow-xl">
                                <TrendingUp className="w-12 h-12 text-slate-200 dark:text-slate-700 mx-auto mb-6" />
                                <h4 className="text-xl font-bold text-brand-900 dark:text-white">Insufficient Data</h4>
                                <p className="text-slate-400 mt-2">You need at least two {activeTrend} scans to generate a trend analysis.</p>
                            </div>
                        ) : (
                            <div className="grid gap-8">
                                <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
                                    <div className="mb-8">
                                        <h3 className="text-lg font-bold text-brand-900 dark:text-white mb-1">Primary Biometric Fluctuations</h3>
                                        <p className="text-xs text-slate-400 font-medium">Tracking historical variation of key clinical parameters</p>
                                    </div>
                                    <div className="h-[400px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={trendData}>
                                                <defs>
                                                    <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                                    </linearGradient>
                                                    <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1}/>
                                                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:opacity-10" />
                                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} dy={10} />
                                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} />
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                                                    itemStyle={{ fontSize: '12px', fontWeight: 700 }}
                                                />
                                                <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                                                {activeTrend === 'Diabetes' && (
                                                    <>
                                                        <Area type="monotone" dataKey="glucose" name="Glucose (mg/dL)" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorPrimary)" />
                                                        <Area type="monotone" dataKey="bmi" name="BMI (kg/m²)" stroke="#ec4899" strokeWidth={4} fillOpacity={1} fill="url(#colorSecondary)" />
                                                    </>
                                                )}
                                                {activeTrend === 'Heart' && (
                                                    <>
                                                        <Area type="monotone" dataKey="chol" name="Cholesterol (mg/dL)" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorPrimary)" />
                                                        <Area type="monotone" dataKey="trestbps" name="Blood Pressure" stroke="#ec4899" strokeWidth={4} fillOpacity={1} fill="url(#colorSecondary)" />
                                                    </>
                                                )}
                                                {activeTrend === 'Liver' && (
                                                    <>
                                                        <Area type="monotone" dataKey="alkaline_phosphotase" name="ALP (Enzyme)" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorPrimary)" />
                                                        <Area type="monotone" dataKey="alamine_aminotransferase" name="ALT (Enzyme)" stroke="#ec4899" strokeWidth={4} fillOpacity={1} fill="url(#colorSecondary)" />
                                                    </>
                                                )}
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Scans</p>
                                            <h4 className="text-2xl font-black text-brand-900 dark:text-white">{trendData.length}</h4>
                                        </div>
                                        <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/20 rounded-2xl flex items-center justify-center text-brand-500">
                                            <Activity className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status Shift</p>
                                            <h4 className="text-lg font-black text-brand-500">Volatile Analysis</h4>
                                        </div>
                                        <div className="w-12 h-12 bg-pink-50 dark:bg-pink-900/20 rounded-2xl flex items-center justify-center text-pink-500">
                                            <TrendingUp className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Last Sample</p>
                                            <h4 className="text-lg font-black text-brand-900 dark:text-white">{trendData[trendData.length - 1].date}</h4>
                                        </div>
                                        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-500">
                                            <Calendar className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default History
