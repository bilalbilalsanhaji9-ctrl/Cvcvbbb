/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Folder, Methodology, Session, Settings } from './types';
import { DEFAULT_FOLDERS, DEFAULT_METHODOLOGIES } from './data/defaultMethodologies';
import { motion, AnimatePresence } from 'motion/react';

// Component imports
import Header from './components/Header';
import FolderManager from './components/FolderManager';
import LearningModePanel from './components/LearningModePanel';
import ExamModePanel from './components/ExamModePanel';
import ResultReportPanel from './components/ResultReportPanel';
import SajjelTaqaddomPanel from './components/SajjelTaqaddomPanel';

// Icons / Utilities
import { Award, BookOpen, Layers, BarChart2, ShieldCheck, Keyboard, HelpCircle } from 'lucide-react';

function fixGermanSalutationCapitalization(content: string): string {
  // Finds salutations ending with a comma (Sehr geehrte Damen und Herren,, etc.), 
  // and lowercases the first character of the immediate next paragraph.
  return content.replace(
    /(Sehr\s+geehrte[r]?\s+[^,]+,\s*\n+)([A-Z]|[\u00C0-\u00D6\u00D8-\u00DC])/g,
    (match, salutation, firstChar) => {
      return salutation + firstChar.toLowerCase();
    }
  );
}

