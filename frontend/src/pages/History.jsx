import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { History as HistoryIcon, Clock, Activity, Calendar, Shield } from 'lucide-react'

const History = () => {
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get('/api/history')
                setLogs(response.data)
            } catch (err) {
                console.error("Failed to fetch history")
            } finally {
                setLoading(false)
            }
        }
        fetchHistory()
    }, [])

    return (
        <div className="bg-slate-50 min-h-screen py-16 px-[5%]">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-6 mb-16">
                    <div className="w-16 h-16 bg-brand-500 rounded-[24px] flex items-center justify-center text-white shadow-xl shadow-brand-100">
                        <HistoryIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-brand-900">Diagnostic Vault</h1>
                        <p className="text-brand-500 font-bold text-sm bg-brand-50 inline-block px-3 py-1 rounded-full border border-brand-100 mt-2">Historical Health Data</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-500"></div>
                    </div>
                ) : logs.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-[60px] border border-slate-200 shadow-sm">
                        <Shield className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-brand-900">Vault is Empty</h3>
                        <p className="text-slate-400 mt-2">Generate a diagnostic report to populate your history.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {logs.map((log) => (
                            <div key={log.id} className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-x-1 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-8">
                                    <div className="w-16 h-16 bg-brand-50 rounded-[20px] flex items-center justify-center">
                                        <Activity className="w-8 h-8 text-brand-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-brand-900">{log.disease_type} Scan</h4>
                                        <div className="flex items-center gap-6 mt-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-300" /> {new Date(log.timestamp).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-brand-300" /> {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-10">
                                    <div className="hidden lg:block text-right">
                                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1">Reliability Status</p>
                                        <p className="text-sm font-bold text-emerald-500">Verified by AI</p>
                                    </div>
                                    <div className={`px-8 py-4 rounded-2xl font-black text-sm shadow-inner uppercase tracking-tighter ${log.result.includes('Detected') || log.result === 'Diabetic' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                        {log.result}
                                    </div>
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
