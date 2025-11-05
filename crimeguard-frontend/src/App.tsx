import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CrimeMapPage from './pages/CrimeMapPage';
import ReportIncidentPage from './pages/ReportIncidentPage';
import SafetyResourcesPage from './pages/SafetyResourcesPage';
import AuthPage from './pages/AuthPage';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Auth routes (without layout) */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          
          {/* Main app routes (with layout) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="map" element={<CrimeMapPage />} />
            <Route path="report" element={<ReportIncidentPage />} />
            <Route path="safety" element={<SafetyResourcesPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;