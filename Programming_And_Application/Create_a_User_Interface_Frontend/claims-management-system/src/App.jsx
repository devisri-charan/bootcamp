import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LogInPage/>} />
        <Route path="/register" element={<SignUpPage/>}/>
        <Route path="/user/:userId/*" element={<UserDashboard/>}/>
        <Route path="/admin/*" element={<AdminDashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App
