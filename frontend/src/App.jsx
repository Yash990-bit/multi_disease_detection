import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PredictDiabetes from './pages/PredictDiabetes'
import PredictHeart from './pages/PredictHeart'
import PredictLiver from './pages/PredictLiver'
import History from './pages/History'
import About from './pages/About'

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-white">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/predict/diabetes" element={<PredictDiabetes />} />
                        <Route path="/predict/heart" element={<PredictHeart />} />
                        <Route path="/predict/liver" element={<PredictLiver />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    )
}

export default App
