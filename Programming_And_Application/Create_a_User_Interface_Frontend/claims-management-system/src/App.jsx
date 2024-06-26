import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import CustomerDashboard from './pages/CustomerDashboard';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LogInPage/>} />
        <Route path="/register" element={<SignUpPage/>}/>
        <Route path="/user/:userId" element={<CustomerDashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App
