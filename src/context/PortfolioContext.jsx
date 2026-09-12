import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [portfolios, setPortfolios] = useState([]);
  const [currentPortfolio, setCurrentPortfolio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Editor states
  const [previewDevice, setPreviewDevice] = useState('desktop'); // desktop, tablet, mobile
  const [previewMode, setPreviewMode] = useState('split'); // split, fullscreen
  const [activeTab, setActiveTab] = useState('content'); // content, design, sections, settings, messages
  const [activeSectionSubTab, setActiveSectionSubTab] = useState('hero'); // hero, about, skills, experience, projects, etc.
  
  // Messages state
  const [messages, setMessages] = useState([]);

  // Fetch initial portfolios list
  const fetchAllPortfolios = useCallback(async () => {
    try {
      setIsLoading(true);
      const list = await api.getPortfolios();
      setPortfolios(list);
      if (list.length > 0 && !currentPortfolio) {
        setCurrentPortfolio(list[0]);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [currentPortfolio]);

  useEffect(() => {
    fetchAllPortfolios();
  }, [fetchAllPortfolios]);

  // Fetch messages when current portfolio changes
  const refreshMessages = useCallback(async () => {
    if (!currentPortfolio?.id) return;
    try {
      const msgs = await api.getMessages(currentPortfolio.id);
      setMessages(msgs);
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  }, [currentPortfolio?.id]);

  useEffect(() => {
    if (currentPortfolio?.id) {
      refreshMessages();
    }
  }, [currentPortfolio?.id, refreshMessages]);

  // Update specific fields of current portfolio in memory
  const updateCurrentPortfolio = useCallback((updater) => {
    setCurrentPortfolio((prev) => {
      if (!prev) return prev;
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      return next;
    });
  }, []);

  // Update a specific section
  const updateSection = useCallback((sectionKey, updates) => {
    setCurrentPortfolio((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          ...updates,
        },
      };
    });
  }, []);

  // Update design settings
  const updateDesign = useCallback((designUpdates) => {
    setCurrentPortfolio((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        design: {
          ...prev.design,
          ...designUpdates,
        },
      };
    });
  }, []);

  // Save current portfolio to API
  const savePortfolio = async () => {
    if (!currentPortfolio?.id) return;
    setIsSaving(true);
    setError(null);
    try {
      const updated = await api.updatePortfolio(currentPortfolio.id, currentPortfolio);
      setCurrentPortfolio(updated);
      setPortfolios((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Switch active portfolio
  const switchPortfolio = async (id) => {
    const found = portfolios.find((p) => p.id === id);
    if (found) {
      setCurrentPortfolio(found);
    } else {
      try {
        const fetched = await api.getPortfolio(id);
        setCurrentPortfolio(fetched);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Create new portfolio from scratch or template
  const createNewPortfolio = async (baseData = null) => {
    setIsSaving(true);
    try {
      const payload = baseData || {
        title: "New Portfolio",
        slug: `portfolio-${Date.now().toString().slice(-4)}`,
        design: {
          theme: "cyberpunk",
          fontFamily: "Inter",
          accentColor: "#6366f1",
          secondaryColor: "#06b6d4",
          cardStyle: "glass",
          borderRadius: "rounded-xl",
          spacing: "comfortable",
        },
        hero: {
          name: "Your Name",
          title: "Your Professional Title",
          tagline: "Brief description of what you do and what you're passionate about.",
          badge: "🟢 Available for new roles",
          location: "City, Country",
          primaryCta: { text: "View Projects", link: "#projects" },
          secondaryCta: { text: "Contact Me", link: "#contact" },
          socials: { github: "", linkedin: "", email: "" },
        },
        about: {
          enabled: true,
          title: "About Me",
          summary: "A brief summary of your background, experience, and passions.",
          story: "More details about your journey and achievements.",
          stats: [
            { label: "Years Experience", value: "3+" },
            { label: "Projects Completed", value: "10+" },
          ],
        },
        skills: {
          enabled: true,
          title: "Skills",
          categories: [
            {
              name: "Technical Skills",
              skills: [{ name: "JavaScript", level: "Expert" }, { name: "React", level: "Advanced" }],
            },
          ],
        },
        experience: { enabled: true, title: "Experience", items: [] },
        projects: { enabled: true, title: "Projects", items: [] },
        services: { enabled: false, title: "Services", items: [] },
        testimonials: { enabled: false, title: "Testimonials", items: [] },
        education: { enabled: true, title: "Education", items: [] },
        contact: {
          enabled: true,
          title: "Get In Touch",
          subtitle: "Drop me a line anytime.",
          email: "your.email@example.com",
        },
        footer: {
          customText: "All rights reserved.",
          showBadge: true,
        },
      };

      const created = await api.createPortfolio(payload);
      setPortfolios((prev) => [created, ...prev]);
      setCurrentPortfolio(created);
      return created;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  // Duplicate portfolio
  const duplicatePortfolio = async (id) => {
    setIsSaving(true);
    try {
      const duplicated = await api.duplicatePortfolio(id);
      setPortfolios((prev) => [duplicated, ...prev]);
      setCurrentPortfolio(duplicated);
      return duplicated;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Delete portfolio
  const deletePortfolio = async (id) => {
    if (portfolios.length <= 1) {
      alert("You must keep at least one portfolio.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this portfolio? This cannot be undone.")) {
      return;
    }
    try {
      await api.deletePortfolio(id);
      const remaining = portfolios.filter((p) => p.id !== id);
      setPortfolios(remaining);
      if (currentPortfolio?.id === id) {
        setCurrentPortfolio(remaining[0] || null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Unread messages count
  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  return (
    <PortfolioContext.Provider
      value={{
        portfolios,
        currentPortfolio,
        isLoading,
        isSaving,
        saveSuccess,
        error,
        previewDevice,
        setPreviewDevice,
        previewMode,
        setPreviewMode,
        activeTab,
        setActiveTab,
        activeSectionSubTab,
        setActiveSectionSubTab,
        messages,
        unreadMessagesCount,
        updateCurrentPortfolio,
        updateSection,
        updateDesign,
        savePortfolio,
        switchPortfolio,
        createNewPortfolio,
        duplicatePortfolio,
        deletePortfolio,
        refreshMessages,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
