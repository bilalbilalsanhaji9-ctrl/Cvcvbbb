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
import { motion, AnimatePresence } from 'motion/react';

interface LearningModePanelProps {
  methodologies: Methodology[];
  selectedText: Methodology | null;
  onSessionComplete: (session: Omit<Session, 'id' | 'timestamp'>) => void;
}

export default function LearningModePanel({
  methodologies,
  selectedText,
  onSessionComplete,
}: LearningModePanelProps) {
  // Select active methodology
  const [activeText, setActiveText] = useState<Methodology | null>(selectedText || methodologies[0] || null);

  // States
  const [typedText, setTypedText] = useState('');
  const [isTraining, setIsTraining] = useState(false);
  
  // Timer States
  const [timerOption, setTimerOption] = useState<'infinite' | '15' | '20' | '30'>('infinite'); // in minutes
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [timeElapsed, setTimeElapsed] = useState(0); // in seconds

  // Custom Controls
  const [showMethodology, setShowMethodology] = useState(true);
  const [displayMode, setDisplayMode] = useState<'full' | 'lineByLine'>('full');
  const [maskMode, setMaskMode] = useState<'none' | 'percent10' | 'percent25' | 'percent50' | 'sentenceHide'>('none');
  const [maskSeed, setMaskSeed] = useState(0);

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
    if (!activeText) return;
    setTypedText('');
    setTimeElapsed(0);
    if (timerOption !== 'infinite') {
      setTimeLeft(parseInt(timerOption) * 60);
    }
    setIsTraining(true);
    setActiveLineIndex(0);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  const resetTraining = () => {
    setIsTraining(false);
    setTypedText('');
    setTimeElapsed(0);
    setTimeLeft(timerOption !== 'infinite' ? parseInt(timerOption) * 60 : 0);
    setHintText('');
    setActiveLineIndex(0);
  };

  const handleFinish = () => {
    if (!activeText) return;
    setIsTraining(false);

    // Compute stats
    const stats = calculateStats(
      activeText.content,
      typedText,
      timeElapsed > 0 ? timeElapsed : 1
    );

    onSessionComplete({
      textId: activeText.id,
      textTitle: activeText.title,
      folderId: activeText.folderId,
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
  };

  // Get masked display text
  const originalLines = activeText ? activeText.content.split('\n') : [];
  const maskedContent = activeText 
    ? maskText(activeText.content, maskMode, maskSeed) 
    : '';
  const maskedLines = maskedContent.split('\n');

  // Trigger brief Hint display
  const triggerHint = () => {
    if (!activeText) return;
    const hint = getHint(activeText.content, typedText);
    setHintText(hint);
    setShowHintPulse(true);
    // Hides after 4 seconds
    setTimeout(() => {
      setShowHintPulse(false);
    }, 4000);
  };

  // Check line completeness based on word typing (for line-by-line mode)
  useEffect(() => {
    if (displayMode === 'lineByLine' && activeText && typedText) {
      const origWords = activeText.content.trim().split(/\s+/);
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
  }, [typedText, displayMode, activeText]);

  // Dynamic typing visualization stats
  const currentStats = activeText 
    ? calculateStats(activeText.content, typedText, timeElapsed > 0 ? timeElapsed : 1)
    : { wpm: 0, accuracy: 100, errors: 0 };

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
            disabled={isTraining}
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
            disabled={isTraining}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-[10px] font-semibold rounded-xl px-2.5 py-1.5 cursor-pointer focus:ring-1 focus:ring-teal-400"
          >
            <option value="none">الحفظ الذكي: لا حجب</option>
            <option value="percent10">حجب جزء بسيط (10%)</option>
            <option value="percent25">حجب متوسط (25%)</option>
            <option value="percent50">حجب مكثف (50%)</option>
            <option value="sentenceHide">إخفاء جمل كاملة عشوائياً</option>
          </select>
        </div>
      </div>

      {activeText ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Workspace (Top reference block + Bottom direct input sandbox) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* REFERENCE TEXT DISPLAY (THE TOP SECTION) */}
            <div 
              id="reference-panel"
              className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-6 relative min-h-[180px] overflow-hidden"
            >
              {/* Blur screen when user selected "Hide methodology during typing" */}
              {!showMethodology && isTraining && (
                <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center z-10 transition">
                  <EyeOff className="h-8 w-8 text-teal-400 mb-2 animate-bounce" />
                  <span className="text-sm font-bold text-slate-200">المنهجية مخفية الآن لمساعدتك على التذكر</span>
                  <p className="text-xs text-slate-400 max-w-sm mt-1">
                    أكتب النص عن ظهر قلب بالأسفل، أو اضغط زر <span className="font-bold text-teal-400">"تلميح"</span> لتذكر الكلمة التالية.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between flex-row-reverse mb-3 border-b border-slate-800/40 pb-2.5">
                <span className="text-xs font-bold text-slate-300">النموذج الأصلي (Original Template)</span>
                {isTraining && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-400 font-bold border border-teal-500/10 animate-pulse">
                    جاري التدريب
                  </span>
                )}
              </div>

              {/* Renders Reference text appropriately based on layout selection */}
              <div 
                className="text-left font-sans select-none leading-relaxed text-slate-300 prose prose-invert max-w-none text-sm break-words whitespace-pre-wrap"
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
                  <div className="font-sans">
                    {maskMode === 'none' ? activeText.content : maskedContent}
                  </div>
                )}
              </div>
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
                      <div className="flex items-center gap-1.5">
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
