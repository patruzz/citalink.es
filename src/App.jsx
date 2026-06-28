
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import AgentsPage from './pages/AgentsPage.jsx';
import SectorsPage from './pages/SectorsPage.jsx';
import PricingPage from './pages/PricingPage.jsx';
import DemoPage from './pages/DemoPage.jsx';
import AccessPage from './pages/AccessPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/producto" element={<ProductPage />} />
          <Route path="/agentes" element={<AgentsPage />} />
          <Route path="/sectores" element={<SectorsPage />} />
          <Route path="/precios" element={<PricingPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/acceso" element={<AccessPage />} />
          <Route path="/privacidad" element={<PrivacyPage />} />
          <Route path="/terminos" element={<TermsPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
