import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, History, Activity, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isActive = (path) => location.pathname === path

    return (
        <nav 
            className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
                scrolled 
                ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200/50 dark:border-slate-800/50 py-3' 
                : 'bg-transparent border-transparent py-5'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                        <Activity className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Vitalise<span className="text-indigo-600">AI</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLink to="/" active={isActive('/')}>Home</NavLink>
                    
                    <div 
                        className="relative" 
                        onMouseEnter={() => setIsOpen(true)} 
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        <button 
                            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors py-2 ${
                                location.pathname.startsWith('/predict') 
                                ? 'text-indigo-600' 
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            Diagnostics <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-xl py-2 mt-1"
                                >
                                    <DropdownLink to="/predict/symptoms">Symptom Triage (NLP)</DropdownLink>
                                    <DropdownLink to="/predict/diabetes">Diabetes Engine</DropdownLink>
                                    <DropdownLink to="/predict/heart">Cardiac Analysis</DropdownLink>
                                    <DropdownLink to="/predict/liver">Hepatic Index</DropdownLink>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <NavLink to="/history" active={isActive('/history')}>
                        <History className="w-4 h-4 mr-1.5 inline" /> History
                    </NavLink>
                    <NavLink to="/about" active={isActive('/about')}>About</NavLink>
                </div>

                {/* Action CTA */}
                <Link 
                    to="/predict/symptoms" 
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 transition-all active:scale-95"
                >
                    Start Triage
                </Link>
            </div>
        </nav>
    )
}

const NavLink = ({ to, children, active }) => (
    <Link 
        to={to} 
        className={`text-sm font-semibold transition-all relative py-2 ${
            active 
            ? 'text-indigo-600' 
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
    >
        {children}
        {active && (
            <motion.div 
                layoutId="nav-underline" 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" 
            />
        )}
    </Link>
)

const DropdownLink = ({ to, children }) => (
    <Link 
        to={to} 
        className="block px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
    >
        {children}
    </Link>
)

export default Navbar
