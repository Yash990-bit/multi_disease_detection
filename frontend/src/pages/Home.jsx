import React from 'react'
import { Link } from 'react-router-dom'
import { Zap, BarChart3, ArrowRight } from 'lucide-react'

const Home = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
                <h1 className="text-6xl md:text-7xl font-extrabold text-teal-900 leading-[1.1] mb-8">
                    AI-Powered <br /> Multi-Disease Risk Analysis
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
                    A simple yet powerful tool to analyze health patterns. Designed for educational purposes to demonstrate how Machine Learning can assist in modern healthcare.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/predict/diabetes"
                        className="bg-teal-500 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-teal-700 transition-all shadow-lg shadow-teal-100/50"
                    >
                        Start Analysis
                    </Link>
                    <a href="#features" className="text-teal-900 font-semibold flex items-center hover:opacity-80 transition-opacity">
                        Learn more <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="bg-teal-50 py-24 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-teal-500 font-bold tracking-wider text-sm mb-4 uppercase">Advanced Technology</p>
                    <h2 className="text-4xl font-bold text-teal-900 mb-16">Reliable Predictions & Visual Insights</h2>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                        <div className="bg-white p-8 rounded-3xl border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center text-white mb-6">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-teal-900 mb-3">High Accuracy Model</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                We leverage optimized machine learning algorithms (SVM & Random Forest) to ensure your health risk predictions are as reliable as possible.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center text-white mb-6">
                                <BarChart3 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-teal-900 mb-3">Visual Data Analysis</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                Understand your results clearly. Our interactive visualization tools help you see exactly which factors contribute most to your health risk score.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
