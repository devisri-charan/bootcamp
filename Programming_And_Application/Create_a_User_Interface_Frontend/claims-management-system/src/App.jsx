import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://2120cc937f98d1c52e5cf1ef22cbc982@o4507565682065408.ingest.us.sentry.io/4507565684031488",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  tracePropagationTargets: ["localhost", "securelifeinsurance.vercel.app"],
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

function App() {
  return (
    <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/user/:userId/*" element={<UserDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </Sentry.ErrorBoundary>
  )
}

export default App
