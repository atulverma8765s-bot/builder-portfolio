import React, { useState, useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StudioPage } from './pages/StudioPage';
import { PublicPortfolioPage } from './pages/PublicPortfolioPage';
import { LoginPage } from './pages/LoginPage';

function ProtectedStudio() {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-slate-400">Loading FolioCraft...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <PortfolioProvider>
      <StudioPage />
    </PortfolioProvider>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

  const publicPath = currentPath.startsWith(basePath)
    ? currentPath.slice(basePath.length) || '/'
    : currentPath;

  const publicMatch = publicPath.match(/^\/p\/([^/]+)/);

  if (publicMatch) {
    const slug = publicMatch[1];

    return <PublicPortfolioPage slug={slug} />;
  }

  return (
    <AuthProvider>
      <ProtectedStudio />
    </AuthProvider>
  );
}
