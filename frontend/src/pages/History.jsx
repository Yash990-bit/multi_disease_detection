import React, { useEffect, useState } from 'react'
import api from '../api'
import { History as HistoryIcon, Clock, Activity, Calendar, Shield, Trash2, Loader2 } from 'lucide-react'

const History = () => {
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState(null)

    const fetchHistory = async () => {
        try {
            const response = await api.get('/history')
            setLogs(response.data)
        } catch (err) {
            console.error("Failed to fetch history")
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

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-16 px-[5%] transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-6 mb-16">
                    <div className="w-16 h-16 bg-brand-500 rounded-[24px] flex items-center justify-center text-white shadow-xl shadow-brand-100 dark:shadow-none">
                        <HistoryIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-brand-900 dark:text-white transition-colors">Diagnostic Vault</h1>
                        <p className="text-brand-500 dark:text-brand-400 font-bold text-sm bg-brand-50 dark:bg-brand-900/30 inline-block px-3 py-1 rounded-full border border-brand-100 dark:border-brand-800 mt-2 transition-colors">Historical Health Data</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-500 transition-colors"></div>
                    </div>
                ) : logs.length === 0 ? (
                    <div className="text-center py-32 bg-white dark:bg-slate-800 rounded-[60px] border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
                        <Shield className="w-16 h-16 text-slate-100 dark:text-slate-700 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-brand-900 dark:text-white transition-colors">Vault is Empty</h3>
                        <p className="text-slate-400 dark:text-slate-500 mt-2 transition-colors">Generate a diagnostic report to populate your history.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
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
                                    <div className={`px-6 py-3 rounded-2xl font-black text-xs shadow-inner uppercase tracking-tighter transition-colors ${log.result.includes('Detected') || log.result === 'Diabetic' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'}`}>
                                        {log.result}
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
                )}
            </div>
        </div>
    )
}

export default History
