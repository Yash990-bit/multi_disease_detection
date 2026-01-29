import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, History, Activity } from 'lucide-react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="flex items-center justify-between px-[5%] py-4 border-b border-slate-100 sticky top-0 bg-white z-50">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-brand-500 hover:opacity-80 transition-opacity">
                <Activity className="w-8 h-8" />
                Vitalise AI
            </Link>
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-500">
                <Link to="/" className="hover:text-brand-500 transition-colors">Home</Link>
                <div className="relative group">
                    <button
                        className="flex items-center hover:text-brand-500 transition-colors py-2"
                        onMouseEnter={() => setIsOpen(true)}
                    >
                        Predict <ChevronDown className="ml-1 w-4 h-4" />
                    </button>

                    <div
                        className={`absolute top-full left-0 w-48 bg-white border border-slate-100 shadow-xl rounded-2xl py-2 mt-2 transition-all ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        <Link to="/predict/diabetes" className="block px-6 py-2 hover:bg-brand-50 hover:text-brand-700">Diabetes</Link>
                        <Link to="/predict/heart" className="block px-6 py-2 hover:bg-brand-50 hover:text-brand-700">Heart Disease</Link>
                        <Link to="/predict/liver" className="block px-6 py-2 hover:bg-brand-50 hover:text-brand-700">Liver Disease</Link>
                    </div>
                </div>
                <Link to="/history" className="hover:text-brand-500 transition-colors flex items-center gap-1.5">
                    <History className="w-4 h-4" /> History
                </Link>
                <Link to="/about" className="hover:text-brand-500 transition-colors">About</Link>
            </div>

            <Link
                to="/predict/diabetes"
                className="bg-brand-500 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-brand-100 transition-transform hover:scale-105"
            >
                Portal Login
            </Link>
        </nav>
    )
}

export default Navbar
