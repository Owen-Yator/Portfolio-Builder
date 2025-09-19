import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages
import Home from './pages/Home.tsx';
import TemplatesPage from './pages/TemplatesPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import PreviewPage from './pages/PreviewPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignUpPage from './pages/SignUpPage.tsx';
import PublicPortfolioPage from './pages/PublicPortfolioPage.tsx';

// Import components
import PortfolioCreationForm from './components/portfolio/PortfolioCreationForm.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/create" element={<PortfolioCreationForm />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/preview/:id" element={<PreviewPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/portfolio/:slug" element={<PublicPortfolioPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;