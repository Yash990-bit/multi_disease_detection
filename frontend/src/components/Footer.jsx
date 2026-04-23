import React from 'react'
import { Activity, ShieldCheck, HeartPulse } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="relative mt-auto border-t border-slate-200/50 dark:border-slate-800/50 pt-20 pb-10 px-6 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 text-2xl font-black text-slate-900 dark:text-white mb-6">
                        <Activity className="w-8 h-8 text-brand-500" />
                        Vitalise AI
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed font-medium mb-6">
                        Powering the future of healthcare through predictive intelligence and clinical-grade AI modeling.
                    </p>
                    <div className="flex items-center gap-4 text-brand-500">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">HIPAA Compliant Protocol</span>
                    </div>
                </div>
                
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Diagnostics</h4>
                    <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                        <li><Link to="/predict/diabetes" className="hover:text-brand-500 transition-colors">Diabetes Engine</Link></li>
                        <li><Link to="/predict/heart" className="hover:text-brand-500 transition-colors">Cardiac Analysis</Link></li>
                        <li><Link to="/predict/liver" className="hover:text-brand-500 transition-colors">Hepatic Index</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Company</h4>
                    <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                        <li><Link to="/about" className="hover:text-brand-500 transition-colors">About Tech</Link></li>
                        <li><Link to="/history" className="hover:text-brand-500 transition-colors">Prediction Logs</Link></li>
                        <li><a href="#" className="hover:text-brand-500 transition-colors">Scientific Documentation</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                <p>© {new Date().getFullYear()} Vitalise AI Lab. All rights reserved.</p>
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-1.5 text-rose-500"><HeartPulse className="w-3.5 h-3.5" /> For Educational Use Only</span>
                    <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
