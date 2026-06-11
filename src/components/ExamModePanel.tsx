/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Methodology, Session } from '../types';
import { 
  Award, Play, Clock, AlertOctagon, RotateCcw, 
  Settings, CheckCircle, Keyboard, ShieldAlert
} from 'lucide-react';
import { calculateStats } from '../utils/textUtils';
import { motion, AnimatePresence } from 'motion/react';

interface ExamModePanelProps {
  methodologies: Methodology[];
  selectedText: Methodology | null;
  onSessionComplete: (session: Omit<Session, 'id' | 'timestamp'>) => void;
}

export default function ExamModePanel({
  methodologies,
  selectedText,
  onSessionComplete,
}: ExamModePanelProps) {
  const [activeText, setActiveText] = useState<Methodology | null>(selectedText || methodologies[0] || null);

  // States
  const [typedText, setTypedText] = useState('');
  const [isExamActive, setIsExamActive] = useState(false);
  
  // Timer States
  const [examTimeOption, setExamTimeOption] = useState<'15' | '20' | '30' | 'custom'>('20');
  const [customTimeMins, setCustomTimeMins] = useState('10');
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [totalDuration, setTotalDuration] = useState(0); // in seconds

  // Settings
  const [hideStatsDuringExam, setHideStatsDuringExam] = useState(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Synchronize prop text selection
  useEffect(() => {
    if (selectedText) {
      setActiveText(selectedText);
      resetExam();
    }
  }, [selectedText]);

  // Handle active text changing
  useEffect(() => {
    resetExam();
  }, [activeText]);

  // Exam timer logic
  useEffect(() => {
    if (isExamActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isExamActive]);

  const startExam = () => {
    if (!activeText) return;
    setTypedText('');
    
    let totalMins = 20;
    if (examTimeOption === '15') totalMins = 15;
    if (examTimeOption === '30') totalMins = 30;
    if (examTimeOption === 'custom') {
      const parsed = parseInt(customTimeMins);
      totalMins = isNaN(parsed) || parsed <= 0 ? 10 : parsed;
    }

    const durationSecs = totalMins * 60;
    setTimeLeft(durationSecs);
    setTotalDuration(durationSecs);
    setIsExamActive(true);

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  const resetExam = () => {
    setIsExamActive(false);
    setTypedText('');
    setTimeLeft(0);
  };

  const handleFinishExam = () => {
    if (!activeText) return;
    setIsExamActive(false);

    const secondsSpent = totalDuration - timeLeft;
    const timeSpent = secondsSpent > 0 ? secondsSpent : 1;

    // Compute final correctness statistics
    const stats = calculateStats(
      activeText.content,
      typedText,
      timeSpent
    );

    onSessionComplete({
      textId: activeText.id,
      textTitle: activeText.title,
      folderId: activeText.folderId,
      mode: 'exam',
      duration: timeSpent,
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      errors: stats.errors,
      wrongWords: stats.errors > 0 ? [{ original: 'مجموع الأخطاء', typed: `${stats.errors} خطأ` }] : [],
      caseErrors: stats.caseErrors,
      puncErrors: stats.puncErrors,
      totalChars: stats.totalChars,
    });
  };

  // Label formatting
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rs = secs % 60;
    return `${mins}:${rs < 10 ? '0' : ''}${rs}`;
  };

  const getWordCount = (txt: string) => {
    return txt.trim().split(/\s+/).filter(Boolean).length;
  };

  return (
    <div className="space-y-6" id="exam-panel-container">
      <AnimatePresence mode="wait">
        {!isExamActive ? (
          <motion.div
            key="exam-config"
            initial={{ opacity: 0, y: 15, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 space-y-6"
            id="exam-config-view"
          >
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Award className="h-5.5 w-5.5 text-teal-400" />
                <span>وضع قاعة الامتحان الحقيقي (Exam Mode)</span>
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                سيتم إخفاء نماذج المنهجية تماماً وبشكل صارم. اكتب المنهجية كاملة من ذاكرتك للتدرب على رهبة الامتحان وضغط الوقت.
              </p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="exam-parameters">
            {/* Left side parameters */}
            <div className="space-y-4">
              <div className="space-y-1.5 text-right">
                <label className="text-xs font-bold text-slate-300">اختر نص المنهجية للاختبار:</label>
                <select
                  id="exam-text-picker"
                  value={activeText?.id || ''}
                  onChange={(e) => {
                    const selected = methodologies.find(m => m.id === e.target.value);
                    if (selected) setActiveText(selected);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3.5 py-3 outline-none focus:border-teal-400 cursor-pointer"
                >
                  {methodologies.map((m) => (
                    <option key={m.id} value={m.id}>{m.title}</option>
                  ))}
                </select>
              </div>

              {/* Timer options */}
              <div className="space-y-1.5 text-right">
                <label className="text-xs font-bold text-slate-300">أختر مدة الامتحان التنازلية:</label>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setExamTimeOption('15')}
                    className={`p-2.5 rounded-xl border text-xs font-black transition ${
                      examTimeOption === '15' 
                        ? 'bg-teal-500 text-slate-950 border-teal-500' 
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900'
                    }`}
                  >
                    15 دقيقة
                  </button>
                  <button
                    type="button"
                    onClick={() => setExamTimeOption('20')}
                    className={`p-2.5 rounded-xl border text-xs font-black transition ${
                      examTimeOption === '20' 
                        ? 'bg-teal-500 text-slate-950 border-teal-500' 
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900'
                    }`}
                  >
                    20 دقيقة
                  </button>
                  <button
                    type="button"
                    onClick={() => setExamTimeOption('30')}
                    className={`p-2.5 rounded-xl border text-xs font-black transition ${
                      examTimeOption === '30' 
                        ? 'bg-teal-500 text-slate-950 border-teal-500' 
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900'
                    }`}
                  >
                    30 دقيقة
                  </button>
                  <button
                    type="button"
                    onClick={() => setExamTimeOption('custom')}
                    className={`p-2.5 rounded-xl border text-xs font-black transition ${
                      examTimeOption === 'custom' 
                        ? 'bg-teal-500 text-slate-950 border-teal-500' 
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900'
                    }`}
                  >
                    مدة مخصصة
                  </button>
                </div>

                {examTimeOption === 'custom' && (
                  <div className="mt-2.5 flex items-center gap-2 flex-row-reverse animate-fade-in">
                    <input
                      type="number"
                      value={customTimeMins}
                      onChange={(e) => setCustomTimeMins(e.target.value)}
                      placeholder="اكتب الدقائق"
                      className="w-24 text-center text-xs px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 outline-none"
                    />
                    <span className="text-xs text-slate-400">حدد عدد الدقائق المطلوبة:</span>
                  </div>
                )}
              </div>

              {/* Hide Stats checkbox */}
              <div className="flex items-center space-x-2 rtl:space-x-reverse justify-end pt-2">
                <label className="text-xs text-slate-300 font-semibold cursor-pointer select-none" htmlFor="chk-hide-stats">
                  إخفاء السرعة والدقة الجارية في الغرفة (أكثر تركيزاً)
                </label>
                <input
                  type="checkbox"
                  id="chk-hide-stats"
                  checked={hideStatsDuringExam}
                  onChange={(e) => setHideStatsDuringExam(e.target.checked)}
                  className="h-4 w-4 bg-slate-950 border-slate-800 rounded text-teal-400 outline-none focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Right side rules checklist summary */}
            <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800/80 space-y-4 text-right">
              <span className="text-xs font-extrabold text-teal-400 flex items-center justify-end gap-1.5 flex-row-reverse">
                <ShieldAlert className="h-4 w-4" />
                <span>قواعد الامتحان والانضباط</span>
              </span>

              <div className="space-y-2 text-slate-300 text-xs">
                <div className="flex items-center gap-2 justify-end">
                  <span>سيتم إغلاق وحجب النص تماماً بمجرد الضغط على ابدأ.</span>
                  <span className="text-teal-400 font-extrabold">✔</span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span>لا يسمح بأي مساعدة أو كشف تلميحات أثناء كتابة الامتحان.</span>
                  <span className="text-teal-400 font-extrabold">✔</span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span>سينتهي الوقت تلقائياً وتُعرض النتيجة فور فراغ العداد.</span>
                  <span className="text-teal-400 font-extrabold">✔</span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-left" dir="ltr">AZERTY keyboard layout friendly.</span>
                  <span className="text-teal-400 font-extrabold">✔</span>
                </div>
              </div>

              {activeText && (
                <div className="pt-3 border-t border-slate-850 flex items-center justify-between text-[11px] text-slate-400 flex-row-reverse">
                  <span>النص المستهدف المختار:</span>
                  <span className="text-slate-200 font-bold">{getWordCount(activeText.content)} كلمة</span>
                </div>
              )}
            </div>
          </div>

            <div className="pt-2">
              <motion.button
                 id="btn-start-exam"
                 onClick={startExam}
                 disabled={!activeText}
                 whileHover={{ scale: 1.03 }}
                 whileTap={{ scale: 0.97 }}
                 className="w-full max-w-sm mx-auto flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-teal-400 to-emerald-600 text-slate-950 font-black rounded-xl text-sm shadow-xl shadow-teal-500/10 hover:brightness-110 transition"
              >
                <Play className="h-4.5 w-4.5" />
                <span>ابدأ التدريب (وضع الامتحان)</span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* Active Exam Arena */
          <motion.div
            key="active-exam"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -15 }}
            transition={{ type: 'spring', stiffness: 220, damping: 25 }}
            className="space-y-6"
            id="active-exam-arena"
          >
          <div className="flex flex-col md:flex-row md:items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/25">
                <Clock className="h-5 w-5 text-rose-500 animate-spin" />
              </div>
              <div className="text-right">
                <h3 className="text-xs font-bold text-slate-400">وضع الامتحان جاري الآن</h3>
                <span className="text-xs font-sans font-bold text-white tracking-tight">{activeText?.title}</span>
              </div>
            </div>

            {/* Simulated mechanical retro timer */}
            <div className="flex items-center gap-2 self-center font-mono">
              <span className="text-xs text-slate-400">الوقت المتبقي:</span>
              <span className={`text-2xl font-black px-4 py-1 rounded-xl bg-slate-950 border ${
                timeLeft < 60 ? 'border-rose-500 text-rose-500 animate-pulse' : 'border-slate-800 text-teal-400'
              }`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Large Focused Text Input Arena */}
            <div className="lg:col-span-3 space-y-3">
              <textarea
                ref={textareaRef}
                id="exam-textarea-box"
                rows={16}
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                dir="ltr"
                placeholder="اكتب المنهجية كاملة من ذاكرتك هنا..."
                className="w-full font-sans text-base px-6 py-5 rounded-2xl bg-slate-950 border-2 border-slate-800 text-slate-100 outline-none focus:border-rose-500 leading-relaxed transition shadow-inner"
              />

              <div className="flex items-center justify-between pt-1">
                <button
                  id="btn-quit-exam"
                  onClick={() => {
                    if (confirm('هل ترغب حقاً في الانسحاب من الامتحان؟ لن يتم احتساب أي تقدم.')) {
                      resetExam();
                    }
                  }}
                  className="px-3.5 py-1.8 text-xs font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition flex items-center gap-1"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>انسحاب ومغادرة الغرفة</span>
                </button>

                <button
                  id="btn-finish-exam"
                  onClick={handleFinishExam}
                  className="px-6 py-2.5 text-xs font-black bg-gradient-to-r from-emerald-500 to-green-600 text-slate-950 rounded-xl transition shadow-xl shadow-emerald-500/15 flex items-center gap-1"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>تسليم الامتحان الآن</span>
                </button>
              </div>
            </div>

            {/* Sidebar with Hidden Statistics or minimal support */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block border-b border-slate-850 pb-2 text-right">إحصائيات الجلسة الجارية</span>

                {hideStatsDuringExam ? (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-center space-y-2">
                    <ShieldAlert className="h-5 w-5 text-teal-400" />
                    <p className="text-[10px] text-slate-400">الإحصائيات مغلّقة أثناء الامتحان</p>
                    <button
                      id="reveal-exam-stats"
                      onClick={() => setHideStatsDuringExam(false)}
                      className="text-[9px] text-teal-400 underline font-extrabold block mx-auto"
                    >
                      إظهار مؤقت الإحصائيات
                    </button>
                  </div>
                ) : (
                  /* Shows statistics in real-time if users clicked to toggle */
                  <div className="space-y-3">
                    <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-850 text-center">
                      <span className="text-[9px] text-slate-500 font-bold block">الكلمات المكتوبة</span>
                      <span className="text-xl font-bold font-mono text-slate-200">{getWordCount(typedText)}</span>
                    </div>

                    <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-850 text-center">
                      <span className="text-[9px] text-slate-500 font-bold block">الحروف المكتوبة</span>
                      <span className="text-xl font-bold font-mono text-slate-200">{typedText.length}</span>
                    </div>

                    <button
                      onClick={() => setHideStatsDuringExam(true)}
                      className="w-full text-center text-[10px] text-slate-400 hover:text-slate-300 underline font-semibold block"
                    >
                      إعادة إخفاء الإحصائيات
                    </button>
                  </div>
                )}

                <div className="space-y-2 text-[11px] text-slate-400 text-right">
                  <p>• كتابتك تخضع للمقارنة الدقيقة في النهاية.</p>
                  <p>• تأكد من صحة هجاء الحروف الخاصة بـ (ß, ä, ö, ü).</p>
                  <p>• راجع الفواصل والنقاط.</p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