export default function App() {
  // -----------------------------------------
  // 1. Initial State Loading from LocalStorage
  // -----------------------------------------
  const [folders, setFolders] = useState<Folder[]>(() => {
    const local = localStorage.getItem('telc_folders');
    const loaded: Folder[] = local ? JSON.parse(local) : DEFAULT_FOLDERS;
    return loaded.filter(f => f.id !== 'meinung' && f.id !== 'anfrage' && f.id !== 'bewerbung');
  });

  const [methodologies, setMethodologies] = useState<Methodology[]>(() => {
    const local = localStorage.getItem('telc_methodologies');
    const loaded: Methodology[] = local ? JSON.parse(local) : DEFAULT_METHODOLOGIES;
    return loaded
      .filter(m => m.folderId !== 'meinung' && m.folderId !== 'anfrage' && m.folderId !== 'bewerbung')
      .map(m => ({
        ...m,
        content: fixGermanSalutationCapitalization(m.content)
      }));
  });

  const [sessions, setSessions] = useState<Session[]>(() => {
    const local = localStorage.getItem('telc_sessions');
    return local ? JSON.parse(local) : [];
  });

  const [theme, setTheme] = useState<'dark' | 'light' | 'emerald'>(() => {
    const local = localStorage.getItem('telc_theme');
    return (local as any) || 'dark';
  });

  // Navigation and dynamic targeting states
  const [currentView, setCurrentView] = useState<'folders' | 'learn' | 'exam' | 'history'>('folders');
  const [activePracticeText, setActivePracticeText] = useState<Methodology | null>(null);

  // Active training feedback reporting
  const [activeReportSession, setActiveReportSession] = useState<Session | null>(null);
  const [lastOriginalText, setLastOriginalText] = useState('');
  const [lastTypedText, setLastTypedText] = useState('');

  // -----------------------------------------
  // 2. State Syncing to LocalStorage
  // -----------------------------------------
  useEffect(() => {
    localStorage.setItem('telc_folders', JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem('telc_methodologies', JSON.stringify(methodologies));
  }, [methodologies]);

  useEffect(() => {
    localStorage.setItem('telc_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('telc_theme', theme);
  }, [theme]);

  // Apply theme class names to body/html context
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-dark', 'theme-light', 'theme-emerald');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  // -----------------------------------------
  // 3. Methodology & Folder Mutations
  // -----------------------------------------
  const handleAddMethodology = (newM: Omit<Methodology, 'id' | 'createdAt' | 'mastery'>) => {
    const fresh: Methodology = {
      ...newM,
      content: fixGermanSalutationCapitalization(newM.content),
      id: `m-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      mastery: 0,
      createdAt: Date.now(),
    };
    setMethodologies(prev => [fresh, ...prev]);
  };

  const handleEditMethodology = (id: string, updates: Partial<Methodology>) => {
    setMethodologies(prev => prev.map(m => {
      if (m.id === id) {
        const revisedUpdates = { ...updates };
        if (updates.content) {
          revisedUpdates.content = fixGermanSalutationCapitalization(updates.content);
        }
        return { ...m, ...revisedUpdates };
      }
      return m;
    }));
  };

  const handleDeleteMethodology = (id: string) => {
    setMethodologies(prev => prev.filter(m => m.id !== id));
  };

  const handleRestoreDefaults = () => {
    setMethodologies(prev => {
      const existingIds = new Set(prev.map(m => m.id));
      const missing = DEFAULT_METHODOLOGIES.filter(m => !existingIds.has(m.id));
      if (missing.length === 0) {
        if (confirm('جميع مواضيع الكتابة الـ 21 موجودة ومحدثة بالفعل في جهازك. هل تود إعادة تعيين القائمة بالكامل (ما سيحذف المواضيع التي أضفتها بنفسك)؟')) {
          return DEFAULT_METHODOLOGIES.map(m => ({
            ...m,
            content: fixGermanSalutationCapitalization(m.content)
          }));
        }
        return prev;
      }
      return [...prev, ...missing.map(m => ({
        ...m,
        content: fixGermanSalutationCapitalization(m.content)
      }))];
    });
  };

  const handleAddFolder = (nameAr: string, nameDe: string) => {
    const fresh: Folder = {
      id: `f-${Date.now()}`,
      nameAr,
      nameDe,
      color: getRandomGradient(),
    };
    setFolders(prev => [...prev, fresh]);
  };

  // Triggers selection from Folder Tab and redirects instantly
  const handleSelectForTraining = (m: Methodology, mode: 'learn' | 'exam') => {
    setActivePracticeText(m);
    setCurrentView(mode === 'learn' ? 'learn' : 'exam');
    setActiveReportSession(null); // Close any open report
  };

  // -----------------------------------------
  // 4. Training Session Recording & Performance Grading
  // -----------------------------------------
  const handleSessionComplete = (newSessionData: Omit<Session, 'id' | 'timestamp'>) => {
    const sessionID = `sess-${Date.now()}`;
    const freshSession: Session = {
      ...newSessionData,
      id: sessionID,
      timestamp: Date.now(),
    };

    // Grab original and typed strings and save in transient states for deep rendering
    const matchedMethodology = methodologies.find(m => m.id === newSessionData.textId);
    const typedTextStr = (document.getElementById('typing-textarea') as HTMLTextAreaElement)?.value 
      || (document.getElementById('exam-textarea-box') as HTMLTextAreaElement)?.value 
      || '';

    setLastOriginalText(matchedMethodology ? matchedMethodology.content : '');
    setLastTypedText(typedTextStr);

    // Save session in history
    setSessions(prev => [freshSession, ...prev]);

    // Update highest Mastery score for this specific methodology
    if (matchedMethodology) {
      const bestScore = Math.max(matchedMethodology.mastery, newSessionData.accuracy);
      handleEditMethodology(matchedMethodology.id, { mastery: bestScore });
    }

    // Direct user to report panel
    setActiveReportSession(freshSession);
  };

  // Manage history prunings
  const handleClearHistory = () => {
    setSessions([]);
    // Reset all methodology masteries
    setMethodologies(prev => prev.map(m => ({ ...m, mastery: 0 })));
  };

  const handleDeleteSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  // Helpers
  const getRandomGradient = () => {
    const gradients = [
      'from-purple-500 to-indigo-600',
      'from-cyan-500 to-blue-600',
      'from-pink-500 to-rose-600',
      'from-amber-400 to-orange-600',
      'from-emerald-500 to-teal-600',
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  const activeThemeClass = 
    theme === 'light' 
      ? 'bg-slate-50 text-slate-800' 
      : theme === 'emerald'
        ? 'bg-[#04100c] text-teal-50/90'
        : 'bg-slate-950 text-slate-100';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${activeThemeClass}`} id="app-root-container">
      {/* 1. Header Navigation */}
      <Header 
        currentView={currentView} 
        onViewChange={(v) => {
          setCurrentView(v);
          setActiveReportSession(null); // Dismount reports on nav clicks
        }} 
        theme={theme}
        onThemeChange={(t) => setTheme(t)}
      />

      {/* 2. Main Area Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 my-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeReportSession ? `report-${activeReportSession.id}` : currentView}
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 220, damping: 25 }}
          >
            {activeReportSession ? (
              /* Report HUD overrides active view temporarily for focused feedback */
              <ResultReportPanel 
                session={activeReportSession}
                folders={folders}
                originalText={lastOriginalText}
                typedText={lastTypedText}
                onClose={() => {
                  setActiveReportSession(null);
                  setCurrentView('folders');
                }}
                onRetry={() => {
                  const retryMode = activeReportSession.mode;
                  setActiveReportSession(null);
                  setCurrentView(retryMode === 'exam' ? 'exam' : 'learn');
                }}
              />
            ) : (
              /* Dynamic subviews renderer */
              <div id="dynamic-view-panel">
                {currentView === 'folders' && (
                  <FolderManager 
                    folders={folders}
                    methodologies={methodologies}
                    onAddMethodology={handleAddMethodology}
                    onEditMethodology={handleEditMethodology}
                    onDeleteMethodology={handleDeleteMethodology}
                    onAddFolder={handleAddFolder}
                    onSelectForTraining={handleSelectForTraining}
                    onRestoreDefaults={handleRestoreDefaults}
                  />
                )}

                {currentView === 'learn' && (
                  <LearningModePanel 
                    methodologies={methodologies}
                    selectedText={activePracticeText}
                    onSessionComplete={handleSessionComplete}
                    onEditMethodology={handleEditMethodology}
                  />
                )}

                {currentView === 'exam' && (
                  <ExamModePanel 
                    methodologies={methodologies}
                    selectedText={activePracticeText}
                    onSessionComplete={handleSessionComplete}
                  />
                )}

                {currentView === 'history' && (
                  <SajjelTaqaddomPanel 
                    sessions={sessions}
                    folders={folders}
                    onClearHistory={handleClearHistory}
                    onDeleteSession={handleDeleteSession}
                  />
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Footer */}
      <footer className="border-t border-slate-800/40 py-4 bg-slate-950/20 text-center text-[11px] text-slate-500 font-sans mt-8" id="system-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2.5 flex-row-reverse text-right">
          <p>جميع البيانات والمنهجيات والجلسات تُحفظ محلياً في متصفحك وآمنة 100%.</p>
          <div className="flex items-center gap-1.5 flex-row-reverse text-right">
            <span>دبي، دقة تتبع كامل للامتحان</span>
            <span>•</span>
            <span className="font-extrabold text-teal-400">TELC B2 Schreibe-Zertifikat</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
