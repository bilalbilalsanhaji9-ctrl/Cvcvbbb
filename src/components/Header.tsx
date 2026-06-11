/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, BookOpen, Layers, BarChart2, Keyboard, Settings, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentView: 'learn' | 'exam' | 'folders' | 'history';
  onViewChange: (view: 'learn' | 'exam' | 'folders' | 'history') => void;
  theme: 'dark' | 'light' | 'emerald';
  onThemeChange: (theme: 'dark' | 'light' | 'emerald') => void;
}

export default function Header({ currentView, onViewChange, theme, onThemeChange }: HeaderProps) {
  return (
    <header className="border-b border-slate-700/50 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse" id="logo-container">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-400 to-emerald-600 shadow-lg shadow-teal-500/20">
              <Keyboard className="h-5.5 w-5.5 text-slate-950 font-bold animate-pulse" />
            </div>
            <div>
              <span className="font-sans text-xl font-black tracking-tighter text-white flex items-center gap-1.5">
                TELC<span className="text-teal-400 font-black">MEMO</span><span className="text-slate-400 text-sm font-medium tracking-normal">rizer</span>
              </span>
              <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-slate-400">محفظ منهجيات ومُدرّب الكتابة B2</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-1 sm:space-x-2 rtl:space-x-reverse" id="main-navigation">
            <button
              id="nav-folders"
              onClick={() => onViewChange('folders')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-black transition-all duration-200 ${
                currentView === 'folders'
                  ? 'bg-teal-500 text-slate-950 font-black shadow-lg shadow-teal-500/15'
                  : 'text-slate-300 hover:bg-slate-855 hover:text-white'
              }`}
            >
              <Layers className="h-4 w-4" />
              <span className="hidden sm:inline">المنهجيات والمجلدات</span>
            </button>

            <button
              id="nav-learn"
              onClick={() => onViewChange('learn')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-black transition-all duration-200 ${
                currentView === 'learn'
                  ? 'bg-teal-500 text-slate-950 font-black shadow-lg shadow-teal-500/15'
                  : 'text-slate-300 hover:bg-slate-855 hover:text-white'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>وضع الحفظ</span>
            </button>

            <button
              id="nav-exam"
              onClick={() => onViewChange('exam')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-black transition-all duration-200 ${
                currentView === 'exam'
                  ? 'bg-teal-500 text-slate-950 font-black shadow-lg shadow-teal-500/15'
                  : 'text-slate-300 hover:bg-slate-855 hover:text-white'
              }`}
            >
              <Award className="h-4 w-4" />
              <span>وضع الامتحان</span>
            </button>

            <button
              id="nav-history"
              onClick={() => onViewChange('history')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-black transition-all duration-200 ${
                currentView === 'history'
                  ? 'bg-teal-500 text-slate-950 font-black shadow-lg shadow-teal-500/15'
                  : 'text-slate-300 hover:bg-slate-855 hover:text-white'
              }`}
            >
              <BarChart2 className="h-4 w-4" />
              <span className="hidden sm:inline">سجل التقدم</span>
              <span className="sm:hidden">الإحصائيات</span>
            </button>
          </nav>

          {/* Theme Switcher */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse" id="theme-selectors">
            <div className="hidden lg:flex items-center space-x-1 border border-slate-800 rounded-full px-2 py-1 bg-slate-950/40 text-xs text-slate-400 gap-1 rtl:space-x-reverse">
              <Sparkles className="h-3.5 w-3.5 text-teal-400" />
              <span>TELC B2 دقة 100%</span>
            </div>

            <select
              id="theme-select"
              value={theme}
              onChange={(e) => onThemeChange(e.target.value as 'dark' | 'light' | 'emerald')}
              className="bg-slate-900 border border-slate-850 text-slate-200 text-xs rounded-xl px-2.5 py-1.5 font-bold outline-none focus:ring-1 focus:ring-teal-400 cursor-pointer"
            >
              <option value="dark">🌑 مظلم (Default)</option>
              <option value="light">☀️ مضيء (Light)</option>
              <option value="emerald">🟢 غابات (Emerald)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
