import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage'
import SignUpPage from './pages/SignUpPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LogInPage/>} />
        <Route path="/register" element={<SignUpPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
