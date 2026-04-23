import React from 'react'
import { Link } from 'react-router-dom'
import { Zap, BarChart3, ArrowRight, Activity, ShieldCheck, HeartPulse } from 'lucide-react'
import { motion } from 'framer-motion'

const Home = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    }

    return (
        <div className="min-h-screen gradient-bg transition-colors duration-300">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 text-center relative overflow-hidden">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] -z-10"
                />
                
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50/50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest mb-8 border border-brand-100 dark:border-brand-800/50 backdrop-blur-sm"
                >
                    <ShieldCheck className="w-4 h-4" /> Secure & Private AI Analysis
                </motion.div>
                
                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white leading-[1.05] mb-8 tracking-tight"
                >
                    Precision <span className="text-brand-500">Healthcare</span> <br />
                    Powered by AI
                </motion.h1>
                
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    Experience the future of diagnostics. Vitalise AI delivers clinical-grade health insights using state-of-the-art predictive intelligence.
                </motion.p>
                
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link
                        to="/predict/diabetes"
                        className="btn-glow bg-brand-600 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-brand-700 shadow-2xl shadow-brand-500/20"
                    >
                        Start Your Scan
                    </Link>
                    <a href="#features" className="text-slate-900 dark:text-white font-bold flex items-center hover:gap-3 transition-all duration-300 group">
                        Explore Methodology <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </section>

            {/* Stats/Badge Row */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-slate-200/50 dark:border-slate-800/50"
            >
                {[
                    { label: "Accuracy", value: "98.2%" },
                    { label: "Analysis Time", value: "< 2s" },
                    { label: "Data Points", value: "50k+" },
                    { label: "Secure", value: "AES-256" }
                ].map((stat, i) => ( stat &&
                    <div key={i} className="text-center">
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                        <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">{stat.label}</div>
                    </div>
                ))}
            </motion.div>

            {/* Features Section */}
            <section id="features" className="py-32 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-brand-500 font-bold tracking-widest text-sm mb-4 uppercase"
                        >
                            The Science Behind
                        </motion.p>
                        <motion.h2 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white"
                        >
                            Advanced Diagnostic Engine
                        </motion.h2>
                    </div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        <motion.div variants={itemVariants} className="glass p-10 rounded-[40px] group hover:-translate-y-2 transition-all duration-500">
                            <div className="w-16 h-16 bg-brand-500/10 rounded-2xl flex items-center justify-center text-brand-500 mb-8 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                                <Zap className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Neural Predictions</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Utilizing advanced random forest and neural network architectures for robust health indexing.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="glass p-10 rounded-[40px] group hover:-translate-y-2 transition-all duration-500">
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-8 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                <BarChart3 className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Biometric Mapping</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Every prediction is mapped back to clinical importance scores, giving you clarity on health priorities.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="glass p-10 rounded-[40px] group hover:-translate-y-2 transition-all duration-500">
                            <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 mb-8 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
                                <HeartPulse className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Dynamic Risk Profiling</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Continuous learning algorithms ensure your risk Profile stays updated with the latest clinical trends.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Home
