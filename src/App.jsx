import React, { useState, useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { StudioPage } from './pages/StudioPage';
import { PublicPortfolioPage } from './pages/PublicPortfolioPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Check if viewing a public portfolio route e.g. /p/alex-rivera
  const publicMatch = currentPath.match(/^\/p\/([^/]+)/);
  if (publicMatch) {
    const slug = publicMatch[1];
    return <PublicPortfolioPage slug={slug} />;
  }

  // Default: Studio builder
  return (
    <PortfolioProvider>
      <StudioPage />
    </PortfolioProvider>
  );
}
