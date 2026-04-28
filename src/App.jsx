import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './theme.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import TippitTea from './pages/TippitTea'
import Voteable from './pages/Voteable'
import AvocadoApp from './pages/AvocadoApp'
import useCursorGlow from './hooks/useCursorGlow'

function App() {
  useCursorGlow()

  return (
    <BrowserRouter>
      <Navbar />
      <main className="content-wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tippittea" element={<TippitTea />} />
          <Route path="/voteable" element={<Voteable />} />
          <Route path="/avocado_app" element={<AvocadoApp />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
