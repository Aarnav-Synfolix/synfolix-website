import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Careers from './pages/Careers'
import SynfolixHealth from './pages/products/SynfolixHealth'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/products/synfolix-health" element={<SynfolixHealth />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
