import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './theme.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import TippitTea from './pages/TippitTea'
import Voteable from './pages/Voteable'
import AvocadoApp from './pages/AvocadoApp'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tippit_tea" element={<TippitTea />} />
        <Route path="/voteable" element={<Voteable />} />
        <Route path="/avocado_app" element={<AvocadoApp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
