/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Methodology, Session } from '../types';
import { 
  Play, RotateCcw, AlertTriangle, CheckCircle, Sparkles, 
  HelpCircle, Eye, EyeOff, Layout, ListCollapse, Timer, Keyboard
} from 'lucide-react';
import { calculateStats, maskText, getHint } from '../utils/textUtils';
import { METHODOLOGY_TRANSLATIONS, paraphraseContent } from '../utils/translationData';
import { Languages, Layers, Split } from 'lucide-react';
import { segmentAndTranslateLetter } from '../utils/topicSegmenter';
import { motion, AnimatePresence } from 'motion/react';

interface LearningModePanelProps {
  methodologies: Methodology[];
  selectedText: Methodology | null;
  onSessionComplete: (session: Omit<Session, 'id' | 'timestamp'>) => void;
  onEditMethodology?: (id: string, updates: Partial<Methodology>) => void;
}

export default function LearningModePanel({
  methodologies,
  selectedText,
  onSessionComplete,
  onEditMethodology,
}: LearningModePanelProps) {
  // Select active methodology
  const [activeText, setActiveText] = useState<Methodology | null>(selectedText || methodologies[0] || null);

  // States
  const [typedText, setTypedText] = useState('');
  const [isTraining, setIsTraining] = useState(false);
  const [showArabicTranslation, setShowArabicTranslation] = useState(false);
  const [showSectionSegmenter, setShowSectionSegmenter] = useState(false);
  const [paraphraseSeed, setParaphraseSeed] = useState(() => Math.floor(Math.random() * 100));

  // Word practice states
  const [isWordPracticeActive, setIsWordPracticeActive] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordInput, setWordInput] = useState('');
  const [completedWords, setCompletedWords] = useState<{ word: string; typed: string; isCorrect: boolean }[]>([]);
  const [wordErrors, setWordErrors] = useState(0);
  
  // Timer States
  const [timerOption, setTimerOption] = useState<'infinite' | '15' | '20' | '30'>('infinite'); // in minutes
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [timeElapsed, setTimeElapsed] = useState(0); // in seconds

  // Custom Controls
  const [showMethodology, setShowMethodology] = useState(true);
  const [displayMode, setDisplayMode] = useState<'full' | 'lineByLine'>('full');
  const [maskMode, setMaskMode] = useState<'none' | 'percent10' | 'percent25' | 'percent50' | 'sentenceHide'>('none');
  const [maskSeed, setMaskSeed] = useState(0);
  const [enableInteractiveGuide, setEnableInteractiveGuide] = useState(false);

  // Hint State
  const [hintText, setHintText] = useState('');
  const [showHintPulse, setShowHintPulse] = useState(false);

  // Active line calculation (for lineByLine)
  const [activeLineIndex, setActiveLineIndex] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Synchronize prop text selection
  useEffect(() => {
    if (selectedText) {
      setActiveText(selectedText);
      resetTraining();
    }
  }, [selectedText]);

  // Handle active methodology change
  useEffect(() => {
    resetTraining();
  }, [activeText]);

  // Countdown timer logic
  useEffect(() => {
    if (isTraining) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        if (timerOption !== 'infinite') {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              handleFinish();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTraining, timerOption]);

  const startTraining = () => {
    if (!resolvedText) return;
    setTypedText('');
    setTimeElapsed(0);
    if (timerOption !== 'infinite') {
      setTimeLeft(parseInt(timerOption) * 60);
    }
    setIsTraining(true);
    setActiveLineIndex(0);

    // Reset Word-by-word practice tracking states
    setCurrentWordIndex(0);
    setWordInput('');
    setCompletedWords([]);
    setWordErrors(0);

    setTimeout(() => {
      if (isWordPracticeActive) {
        document.getElementById('word-typing-input')?.focus();
      } else {
        textareaRef.current?.focus();
      }
    }, 100);
  };

  const resetTraining = () => {
    setIsTraining(false);
    setTypedText('');
    setTimeElapsed(0);
    setTimeLeft(timerOption !== 'infinite' ? parseInt(timerOption) * 60 : 0);
    setHintText('');
    setActiveLineIndex(0);

    // Reset Word practice states
    setCurrentWordIndex(0);
    setWordInput('');
    setCompletedWords([]);
    setWordErrors(0);
  };

  const handleFinish = () => {
    if (!resolvedText) return;
    setIsTraining(false);

    if (isWordPracticeActive) {
      const words = resolvedText.content.trim().split(/\s+/).filter(Boolean);
      const completedCount = completedWords.length;
      const correctCount = completedWords.filter(w => w.isCorrect).length;
      const totalChars = completedWords.reduce((sum, item) => sum + item.typed.length, 0);
      const accuracy = completedCount > 0 ? Math.round((correctCount / completedCount) * 100) : 100;
      const wpm = timeElapsed > 0 ? Math.round((totalChars / 5) / (timeElapsed / 60)) : 0;

      onSessionComplete({
        textId: resolvedText.id,
        textTitle: resolvedText.title,
        folderId: resolvedText.folderId,
        mode: 'learning',
        duration: timeElapsed,
        wpm: wpm,
        accuracy: accuracy,
        errors: wordErrors,
        wrongWords: completedWords.filter(w => !w.isCorrect).map(w => ({ original: w.word, typed: w.typed })),
        caseErrors: 0,
        puncErrors: 0,
        totalChars: totalChars,
      });
    } else {
      // Compute stats
      const stats = calculateStats(
        resolvedText.content,
        typedText,
        timeElapsed > 0 ? timeElapsed : 1
      );

      onSessionComplete({
        textId: resolvedText.id,
        textTitle: resolvedText.title,
        folderId: resolvedText.folderId,
        mode: 'learning',
        duration: timeElapsed,
        wpm: stats.wpm,
        accuracy: stats.accuracy,
        errors: stats.errors,
        wrongWords: stats.errors > 0 ? [{ original: 'مجموع الأخطاء', typed: `${stats.errors} خطأ` }] : [],
        caseErrors: stats.caseErrors,
        puncErrors: stats.puncErrors,
        totalChars: stats.totalChars,
      });
    }
  };

  // Get masked display text
  const resolvedText = activeText ? (methodologies.find(m => m.id === activeText.id) || activeText) : null;
  const originalLines = resolvedText ? resolvedText.content.split('\n') : [];
  const maskedContent = resolvedText 
    ? maskText(resolvedText.content, maskMode, maskSeed) 
    : '';
  const maskedLines = maskedContent.split('\n');

  // Trigger brief Hint display
  const triggerHint = () => {
    if (!resolvedText) return;
    const hint = getHint(resolvedText.content, typedText);
    setHintText(hint);
    setShowHintPulse(true);
    // Hides after 4 seconds
    setTimeout(() => {
      setShowHintPulse(false);
    }, 4000);
  };

  // Check line completeness based on word typing (for line-by-line mode)
  useEffect(() => {
    if (displayMode === 'lineByLine' && resolvedText && typedText) {
      const origWords = resolvedText.content.trim().split(/\s+/);
      const typedWords = typedText.trim().split(/\s+/);

      // Simple heuristic: map current typed length to lines
      let wordCursor = 0;
      let targetLine = 0;
      for (let i = 0; i < originalLines.length; i++) {
        const lineWordsCount = originalLines[i].split(/\s+/).filter(Boolean).length;
        wordCursor += lineWordsCount;
        if (typedWords.length >= wordCursor) {
          targetLine = i + 1;
        } else {
          break;
        }
      }
      setActiveLineIndex(Math.min(targetLine, originalLines.length - 1));
    }
  }, [typedText, displayMode, resolvedText]);

  // Helper to render letter-by-letter differences inside a mismatching completed word
  const renderCompletedWordDifference = (word: string, typed: string) => {
    const maxLen = Math.max(word.length, typed.length);
    const elements = [];
    for (let i = 0; i < maxLen; i++) {
      const originalChar = word[i];
      const typedChar = typed[i];
      
      if (originalChar === typedChar) {
        elements.push(
          <span key={i} className="text-emerald-400 font-bold">
            {originalChar}
          </span>
        );
      } else {
        elements.push(
          <span 
            key={i} 
            className="text-rose-500 font-extrabold bg-rose-500/10 border-b border-rose-500 px-[0.5px] rounded"
            title={`المتوقع: ${originalChar || '(فراغ)'} | كتبت: ${typedChar || '(لا شيء)'}`}
          >
            {typedChar || originalChar}
          </span>
        );
      }
    }
    return (
      <span className="inline-flex gap-[0.5px] bg-rose-500/5 border border-rose-500/20 px-1.5 py-0.5 rounded font-mono select-none" dir="ltr">
        {elements}
      </span>
    );
  };

  // Helper to render live active word spelling feedback
  const renderLiveWordComparison = (target: string, input: string) => {
    return (
      <div className="flex items-center gap-1 font-mono text-xl md:text-2xl tracking-wide justify-center py-3.5 bg-slate-950 border border-slate-900 rounded-2xl shadow-inner min-h-[64px] select-none" dir="ltr">
        {target.split('').map((char, idx) => {
          let color = "text-slate-600";
          if (idx < input.length) {
            color = input[idx] === char ? "text-emerald-400 font-bold" : "text-rose-500 font-extrabold bg-rose-500/20 border-b-2 border-rose-500 px-[2px] rounded";
          } else if (idx === input.length) {
            color = "text-amber-400 animate-pulse underline decoration-2 font-black";
          }
          return <span key={idx} className={`${color}`}>{char}</span>;
        })}
      </div>
    );
  };

  // Handler for active word submit on Enter key
  const handleWordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isTraining || !resolvedText) return;
    
    const words = resolvedText.content.trim().split(/\s+/).filter(Boolean);
    if (currentWordIndex >= words.length) return;

    const targetWord = words[currentWordIndex];
    const typedVal = wordInput.trim();
    if (!typedVal) return; // Ignore completely blank submits

    const isCorrect = typedVal === targetWord;

    const updatedCompleted = [...completedWords];
    updatedCompleted[currentWordIndex] = {
      word: targetWord,
      typed: typedVal,
      isCorrect,
    };
    setCompletedWords(updatedCompleted);

    let nextErrors = wordErrors;
    if (!isCorrect) {
      nextErrors = wordErrors + 1;
      setWordErrors(nextErrors);
    }

    const nextIndex = currentWordIndex + 1;
    setCurrentWordIndex(nextIndex);
    setWordInput('');

    // Reconstruct typed text for standard tracking
    const reconstructedTyped = updatedCompleted.map(w => w.typed).join(' ');
    setTypedText(reconstructedTyped);

    // If reached end of words, automatically finish!
    if (nextIndex >= words.length) {
      setIsTraining(false);
      const totalChars = updatedCompleted.reduce((sum, item) => sum + item.typed.length, 0);
      const accuracy = Math.round((updatedCompleted.filter(w => w.isCorrect).length / words.length) * 105); // cap 100 max
      const finalAccuracy = Math.min(100, accuracy);
      const wpm = timeElapsed > 0 ? Math.round((totalChars / 5) / (timeElapsed / 60)) : 0;

      onSessionComplete({
        textId: resolvedText.id,
        textTitle: resolvedText.title,
        folderId: resolvedText.folderId,
        mode: 'learning',
        duration: timeElapsed,
        wpm: wpm,
        accuracy: finalAccuracy,
        errors: nextErrors,
        wrongWords: updatedCompleted.filter(w => !w.isCorrect).map(w => ({ original: w.word, typed: w.typed })),
        caseErrors: 0,
        puncErrors: 0,
        totalChars: totalChars,
      });
    }
  };

  // Dynamic typing visualization stats
  const getWordByWordStats = () => {
    if (!resolvedText) return { wpm: 0, accuracy: 100, errors: 0 };
    const completedCount = completedWords.length;
    const correctCount = completedWords.filter(w => w.isCorrect).length;
    const accuracy = completedCount > 0 ? Math.round((correctCount / completedCount) * 100) : 100;
    const totalChars = completedWords.reduce((sum, item) => sum + item.typed.length, 0);
    const wpm = timeElapsed > 0 ? Math.round((totalChars / 5) / (timeElapsed / 60)) : 0;
    return { wpm, accuracy, errors: wordErrors };
  };

  const currentStats = isWordPracticeActive
    ? getWordByWordStats()
    : (resolvedText 
        ? calculateStats(resolvedText.content, typedText, timeElapsed > 0 ? timeElapsed : 1)
        : { wpm: 0, accuracy: 100, errors: 0 });

  // Timer label formatting
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rs = secs % 60;
    return `${mins}:${rs < 10 ? '0' : ''}${rs}`;
  };

  return (
    <div className="space-y-6" id="learning-panel-container">
      {/* Upper selector & text settings bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800" id="options-ribbon">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="text-xs font-bold text-slate-300 min-w-[120px] text-right">المنهجية النشطة:</label>
          <select
            id="text-selector-learn"
            value={activeText?.id || ''}
            onChange={(e) => {
              const text = methodologies.find(m => m.id === e.target.value);
              if (text) setActiveText(text);
            }}
            disabled={isTraining}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-teal-400 max-w-sm cursor-pointer"
          >
            {methodologies.map((m) => (
              <option key={m.id} value={m.id}>{m.title}</option>
            ))}
          </select>
        </div>

        {/* Options Row */}
        <div className="flex flex-wrap items-center gap-3" id="learning-controls">
          {/* Timer Selector */}
          <div className="flex items-center space-x-1.5 bg-slate-950/40 border border-slate-800 p-1 rounded-xl rtl:space-x-reverse">
            <span className="text-[10px] text-slate-400 font-bold px-1.5 flex items-center gap-1">
              <Timer className="h-3 w-3 text-teal-400" />
              <span>المؤقت:</span>
            </span>
            <button
              id="timer-inf"
              onClick={() => setTimerOption('infinite')}
              disabled={isTraining}
              className={`px-2 py-1 text-[10px] font-bold rounded-lg ${timerOption === 'infinite' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400 hover:text-slate-200'}`}
            >
              مستمر
            </button>
            <button
              id="timer-15"
              onClick={() => setTimerOption('15')}
              disabled={isTraining}
              className={`px-2 py-1 text-[10px] font-bold rounded-lg ${timerOption === '15' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400 hover:text-slate-200'}`}
            >
              15 د
            </button>
            <button
              id="timer-20"
              onClick={() => setTimerOption('20')}
              disabled={isTraining}
              className={`px-2 py-1 text-[10px] font-bold rounded-lg ${timerOption === '20' ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400 hover:text-slate-200'}`}
            >
              20 د
            </button>
          </div>

          {/* Visibility Switch */}
          <div className="flex items-center space-x-1.5 bg-slate-950/40 border border-slate-800 p-1 rounded-xl rtl:space-x-reverse">
            <button
              id="toggle-show-methodology"
              onClick={() => setShowMethodology(true)}
              className={`flex items-center gap-1 px-3 py-1 text-[10px] font-bold rounded-lg ${showMethodology ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Eye className="h-3 w-3" />
              <span>إظهار المنهجية</span>
            </button>
            <button
              id="toggle-hide-methodology"
              onClick={() => setShowMethodology(false)}
              className={`flex items-center gap-1 px-3 py-1 text-[10px] font-bold rounded-lg ${!showMethodology ? 'bg-teal-500 text-slate-950 font-black' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <EyeOff className="h-3 w-3" />
              <span>إخفاء المنهجية</span>
            </button>
          </div>

          {/* Display Mode */}
          <select
            id="display-mode-select"
            value={displayMode}
            onChange={(e) => setDisplayMode(e.target.value as 'full' | 'lineByLine')}
            disabled={isTraining || isWordPracticeActive}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-[10px] font-semibold rounded-xl px-2.5 py-1.5 cursor-pointer focus:ring-1 focus:ring-teal-400"
          >
            <option value="full">عرض النص بالكامل</option>
            <option value="lineByLine">عرض سطر بسطر (للتركيز)</option>
          </select>

          {/* Smart Masking Options */}
          <select
            id="masking-mode-select"
            value={maskMode}
            onChange={(e) => {
              setMaskMode(e.target.value as any);
              setMaskSeed(prev => prev + 1); // recalculate randoms
            }}
            disabled={isTraining || isWordPracticeActive}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-[10px] font-semibold rounded-xl px-2.5 py-1.5 cursor-pointer focus:ring-1 focus:ring-teal-400"
          >
            <option value="none">الحفظ الذكي: لا حجب</option>
            <option value="percent10">حجب جزء بسيط (10%)</option>
            <option value="percent25">حجب متوسط (25%)</option>
            <option value="percent50">حجب مكثف (50%)</option>
            <option value="sentenceHide">إخفاء جمل كاملة عشوائياً</option>
          </select>

          {/* Word practicing mode switcher */}
          <button
            id="btn-toggle-word-practice-mode"
            onClick={() => {
              setIsWordPracticeActive(prev => !prev);
              resetTraining();
            }}
            disabled={isTraining}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold rounded-lg border transition ${
              isWordPracticeActive 
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-lg' 
                : 'bg-slate-800 text-slate-350 border-slate-700 hover:bg-slate-700 hover:text-slate-100'
            }`}
            title="التدريب التفاعلي المتزامن كلمة بكلمة مع كشف الأخطاء الإملائية بالأحمر"
          >
            <Keyboard className="h-3.5 w-3.5" />
            <span>تمرين الكلمات كلمة بكلمة: {isWordPracticeActive ? 'مفعّل ✅' : 'مغلق ❌'}</span>
          </button>
        </div>
      </div>

      {activeText ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Workspace (Top reference block + Bottom direct input sandbox) */}
          <div className="lg:col-span-2 space-y-6">
            {isWordPracticeActive ? (
              <div className="space-y-6">
                {!isTraining ? (
                  <motion.div 
                    key="word-ready-state"
                    initial={{ opacity: 0, scale: 0.96, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="bg-gradient-to-br from-amber-500/5 to-slate-900/60 p-8 rounded-2xl border border-amber-500/10 space-y-4 text-right"
                    dir="rtl"
                  >
                    <div className="flex items-center gap-2 justify-end text-amber-400">
                      <h3 className="font-extrabold text-sm md:text-base">تحدي كتابة الكلمات التفاعلي البطيء (Word-by-Word Practice)</h3>
                      <Keyboard className="h-5 w-5 animate-bounce" />
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      هذا النمط يساعدك على تتبع الكلمات بدقة بالغة. تظهر أمامك الكلمة وموضع تتبع الحروف، اكتب الكلمة حرفًا بحرف واضغط <kbd className="bg-slate-950 px-1.5 py-0.5 rounded text-amber-305 font-mono">Enter</kbd> للمطابقة الفورية.
                    </p>
                    <div className="p-4 bg-slate-950/70 border border-slate-900 rounded-2xl text-left font-mono text-sm leading-relaxed max-h-[140px] overflow-y-auto" dir="ltr">
                      <span className="text-[10px] text-slate-500 block mb-1 text-right" dir="rtl">النص الأصلي بالكامل الذي ستتدرب عليه:</span>
                      <div className="text-slate-400 text-xs text-left whitespace-pre-wrap select-all selection:bg-teal-500/30 font-sans">
                        {resolvedText?.content}
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <motion.button
                        id="btn-start-word-practice-direct"
                        onClick={startTraining}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/10 flex items-center gap-1.5"
                      >
                        <Play className="h-4.5 w-4.5" />
                        <span>ابدأ تمرين الكلمات الآن</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 animate-fade-in" id="word-practice-board">
                    {/* Headings & Word Completion Summary */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-amber-500/10 text-amber-400 font-bold px-2 py-0.5 rounded-md border border-amber-500/15">
                          تمرين كتابة الكلمات نشط ✍️
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-medium">
                        الكلمة <span className="font-bold font-mono text-amber-400">{currentWordIndex + 1}</span> من <span className="font-bold font-mono text-slate-200">{resolvedText?.content.trim().split(/\s+/).filter(Boolean).length}</span>
                      </div>
                    </div>

                    {/* Live Lookahead / Expected Word Display */}
                    <div className="space-y-1">
                      <span className="text-[10.5px] font-bold text-slate-400 block text-left uppercase tracking-wider">الكلمة الحالية لتكتبها (Current Word):</span>
                      {(() => {
                        const words = resolvedText?.content.trim().split(/\s+/).filter(Boolean) || [];
                        const targetWord = words[currentWordIndex] || "";
                        return renderLiveWordComparison(targetWord, wordInput);
                      })()}
                    </div>

                    {/* Input Form for typing the active word */}
                    <form onSubmit={handleWordSubmit} className="space-y-2">
                      <label htmlFor="word-typing-input" className="text-xs font-bold text-slate-350 block text-right">
                        اكتب الكلمة أعلاه ثم اضغط على زر <kbd className="bg-slate-950 px-1.5 py-0.5 rounded text-amber-300 font-mono">Enter</kbd>:
                      </label>
                      <div className="relative">
                        <input
                          id="word-typing-input"
                          type="text"
                          value={wordInput}
                          onChange={(e) => setWordInput(e.target.value)}
                          dir="ltr"
                          placeholder="اكتب هنا..."
                          className="w-full font-mono text-xl px-5 py-3.5 rounded-2xl bg-slate-950 border-2 border-amber-500/40 text-slate-100 outline-none focus:border-amber-400 text-center tracking-wide transition shadow-inner"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                        />
                      </div>
                    </form>

                    {/* Entire Methodology Words - Flowing Inline Grid with Scroll */}
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10.5px] font-bold text-slate-400 block text-right">تتبع النص الكامل للمنهجية:</span>
                      <div 
                        className="p-4 bg-slate-950/70 border border-slate-900 rounded-2xl max-h-[170px] overflow-y-auto select-none flex flex-wrap gap-x-2.5 gap-y-1.5 font-sans leading-relaxed text-sm scrollbar-thin shadow-inner" 
                        dir="ltr"
                      >
                        {(resolvedText?.content || '').trim().split(/\s+/).filter(Boolean).map((word, idx) => {
                          let style = "text-slate-500 opacity-50";
                          let element: React.ReactNode = word;

                          if (idx < currentWordIndex) {
                            const comp = completedWords[idx];
                            if (comp) {
                              if (comp.isCorrect) {
                                style = "text-emerald-400 font-bold bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/20";
                              } else {
                                style = "";
                                element = renderCompletedWordDifference(word, comp.typed);
                              }
                            }
                          } else if (idx === currentWordIndex) {
                            style = "bg-amber-500/20 text-amber-300 font-extrabold px-2.5 py-0.5 rounded-lg border-2 border-amber-500 shadow shadow-amber-500/10 scale-105 animate-pulse";
                          }

                          return (
                            <span key={idx} className={`${style} transition-all duration-100`}>
                              {element}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom Control Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <motion.button
                        id="btn-word-quit-direct"
                        onClick={resetTraining}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-850 transition flex items-center gap-1"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>إعادة ضبط</span>
                      </motion.button>
                      
                      <motion.button
                        id="btn-word-finish-direct"
                        onClick={handleFinish}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="px-5 py-2 text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-slate-955 rounded-xl transition shadow-lg shadow-emerald-500/10 flex items-center gap-1"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span>إنهاء واحتساب النتيجة</span>
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
            
            {/* REFERENCE TEXT DISPLAY (THE TOP SECTION) */}
            <div 
              id="reference-panel"
              className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-6 relative min-h-[180px] overflow-hidden"
            >
              {/* Blur screen when user selected "Hide methodology during typing" */}
              {!showMethodology && isTraining && (
                <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center z-10 transition animate-fade-in">
                  <EyeOff className="h-8 w-8 text-teal-400 mb-2 animate-bounce" />
                  <span className="text-sm font-bold text-slate-200">المنهجية مخفية الآن لمساعدتك على التذكر</span>
                  <p className="text-xs text-slate-400 max-w-sm mt-1">
                    أكتب النص عن ظهر قلب بالأسفل، أو اضغط زر <span className="font-bold text-teal-400">"تلميح"</span> لتذكر الكلمة التالية.
                  </p>
                </div>
              )}

              {/* Paraphrase success notification banner */}
              <div 
                id="paraphrase-notification" 
                className="absolute top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl border border-emerald-400 shadow-xl pointer-events-none opacity-0 transition-opacity duration-300 z-30 flex items-center gap-2"
              >
                <Sparkles className="h-3.5 w-3.5 animate-spin" />
                <span>تم إعادة صياغة المنهجية بنجاح! جاهزة الآن للتدرب والامتحان.</span>
              </div>

              {/* Reference Header Panel */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/40 pb-3 mb-4 flex-row-reverse">
                <div className="flex items-center gap-2 flex-row-reverse">
                  <span className="text-xs font-bold text-slate-300">النموذج الأصلي (Original Template)</span>
                  {isTraining && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-400 font-bold border border-teal-500/10 animate-pulse">
                      جاري التدريب
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 flex-row-reverse">
                  {/* Segmenter Button */}
                  <button
                    id="btn-toggle-segmenter"
                    onClick={() => {
                      setShowSectionSegmenter(prev => !prev);
                      setShowArabicTranslation(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg border transition ${
                      showSectionSegmenter 
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/30' 
                        : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700'
                    }`}
                  >
                    <Layers className="h-3.5 w-3.5 text-teal-450" />
                    <span>{showSectionSegmenter ? 'إخفاء التقسيم الذكي' : 'مُفكّك الأقسام التفاعلي (Kopf/Einleitung...)'}</span>
                  </button>

                  {/* Translate Button */}
                  <button
                    id="btn-toggle-translation"
                    onClick={() => {
                      setShowArabicTranslation(prev => !prev);
                      setShowSectionSegmenter(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg border transition ${
                      showArabicTranslation 
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
                        : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700'
                    }`}
                  >
                    <Languages className="h-3.5 w-3.5 text-amber-400" />
                    <span>{showArabicTranslation ? 'إخفاء الترجمة' : 'ترجمة المنهجية للعربية'}</span>
                  </button>
                </div>
              </div>

              {/* Renders Reference text appropriately based on layout and translation selection */}
              {showSectionSegmenter && resolvedText ? (() => {
                const segmented = segmentAndTranslateLetter(resolvedText.id, resolvedText.content);
                return (
                  <div className="space-y-6 animate-fade-in text-right" dir="rtl" id="visual-segmenter-panel">
                    <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3">
                      <div className="space-y-1 text-right">
                        <span className="text-[10px] uppercase font-black text-teal-400 tracking-wider">مُحلِّل البنية الألمانية الذكي</span>
                        <h4 className="text-xs font-bold text-slate-200">التقسيم المنهجي المعتمد للامتحان (Kopf, Einleitung, Hauptteil, Schluss)</h4>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[10px] font-black">
                        <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/15">الرأس: Kopf</span>
                        <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/15">المقدمة: 3 عبارات</span>
                        <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/15">العرض: 3 نقاط</span>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/15">الخاتمة: مطالب</span>
                      </div>
                    </div>

                    {/* Section 1: Kopf */}
                    <div className="p-4 rounded-2xl border bg-slate-950/20 border-cyan-500/15 space-y-3 text-right">
                      <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2">
                        <span className="text-xs font-black text-cyan-400 flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                          {segmented.kopf.titleAr}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500" dir="ltr">{segmented.kopf.titleDe}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <pre className="p-4 rounded-xl bg-slate-950/80 font-mono text-[11px] leading-relaxed text-cyan-300 text-left overflow-x-auto whitespace-pre-wrap select-none" dir="ltr">
                          {segmented.kopf.germanText}
                        </pre>
                        <div className="p-4 rounded-xl bg-slate-900/30 text-xs text-slate-300 leading-normal space-y-2 font-sans whitespace-pre-wrap text-right">
                          {segmented.kopf.arabicText}
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Einleitung */}
                    <div className="p-4 rounded-2xl border bg-slate-950/20 border-purple-500/15 space-y-3 text-right">
                      <div className="flex items-center justify-between border-b border-purple-500/10 pb-2">
                        <span className="text-xs font-black text-purple-300 flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-purple-450 animate-pulse"></span>
                          {segmented.einleitung.titleAr}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500" dir="ltr">{segmented.einleitung.titleDe}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 text-right">{segmented.einleitung.arabicText}</p>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {segmented.einleitung.itemBadges?.map((item, idx) => (
                          <div key={idx} className={`p-4 rounded-xl border ${item.subColor} transition-all text-right`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-black underline decoration-purple-500/35">{item.text}</span>
                              <span className="text-[9px] px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 font-mono border border-purple-500/10">Satz {idx+1}</span>
                            </div>
                            <p className="text-xs text-slate-200 font-sans leading-relaxed text-right">{item.arabic}</p>
                            <p className="text-[11.5px] text-purple-300 font-mono mt-2 select-none leading-relaxed text-left" dir="ltr">{item.german}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 3: Hauptteil */}
                    <div className="p-4 rounded-2xl border bg-slate-950/20 border-amber-500/15 space-y-3 text-right">
                      <div className="flex items-center justify-between border-b border-amber-500/10 pb-2">
                        <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
                          {segmented.hauptteil.titleAr}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500" dir="ltr">{segmented.hauptteil.titleDe}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 text-right">{segmented.hauptteil.arabicText}</p>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {segmented.hauptteil.itemBadges?.map((item, idx) => (
                          <div key={idx} className={`p-4 rounded-xl border ${item.subColor} transition-all text-right`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-black underline decoration-amber-500/35">{item.text}</span>
                              <span className="text-[9px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 font-mono border border-amber-500/10">Punkt {idx+1}</span>
                            </div>
                            <p className="text-xs text-slate-200 font-sans leading-relaxed text-right">{item.arabic}</p>
                            <p className="text-[11.5px] text-amber-300 font-mono mt-2 select-none leading-relaxed text-left" dir="ltr">{item.german}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 4: Schluss */}
                    <div className="p-4 rounded-2xl border bg-slate-950/20 border-emerald-500/15 space-y-3 text-right">
                      <div className="flex items-center justify-between border-b border-emerald-500/10 pb-2">
                        <span className="text-xs font-black text-emerald-350 flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          {segmented.schluss.titleAr}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500" dir="ltr">{segmented.schluss.titleDe}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 text-right">{segmented.schluss.arabicText}</p>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {segmented.schluss.itemBadges?.map((item, idx) => (
                          <div key={idx} className={`p-4 rounded-xl border ${item.subColor} transition-all text-right`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-black underline decoration-emerald-500/35">{item.text}</span>
                              <span className="text-[9px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 font-mono border border-emerald-500/10">Satz {idx+1}</span>
                            </div>
                            <p className="text-xs text-slate-200 font-sans leading-relaxed text-right">{item.arabic}</p>
                            <p className="text-[11.5px] text-emerald-300 font-mono mt-2 select-none leading-relaxed text-left" dir="ltr">{item.german}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 5: Gruss */}
                    <div className="p-4 rounded-2xl border bg-slate-950/25 border-slate-700/40 space-y-3 text-right">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs font-black text-slate-400 flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                          {segmented.gruss.titleAr}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500" dir="ltr">{segmented.gruss.titleDe}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <pre className="p-4 rounded-xl bg-slate-950/80 font-mono text-[11px] text-slate-300 text-left overflow-x-auto whitespace-pre-wrap select-none" dir="ltr">
                          {segmented.gruss.germanText}
                        </pre>
                        <div className="p-4 rounded-xl bg-slate-900/30 text-xs text-slate-400 leading-relaxed font-sans whitespace-pre-wrap text-right">
                          {segmented.gruss.arabicText}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })() : showArabicTranslation && resolvedText && METHODOLOGY_TRANSLATIONS[resolvedText.id] ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="split-translation-container">
                  {/* German Column (left, ltr) */}
                  <div className="space-y-4 animate-fade-in" dir="ltr">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider border-b border-slate-800 pb-1 text-left">Deutscher Text (German)</h4>
                    <div className="text-left font-sans select-none leading-relaxed text-slate-300 text-sm break-words whitespace-pre-wrap">
                      {displayMode === 'lineByLine' ? (
                        <div className="space-y-2">
                          {originalLines.map((line, index) => {
                            const isActive = index === activeLineIndex;
                            if (!isActive && isTraining) return null;
                            return (
                              <div 
                                key={index} 
                                className={`p-2 rounded-lg transition ${
                                  isActive ? 'bg-teal-500/10 text-teal-350 border border-teal-500/15 font-bold' : 'text-slate-500 opacity-60'
                                }`}
                              >
                                {maskMode === 'none' ? line : maskedLines[index]}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="font-sans">
                          {maskMode === 'none' ? resolvedText.content : maskedContent}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Arabic Translation Column (right, rtl) */}
                  <div className="space-y-4 border-r border-slate-800 pr-4 md:pr-6 animate-fade-in" dir="rtl">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider border-b border-slate-800 pb-1 text-right">الترجمة السطرية الرسمية (Arabic Translation)</h4>
                    <div className="space-y-3.5 text-right">
                      {METHODOLOGY_TRANSLATIONS[resolvedText.id].map((block, idx) => (
                        <div key={idx} className="bg-slate-950/40 p-3 rounded-xl border border-slate-850 hover:border-amber-500/25 transition-all">
                          <span className="text-[9px] font-bold text-amber-400 block mb-1">{block.title}</span>
                          <p className="text-xs text-slate-300 leading-normal font-sans">{block.arabic}</p>
                          <p className="text-[9.5px] text-slate-500 font-mono tracking-tight mt-1.5" dir="ltr">{block.german}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Standard Full German View (rendered when translation is off) */
                <div 
                  className="text-left font-sans select-none leading-relaxed text-slate-300 prose prose-invert max-w-none text-sm break-words whitespace-pre-wrap animate-fade-in"
                  dir="ltr"
                >
                  {displayMode === 'lineByLine' ? (
                    <div className="space-y-2">
                      {originalLines.map((line, index) => {
                        const isActive = index === activeLineIndex;
                        if (!isActive && isTraining) return null; // Show only active target line under line-by-line in training
                        return (
                          <div 
                            key={index} 
                            className={`p-2 rounded-lg transition ${
                              isActive ? 'bg-teal-500/10 text-teal-350 border border-teal-500/15 font-bold' : 'text-slate-500 opacity-60'
                            }`}
                          >
                            {maskMode === 'none' ? line : maskedLines[index]}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="font-sans animate-fade-in">
                      {maskMode === 'none' ? resolvedText?.content : maskedContent}
                    </div>
                  )}

                  {showArabicTranslation && resolvedText && !METHODOLOGY_TRANSLATIONS[resolvedText.id] && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl mt-4 text-amber-400 text-xs text-right" dir="rtl">
                      الترجمة السطرية الكاملة لهذه المنهجية المفتوحة أو المخصصة غير متوفرة بشكل مدمج، ولكن يمكنك دراسة نصها مباشرة.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* TYPING INPUT BOX (THE CORE PRACTICE SANDBOX) */}
            <div className="space-y-3" id="typing-box-container">
              <AnimatePresence mode="wait">
                {!isTraining ? (
                  <motion.div 
                    key="ready-state"
                    initial={{ opacity: 0, scale: 0.96, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -15 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                    className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-2xl"
                  >
                    <Keyboard className="h-10 w-10 text-slate-500 mx-auto mb-3 animate-pulse" />
                    <h3 className="font-bold text-slate-200">جاهز لبدء جلسة الحفظ؟</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-5">
                      الآن سيُعرض النص أعلاه، اكتبه بدقة في صندوق الكتابة لتقييم رتمك وهجاءك مباشرة.
                    </p>
                    <motion.button
                      id="btn-start-training"
                      onClick={startTraining}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 font-semibold bg-gradient-to-r from-teal-400 to-emerald-600 text-slate-950 font-black rounded-xl shadow-lg shadow-teal-500/20 hover:brightness-110 transition flex items-center gap-2 mx-auto"
                    >
                      <Play className="h-4.5 w-4.5" />
                      <span>ابدأ التدريب الآن</span>
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="training-state"
                    initial={{ opacity: 0, scale: 0.98, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -15 }}
                    transition={{ type: 'spring', stiffness: 245, damping: 23 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <motion.button
                          id="btn-hint"
                          onClick={triggerHint}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          className="px-3 py-1.5 text-xs font-semibold bg-slate-800 border border-slate-700 hover:bg-slate-700 text-teal-400 rounded-lg transition flex items-center gap-1 shadow-sm"
                          title="يعرض أول 3 كلمات من الموضع الحالي ليساعدك على المواصلة"
                        >
                          <HelpCircle className="h-3.5 w-3.5" />
                          <span>طلب تلميح (Hint)</span>
                        </motion.button>

                        <motion.button
                          id="btn-toggle-interactive-guide"
                          onClick={() => setEnableInteractiveGuide(prev => !prev)}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          className={`px-3 py-1.5 text-xs font-semibold border rounded-lg transition flex items-center gap-1 shadow-sm ${
                            enableInteractiveGuide 
                              ? 'bg-teal-500/20 text-teal-300 border-teal-500 hover:bg-teal-500/30 font-bold' 
                              : 'bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300'
                          }`}
                          title="تفعيل الموجه الحرفي التفاعلي لمطابقة وتتبع الحروف والكلمات بدقة أثناء الكتابة"
                        >
                          <Keyboard className="h-3.5 w-3.5" />
                          <span>مرشد الحروف والكلمات: {enableInteractiveGuide ? 'مفعّل ✅' : 'مغلق ❌'}</span>
                        </motion.button>

                        {/* Display Hint Tooltip */}
                        <AnimatePresence>
                          {showHintPulse && hintText && (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0 }}
                              className="bg-teal-500 text-slate-950 text-xs font-black px-3 py-1.5 rounded-lg font-sans border border-teal-400 shadow-lg flex items-center gap-1"
                              dir="ltr"
                            >
                              <Sparkles className="h-3 w-3" />
                              <span>{hintText}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        {timerOption !== 'infinite' && (
                          <span className="font-mono bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 text-teal-400 font-black">
                            المتبقي: {formatTime(timeLeft)}
                          </span>
                        )}
                        <span className="font-mono bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 text-slate-450">
                          مستغرق: {formatTime(timeElapsed)}
                        </span>
                      </div>
                    </div>

                    {/* Interactive Real-time character visualizer */}
                    {enableInteractiveGuide && resolvedText && (
                      <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-2xl text-left font-mono text-sm leading-relaxed max-h-[220px] overflow-y-auto select-none space-y-1 scrollbar-thin shadow-inner animate-fade-in mb-2" dir="ltr" id="interactive-character-visualizer">
                        <div className="flex items-center justify-between border-b border-slate-900 pb-1.5 mb-2 flex-row-reverse" dir="rtl">
                          <span className="text-[10px] bg-teal-500/10 text-teal-400 font-bold px-2 py-0.5 rounded-md border border-teal-500/10 flex items-center gap-1">
                            <Sparkles className="h-3 w-3 animate-pulse text-teal-400" />
                            <span>دليل الكتابة الحرفية نشط - تتبع الكلمات بدقة</span>
                          </span>
                          <span className="text-[10px] text-slate-400">
                            اكتب في الصندوق بالأسفل (الخطأ يظهر <span className="text-rose-500 font-bold decoration-rose-500">بالأحمر</span>)
                          </span>
                        </div>
                        <div className="whitespace-pre-wrap select-none text-[13px] tracking-wide break-words leading-relaxed font-sans">
                          {resolvedText.content.split('').map((char, index) => {
                            let charStyle = "text-slate-500/90"; // default untyped
                            let cursorStyle = "";
                            
                            if (index < typedText.length) {
                              const typedChar = typedText[index];
                              if (typedChar === char) {
                                charStyle = "text-emerald-400 font-bold bg-emerald-500/5"; // correct
                              } else {
                                charStyle = "text-rose-500 font-extrabold bg-rose-500/20 border-b border-rose-500 px-[1px] rounded"; // incorrect
                              }
                            } else if (index === typedText.length) {
                              // Active cursor position
                              cursorStyle = "bg-teal-500/30 text-teal-300 font-extrabold border-b border-teal-400 animate-pulse rounded px-[1px]";
                            }
                            
                            // Render newline nicely
                            if (char === '\n') {
                              return (
                                <span key={index} className={cursorStyle}>
                                  <br />
                                </span>
                              );
                            }
                            
                            return (
                              <span 
                                key={index} 
                                className={`${charStyle} ${cursorStyle} transition-all duration-75`}
                              >
                                {char}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="relative">
                      <textarea
                        ref={textareaRef}
                        id="typing-textarea"
                        rows={12}
                        value={typedText}
                        onChange={(e) => setTypedText(e.target.value)}
                        dir="ltr"
                        placeholder="ابدأ بكتابة المنهجية الألمانية هنا حرفياً..."
                        className="w-full font-sans text-[14px] px-5 py-4 rounded-2xl bg-slate-950 border-2 border-slate-800 text-slate-100 outline-none focus:border-teal-400 leading-relaxed placeholder-slate-650 transition duration-150-ease-out"
                      />
                    </div>

                    {/* Character-by-character real-time feedback */}
                    <div className="flex items-center justify-between pt-1">
                      <motion.button
                        id="btn-quit-training"
                        onClick={resetTraining}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition flex items-center gap-1"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>إعادة ضبط</span>
                      </motion.button>
                      
                      <motion.button
                        id="btn-finish-training"
                        onClick={handleFinish}
                        whileHover={{ scale: 1.04, y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        className="px-5 py-2 text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl transition shadow-lg shadow-emerald-500/10 flex items-center gap-1"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span>إنهاء واحتساب النتيجة</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

          {/* Right Column: Realtime Stats & Assist Blocks */}
          <div className="space-y-6 col-span-1" id="realtime-stats-sidebar">
            
            {/* Live Typing Stats Panel */}
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-5 space-y-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block border-b border-slate-850 pb-2 text-right">مؤشرات الأداء الحالية</span>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/60 text-center">
                  <span className="text-[10px] text-slate-500 font-bold block mb-1">السرعة (WPM)</span>
                  <span className="text-2xl font-black font-mono text-teal-400 tracking-tight">
                    {currentStats.wpm}
                  </span>
                </div>
                
                <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/60 text-center">
                  <span className="text-[10px] text-slate-500 font-bold block mb-1">نسبة الدقة</span>
                  <span className="text-2xl font-black font-mono text-teal-400 tracking-tight">
                    {typedText ? `${currentStats.accuracy}%` : '--'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs flex-row-reverse border-b border-slate-850 pb-2">
                  <span className="text-slate-400">الحروف المكتوبة:</span>
                  <span className="font-mono font-bold text-slate-200">{typedText.length}</span>
                </div>

                <div className="flex justify-between items-center text-xs flex-row-reverse border-b border-slate-850 pb-2">
                  <span className="text-slate-400">صيغة لوحة المفاتيح:</span>
                  <span className="font-bold text-slate-200 text-[10px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700">AZERTY / QWERTZ مدعوم</span>
                </div>

                <div className="flex justify-between items-center text-xs flex-row-reverse">
                  <span className="text-slate-400">مستوى إتقانك الأعلى:</span>
                  <span className="font-bold text-teal-400 font-mono">
                    {activeText.mastery ? `${activeText.mastery}%` : 'لا توجد جلسة سابقة'}
                  </span>
                </div>
              </div>
            </div>

            {/* German TELC Key Rules Helper Card */}
            <div className="bg-gradient-to-br from-teal-500/10 to-emerald-500/5 rounded-2xl border border-teal-500/10 p-5 space-y-3">
              <h4 className="text-xs font-extrabold text-teal-400 flex items-center justify-end gap-1 flex-row-reverse">
                <Sparkles className="h-3.5 w-3.5" />
                <span>نصائح تدريبية لـ TELC B2</span>
              </h4>
              <ul className="text-[10.5px] text-slate-300 space-y-2 text-right list-inside list-disc">
                <li><strong className="text-teal-300">علامات الترقيم:</strong> تذكر وضع فاصلة <strong className="font-mono text-slate-200">","</strong> قبل الكلمات الرابطة مثل (dass, weil, wenn, da).</li>
                <li><strong className="text-teal-300">الأحرف الكبيرة:</strong> في الألمانية، يتم دائماً بدء الأسماء (Nomen) بحرف كبير، وليس فقط ببداية الجملة!</li>
                <li><strong className="text-teal-300">صندوق الحفظ:</strong> استخدم ميزة <strong className="text-teal-300">"إخفاء المنهجية"</strong> لتدريب ذاكرتك تدريجياً، ثم تحول لوضع الامتحان.</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-slate-900/10 border border-slate-800 rounded-xl" id="no-texts-warning">
          <p className="text-xs text-slate-400">لم يتم العثور على أي نصوص منهجيات مضافة حالياً.</p>
        </div>
      )}
    </div>
  );
}
