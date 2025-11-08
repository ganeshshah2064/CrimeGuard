import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { DashboardProvider } from './contexts/DashboardContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CrimeMapPage from './pages/CrimeMapPage';
import ReportIncidentPage from './pages/ReportIncidentPage';
import SafetyResourcesPage from './pages/SafetyResourcesPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import OverviewPage from './pages/OverviewPage';
import MyReportsPage from './pages/MyReportsPage';
import NotificationsPage from './pages/NotificationsPage';
import AIChatbotPage from './pages/AIChatbotPage';
import AIAnalyzerPage from './pages/AIAnalyzerPage';
import PoliceStationsPage from './pages/PoliceStationsPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import SponsorPage from './pages/SponsorPage';
import SettingsPage from './pages/SettingsPage';
import AllCrimesPage from './pages/AllCrimesPage';
import CrimeDetailsPage from './pages/CrimeDetailsPage';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DashboardProvider>
          <Router>
            <Routes>
              {/* Auth routes (without layout) */}
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/signup" element={<AuthPage />} />
              
              {/* Dashboard routes (protected) */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/overview"
                element={
                  <ProtectedRoute>
                    <OverviewPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/reports"
                element={
                  <ProtectedRoute>
                    <MyReportsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/notifications"
                element={
                  <ProtectedRoute>
                    <NotificationsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/ai-chatbot"
                element={
                  <ProtectedRoute>
                    <AIChatbotPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/ai-analyzer"
                element={
                  <ProtectedRoute>
                    <AIAnalyzerPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/police-stations"
                element={
                  <ProtectedRoute>
                    <PoliceStationsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/about"
                element={
                  <ProtectedRoute>
                    <AboutPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/faq"
                element={
                  <ProtectedRoute>
                    <FAQPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/sponsor"
                element={
                  <ProtectedRoute>
                    <SponsorPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/crimes"
                element={
                  <ProtectedRoute>
                    <AllCrimesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/crimes/:id"
                element={
                  <ProtectedRoute>
                    <CrimeDetailsPage />
                  </ProtectedRoute>
                }
              />
              
              {/* Main app routes (with layout) */}
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="map" element={<CrimeMapPage />} />
                <Route path="report" element={<ReportIncidentPage />} />
                <Route path="safety" element={<SafetyResourcesPage />} />
              </Route>
            </Routes>
          </Router>
        </DashboardProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;