import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, History, Activity, Moon, Sun } from 'lucide-react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    return (
        <nav className="flex items-center justify-between px-[5%] py-4 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-50 transition-colors duration-300">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-brand-500 dark:text-brand-400 hover:opacity-80 transition-opacity">
                <Activity className="w-8 h-8" />
                Vitalise AI
            </Link>

            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                <Link to="/" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">Home</Link>
                <div className="relative group">
                    <button
                        className="flex items-center hover:text-brand-500 dark:hover:text-brand-400 transition-colors py-2"
                        onMouseEnter={() => setIsOpen(true)}
                    >
                        Predict <ChevronDown className="ml-1 w-4 h-4" />
                    </button>

                    <div
                        className={`absolute top-full left-0 w-48 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl rounded-2xl py-2 mt-2 transition-all ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        <Link to="/predict/diabetes" className="block px-6 py-2 hover:bg-brand-50 dark:hover:bg-slate-700 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">Diabetes</Link>
                        <Link to="/predict/heart" className="block px-6 py-2 hover:bg-brand-50 dark:hover:bg-slate-700 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">Heart Disease</Link>
                        <Link to="/predict/liver" className="block px-6 py-2 hover:bg-brand-50 dark:hover:bg-slate-700 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">Liver Disease</Link>
                    </div>
                </div>
                <Link to="/history" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors flex items-center gap-1.5">
                    <History className="w-4 h-4" /> History
                </Link>
                <Link to="/about" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">About</Link>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
                    title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>
        </nav>
    )
}

export default Navbar
