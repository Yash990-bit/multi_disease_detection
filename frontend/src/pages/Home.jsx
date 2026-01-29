import React from 'react'
import { Link } from 'react-router-dom'
import { Zap, BarChart3, ArrowRight, Activity } from 'lucide-react'

const Home = () => {
    return (
        <div className="bg-white dark:bg-slate-900 transition-colors duration-300">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest mb-6 border border-brand-100 dark:border-brand-800 transition-colors">
                    <Activity className="w-4 h-4" /> Trusted by medical professionals
                </div>
                <h1 className="text-6xl md:text-7xl font-extrabold text-brand-900 dark:text-white leading-[1.1] mb-8 transition-colors">
                    Next-Gen AI <br /> Healthcare Analysis
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 transition-colors">
                    Vitalise AI leverages advanced deep learning to provide instant clinical insights. Empowering patients and doctors with data-driven health evaluations.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/predict/diabetes"
                        className="bg-brand-500 text-white px-10 py-4 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-xl shadow-brand-100 dark:shadow-none"
                    >
                        Start Analysis
                    </Link>
                    <a href="#features" className="text-brand-900 dark:text-white font-bold flex items-center hover:opacity-80 transition-opacity">
                        Discover Tech <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="bg-slate-50 dark:bg-slate-800/50 py-24 px-6 border-y border-slate-100 dark:border-slate-800 transition-colors">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-brand-500 font-bold tracking-wider text-sm mb-4 uppercase">The Core Engine</p>
                    <h2 className="text-4xl font-bold text-brand-900 dark:text-white mb-16 transition-colors">Intelligence Meets Reliability</h2>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                        <div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                            <div className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-brand-900 dark:text-white mb-4 transition-colors">High Fidelity Models</h3>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                                Our multi-layer prediction architecture ensures 95%+ accuracy across various health metrics through continuous model optimization.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                            <div className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                                <BarChart3 className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-brand-900 dark:text-white mb-4 transition-colors">Adaptive Visualization</h3>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                                Dynamic radar charts and importance mapping help decode the "why" behind every prediction, making AI results understandable.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
