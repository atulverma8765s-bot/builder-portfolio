import React, { useEffect, useState } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StudioPage } from './pages/StudioPage';
import { PublicPortfolioPage } from './pages/PublicPortfolioPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';

function AppRouter({ currentPath, setCurrentPath }) {
  const { user, authLoading } = useAuth();

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

  const goTo = (path) => {
    const target = `${basePath}${path}`;
    window.history.pushState({}, '', target);
    setCurrentPath(window.location.pathname);
    window.scrollTo(0, 0);
  };

  const publicPath = currentPath.startsWith(basePath)
    ? currentPath.slice(basePath.length) || '/'
    : currentPath;

  const publicMatch = publicPath.match(/^\/p\/([^/]+)/);

  if (publicMatch) {
    return <PublicPortfolioPage slug={publicMatch[1]} />;
  }

  if (authLoading && (publicPath === '/login' || publicPath === '/studio')) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
          <p className="mt-4 text-sm text-slate-400">Loading FolioCraft...</p>
        </div>
      </div>
    );
  }

  if (publicPath === '/login') {
    if (user) {
      window.history.replaceState({}, '', `${basePath}/studio`);
      setTimeout(() => setCurrentPath(window.location.pathname), 0);
      return null;
    }

    return <LoginPage />;
  }

  if (publicPath === '/studio') {
    if (!user) {
      return <LoginPage />;
    }

    return (
      <PortfolioProvider>
        <StudioPage />
      </PortfolioProvider>
    );
  }

  return <HomePage onBuild={() => goTo('/login')} />;
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <AuthProvider>
      <AppRouter
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
      />
    </AuthProvider>
  );
}
