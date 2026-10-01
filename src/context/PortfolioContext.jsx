import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react';

import { api } from '../utils/api';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [portfolios, setPortfolios] = useState([]);
  const [currentPortfolio, setCurrentPortfolio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewRefreshKey, setPreviewRefreshKey] = useState(0);
  const [error, setError] = useState(null);

  // Editor states
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [previewMode, setPreviewMode] = useState('split');
  const [activeTab, setActiveTab] = useState('content');
  const [activeSectionSubTab, setActiveSectionSubTab] = useState('hero');

  // Messages state
  const [messages, setMessages] = useState([]);

  // ============================================================
  // FETCH ALL PORTFOLIOS
  // ============================================================

  const fetchAllPortfolios = useCallback(async () => {
    try {
      setIsLoading(true);

      const list = await api.getPortfolios();

      setPortfolios(list);

      setCurrentPortfolio((prev) => {
        if (prev || list.length === 0) {
          return prev;
        }

        return list[0];
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllPortfolios();
  }, [fetchAllPortfolios]);

  // ============================================================
  // FETCH MESSAGES
  // ============================================================

  const refreshMessages = useCallback(async () => {
    if (!currentPortfolio?.id) {
      return;
    }

    try {
      const msgs = await api.getMessages(currentPortfolio.id);

      setMessages(msgs);
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  }, [currentPortfolio?.id]);

  useEffect(() => {
    if (currentPortfolio?.id) {
      refreshMessages();
    }
  }, [currentPortfolio?.id, refreshMessages]);

  // ============================================================
  // UPDATE CURRENT PORTFOLIO
  // ============================================================

  const updateCurrentPortfolio = useCallback((updater) => {
    setCurrentPortfolio((prev) => {
      if (!prev) {
        return prev;
      }

      const next =
        typeof updater === 'function'
          ? updater(prev)
          : {
              ...prev,
              ...updater
            };

      return next;
    });
  }, []);

  // ============================================================
  // UPDATE SECTION
  // ============================================================

  const updateSection = useCallback((sectionKey, updates) => {
    setCurrentPortfolio((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,

        [sectionKey]: {
          ...prev[sectionKey],
          ...updates
        }
      };
    });
  }, []);

  // ============================================================
  // UPDATE DESIGN
  // ============================================================

  const updateDesign = useCallback((designUpdates) => {
    setCurrentPortfolio((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,

        design: {
          ...prev.design,
          ...designUpdates
        }
      };
    });
  }, []);

  // ============================================================
  // APPLY TEMPLATE
  // ============================================================

  const applyTemplate = useCallback(
    async (template) => {
      if (!currentPortfolio?.id) {
        return;
      }

      setIsSaving(true);
      setError(null);

      try {
        const nextPortfolio = {
          ...currentPortfolio,

          design: {
            ...currentPortfolio.design,

            // Important:
            // This identifies the actual visual template.
            template: template.id,

            // Template visual settings
            theme:
              template.theme ||
              currentPortfolio.design?.theme,

            accentColor:
              template.accentColor ||
              currentPortfolio.design?.accentColor,

            secondaryColor:
              template.secondaryColor ||
              currentPortfolio.design?.secondaryColor,

            cardStyle:
              template.cardStyle ||
              currentPortfolio.design?.cardStyle
          }
        };

        // Save template to backend
        const updated = await api.updatePortfolio(
          currentPortfolio.id,
          nextPortfolio
        );

        // Update current portfolio
        setCurrentPortfolio(updated);

        // Update portfolio list
        setPortfolios((prev) =>
          prev.map((portfolio) =>
            portfolio.id === updated.id
              ? updated
              : portfolio
          )
        );

        // Refresh live preview
        setPreviewRefreshKey((key) => key + 1);

        // Success message
        setSaveSuccess(true);

        setTimeout(() => {
          setSaveSuccess(false);
        }, 2500);

        return updated;
      } catch (err) {
        console.error(
          'Failed to apply template:',
          err
        );

        setError(err.message);

        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [currentPortfolio]
  );

  // ============================================================
  // SAVE CURRENT PORTFOLIO
  // ============================================================

  const savePortfolio = async () => {
    if (!currentPortfolio?.id) {
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const updated = await api.updatePortfolio(
        currentPortfolio.id,
        currentPortfolio
      );

      setCurrentPortfolio(updated);

      setPortfolios((prev) =>
        prev.map((p) =>
          p.id === updated.id
            ? updated
            : p
        )
      );

      // Refresh preview after saving
      setPreviewRefreshKey((key) => key + 1);

      setSaveSuccess(true);

      setTimeout(() => {
        setSaveSuccess(false);
      }, 2500);
    } catch (err) {
      console.error(err);

      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // ============================================================
  // SWITCH PORTFOLIO
  // ============================================================

  const switchPortfolio = async (id) => {
    const found = portfolios.find(
      (p) => p.id === id
    );

    if (found) {
      setCurrentPortfolio(found);
      setPreviewRefreshKey((key) => key + 1);
    } else {
      try {
        const fetched = await api.getPortfolio(id);

        setCurrentPortfolio(fetched);

        setPreviewRefreshKey((key) => key + 1);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // ============================================================
  // CREATE NEW PORTFOLIO
  // ============================================================

  const createNewPortfolio = async (baseData = null) => {
    setIsSaving(true);

    try {
      const payload =
        baseData ||
        {
          title: 'New Portfolio',

          slug: `portfolio-${Date.now()
            .toString()
            .slice(-4)}`,

          design: {
            template: 'neon-nexus',

            theme: 'cyberpunk',

            fontFamily: 'Inter',

            accentColor: '#6366f1',

            secondaryColor: '#06b6d4',

            cardStyle: 'glass',

            borderRadius: 'rounded-xl',

            spacing: 'comfortable'
          },

          hero: {
            name: 'Your Name',

            title: 'Your Professional Title',

            tagline:
              'Brief description of what you do and what you are passionate about.',

            badge:
              '🟢 Available for new roles',

            location: 'City, Country',

            primaryCta: {
              text: 'View Projects',
              link: '#projects'
            },

            secondaryCta: {
              text: 'Contact Me',
              link: '#contact'
            },

            socials: {
              github: '',
              linkedin: '',
              email: ''
            }
          },

          about: {
            enabled: true,

            title: 'About Me',

            summary:
              'A brief summary of your background, experience, and passions.',

            story:
              'More details about your journey and achievements.',

            stats: [
              {
                label: 'Years Experience',
                value: '3+'
              },

              {
                label: 'Projects Completed',
                value: '10+'
              }
            ]
          },

          skills: {
            enabled: true,

            title: 'Skills',

            categories: [
              {
                name: 'Technical Skills',

                skills: [
                  {
                    name: 'JavaScript',
                    level: 'Expert'
                  },

                  {
                    name: 'React',
                    level: 'Advanced'
                  }
                ]
              }
            ]
          },

          experience: {
            enabled: true,
            title: 'Experience',
            items: []
          },

          projects: {
            enabled: true,
            title: 'Projects',
            items: []
          },

          services: {
            enabled: false,
            title: 'Services',
            items: []
          },

          testimonials: {
            enabled: false,
            title: 'Testimonials',
            items: []
          },

          education: {
            enabled: true,
            title: 'Education',
            items: []
          },

          contact: {
            enabled: true,

            title: 'Get In Touch',

            subtitle: 'Drop me a line anytime.',

            email: 'your.email@example.com'
          },

          footer: {
            customText: 'All rights reserved.',

            showBadge: true
          }
        };

      const created =
        await api.createPortfolio(payload);

      setPortfolios((prev) => [
        created,
        ...prev
      ]);

      setCurrentPortfolio(created);

      setPreviewRefreshKey((key) => key + 1);

      return created;
    } catch (err) {
      setError(err.message);

      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  // ============================================================
  // DUPLICATE PORTFOLIO
  // ============================================================

  const duplicatePortfolio = async (id) => {
    setIsSaving(true);

    try {
      const duplicated =
        await api.duplicatePortfolio(id);

      setPortfolios((prev) => [
        duplicated,
        ...prev
      ]);

      setCurrentPortfolio(duplicated);

      setPreviewRefreshKey((key) => key + 1);

      return duplicated;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // ============================================================
  // DELETE PORTFOLIO
  // ============================================================

  const deletePortfolio = async (id) => {
    if (portfolios.length <= 1) {
      alert(
        'You must keep at least one portfolio.'
      );

      return;
    }

    if (
      !window.confirm(
        'Are you sure you want to delete this portfolio? This cannot be undone.'
      )
    ) {
      return;
    }

    try {
      await api.deletePortfolio(id);

      const remaining =
        portfolios.filter(
          (portfolio) =>
            portfolio.id !== id
        );

      setPortfolios(remaining);

      if (
        currentPortfolio?.id === id
      ) {
        setCurrentPortfolio(
          remaining[0] || null
        );

        setPreviewRefreshKey(
          (key) => key + 1
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // ============================================================
  // UNREAD MESSAGES
  // ============================================================

  const unreadMessagesCount =
    messages.filter(
      (message) => !message.read
    ).length;

  // ============================================================
  // PROVIDER
  // ============================================================

  return (
    <PortfolioContext.Provider
      value={{
        // Portfolio data
        portfolios,
        currentPortfolio,

        // Loading / saving
        isLoading,
        isSaving,
        saveSuccess,
        error,

        // Preview
        previewRefreshKey,
        previewDevice,
        setPreviewDevice,

        previewMode,
        setPreviewMode,

        // Editor navigation
        activeTab,
        setActiveTab,

        activeSectionSubTab,
        setActiveSectionSubTab,

        // Messages
        messages,
        unreadMessagesCount,

        // Portfolio update functions
        updateCurrentPortfolio,
        updateSection,
        updateDesign,

        // Template
        applyTemplate,

        // Save
        savePortfolio,

        // Portfolio management
        switchPortfolio,
        createNewPortfolio,
        duplicatePortfolio,
        deletePortfolio,

        // Messages refresh
        refreshMessages
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

// ============================================================
// USE PORTFOLIO HOOK
// ============================================================

export function usePortfolio() {
  const context =
    useContext(PortfolioContext);

  if (!context) {
    throw new Error(
      'usePortfolio must be used within a PortfolioProvider'
    );
  }

  return context;
}