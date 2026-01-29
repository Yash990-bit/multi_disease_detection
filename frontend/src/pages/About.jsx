import React from 'react'
import { ShieldCheck, Cpu, Users, Globe, Activity } from 'lucide-react'

const About = () => {
    return (
        <div className="bg-white min-h-screen py-32 px-[5%]">
            <div className="max-w-5xl mx-auto text-center">
                <div className="w-20 h-20 bg-brand-500 rounded-[30px] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-brand-100">
                    <Activity className="w-10 h-10" />
                </div>
                <h1 className="text-6xl font-extrabold text-brand-900 mb-8">Vitalise AI</h1>
                <p className="text-xl text-slate-500 mb-20 leading-relaxed max-w-3xl mx-auto">
                    Modernizing healthcare intelligence through high-fidelity clinical diagnostics. We bridge the gap between advanced data science and patient awareness.
                </p>

                <div className="grid md:grid-cols-2 gap-16 text-left">
                    <div className="flex gap-8">
                        <div className="flex-shrink-0 w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-500 border border-slate-100">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-brand-900 mb-3">Military-Grade Security</h3>
                            <p className="text-slate-500 leading-relaxed">All diagnostic data is processed in isolated environments. We prioritize patient confidentiality at every layer of the stack.</p>
                        </div>
                    </div>

                    <div className="flex gap-8">
                        <div className="flex-shrink-0 w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-500 border border-slate-100">
                            <Cpu className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-brand-900 mb-3">Hyper-Parameter AI</h3>
                            <p className="text-slate-500 leading-relaxed">Utilizing specialized architectures (SVM-SVC) tuned for specific medical datasets to achieve hyper-local accuracy.</p>
                        </div>
                    </div>

                    <div className="flex gap-8">
                        <div className="flex-shrink-0 w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-500 border border-slate-100">
                            <Users className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-brand-900 mb-3">Clinician Assisted</h3>
                            <p className="text-slate-500 leading-relaxed">Our models are designed to be an assistant, not a replacement. We help clinicians speed up the triage process with rapid scoring.</p>
                        </div>
                    </div>

                    <div className="flex gap-8">
                        <div className="flex-shrink-0 w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-500 border border-slate-100">
                            <Globe className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-brand-900 mb-3">Global Health Node</h3>
                            <p className="text-slate-500 leading-relaxed">A distributed intelligence network aiming to democratize access to advanced heart and metabolic risk evaluation tools.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-32 p-16 bg-slate-900 rounded-[80px] text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 opacity-10 blur-[100px]"></div>
                    <h4 className="text-3xl font-bold text-white mb-6">Technical Disclaimer</h4>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed italic">
                        "Vitalise AI is a diagnostic demonstration platform. Results should be interpreted as risk probabilities and must be confirmed by a licensed medical practitioner."
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About
