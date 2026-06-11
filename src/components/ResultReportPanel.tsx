/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Session, Folder } from '../types';
import { 
  CheckCircle, AlertCircle, BarChart2, Calendar, Clock, 
  ArrowRight, Sparkles, BookOpen, ThumbsUp, XCircle, RefreshCw
} from 'lucide-react';
import { alignTexts } from '../utils/textUtils';

interface ResultReportPanelProps {
  session: Session;
  folders: Folder[];
  originalText: string;
  typedText: string;
  onClose: () => void;
  onRetry: () => void;
}

export default function ResultReportPanel({
  session,
  folders,
  originalText,
  typedText,
  onClose,
  onRetry,
}: ResultReportPanelProps) {
  const isExam = session.mode === 'exam';
  
  // Compute Alignment for the diff view
  const alignment = alignTexts(originalText, typedText);

  // Format training duration
  const formatTimeInMins = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rs = secs % 60;
    if (mins > 0) {
      return `${mins} د و ${rs} ث`;
    }
    return `${rs} ث`;
  };

  // Classify errors based on tokens
  const errorsList = alignment.filter(t => t.type !== 'correct');
  const caseErrorsList = errorsList.filter(t => t.errorType === 'case');
  const puncErrorsList = errorsList.filter(t => t.errorType === 'punctuation');
  const spellingErrorsList = errorsList.filter(t => t.type === 'incorrect' && t.errorType === 'spelling');
  const missingWordsList = errorsList.filter(t => t.type === 'missing');

  // Performance rating assessment
  let feedbackTitle = 'عمل رائع ومجهود مميز!';
  let feedbackDesc = 'لقد كتبت النموذج بدرجة ممتازة من الصحة والدقة. استمر للوصول للأداء المثالي في قاعة الامتحان.';
  let feedbackColor = 'text-emerald-400';

  if (session.accuracy >= 90) {
    feedbackTitle = 'مستوى إتقان ممتاز (Sehr Gut!) 🌟';
    feedbackDesc = 'أنت جاهز تماماً لكتابة هذه المنهجية في الامتحان الحقيقي والحصول على علامة كاملة في الجزء الكتابي!';
    feedbackColor = 'text-amber-400';
  } else if (session.accuracy >= 70) {
    feedbackTitle = 'مستوى جيد جداً (Gut!) 👍';
    feedbackDesc = 'تحتاج فقط إلى مراجعة بعض الأخطاء البسيطة في علامات الترقيم أو تصحيح تهجئة كلمات معينة لترقية النتيجة.';
    feedbackColor = 'text-teal-400';
  } else if (session.accuracy >= 50) {
    feedbackTitle = 'مستوى متوسط (Mittel) 📈';
    feedbackDesc = 'صحيح أنك تذكرت معظم المنهجية، لكن هناك أخطاء تمنعك من تحصيل درجات جيدة في B2. تدرب في وضع الحفظ.';
    feedbackColor = 'text-amber-500';
  } else {
    feedbackTitle = 'بحاجة لمزيد من التدريب (Noch zu üben) ⚠️';
    feedbackDesc = 'النص المكتوب يحتوي على نقص ملحوظ أو أخطاء هجائية كثيرة. ننصح بعرض المنهجية خطوة بخطوة وإعادة ممارستها.';
    feedbackColor = 'text-rose-500';
  }

  return (
    <div className="space-y-6" id="session-feedback-report">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden text-right">
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-teal-500/5 to-transparent pointer-events-none" />
        
        <div className="space-y-1">
          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-950/60 border ${
            isExam ? 'border-rose-500/20 text-rose-400' : 'border-teal-500/20 text-teal-400'
          } inline-block`}>
            {isExam ? 'تقرير امتحان TELC B2 معتمد' : 'تقرير جلسة الحفظ والتدريب'}
          </span>
          <h2 className={`text-xl font-black mt-2 ${feedbackColor}`}>{feedbackTitle}</h2>
          <p className="text-slate-300 text-xs mt-1 max-w-xl leading-relaxed">{feedbackDesc}</p>
        </div>

        <div className="flex items-center gap-2 self-center md:self-auto shrink-0 flex-row-reverse">
          <button
            id="report-btn-close"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-black bg-teal-500 text-slate-950 rounded-xl hover:bg-teal-400 transition shadow-lg shadow-teal-500/15 flex items-center gap-1.5"
          >
            <span>شاشة المنهجيات الرئيسية</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <button
            id="report-btn-retry"
            onClick={onRetry}
            className="px-4 py-2.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition flex items-center gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>إعادة التدريب</span>
          </button>
        </div>
      </div>

      {/* Grid: Stats & Analyzers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Statistics Widgets Row */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="report-dashboard">
            <div className="bg-slate-900/60 p-4 border border-slate-800 rounded-2xl text-center">
              <span className="text-[10px] text-slate-500 font-bold block mb-1">الدقة والاتساق</span>
              <span className="text-3xl font-black font-mono text-teal-400 tracking-tight">
                {session.accuracy}%
              </span>
            </div>

            <div className="bg-slate-900/60 p-4 border border-slate-800 rounded-2xl text-center">
              <span className="text-[10px] text-slate-400 font-bold block mb-1">سرعة الكتابة (WPM)</span>
              <span className="text-3xl font-black font-mono text-teal-400 tracking-tight">
                {session.wpm}
              </span>
            </div>

            <div className="bg-slate-900/60 p-4 border border-slate-800 rounded-2xl text-center">
              <span className="text-[10px] text-slate-500 font-bold block mb-1">عدد الأخطاء الكلي</span>
              <span className="text-3xl font-black font-mono text-rose-500 tracking-tight">
                {session.errors}
              </span>
            </div>

            <div className="bg-slate-900/60 p-4 border border-slate-800 rounded-2xl text-center">
              <span className="text-[10px] text-slate-500 font-bold block mb-1">الوقت المستغرق</span>
              <span className="text-lg font-bold font-mono text-slate-200 mt-1.5 block">
                {formatTimeInMins(session.duration)}
              </span>
            </div>
          </div>

          {/* VISUAL DIFFERENCE VIEW (مقارنة النصين) */}
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 space-y-4" id="report-diff-panel">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/40 pb-3 flex-col-reverse sm:flex-row-reverse gap-2">
              <span className="text-xs font-bold text-slate-200 text-right">مقارنة النص الغيب المكتوب بالنص الأصلي للمنهجية</span>
              <div className="flex items-center gap-3 text-[9px] text-slate-400 font-bold font-sans flex-wrap justify-end">
                <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-emerald-500/20 border border-emerald-500/40"></span>صحيح</span>
                <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-rose-500/20 border border-rose-500/40"></span>خطأ</span>
                <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-teal-500/20 border border-teal-500/40"></span>حالة الحرف</span>
                <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-yellow-500/20 border border-yellow-500/40"></span>فواصل</span>
                <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-indigo-500/20 border border-indigo-500/40 border-dotted"></span>ناقص</span>
              </div>
            </div>

            {/* Rendered aligned text with visual markups */}
            <div 
              className="text-left font-sans leading-loose text-sm whitespace-pre-wrap select-text p-4 rounded-xl bg-slate-950 border border-slate-850 max-h-[350px] overflow-y-auto break-words"
              dir="ltr"
            >
              {alignment.map((token, index) => {
                if (token.type === 'correct') {
                  return (
                    <span key={index} className="text-slate-300 font-sans mx-0.5 inline">
                      {token.original}{' '}
                    </span>
                  );
                }

                if (token.type === 'incorrect') {
                  let badgeColor = 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
                  let errorLabel = 'خطأ';
                  if (token.errorType === 'case') {
                    badgeColor = 'bg-teal-500/20 text-teal-400 border border-teal-500/30';
                    errorLabel = 'حرف كبير';
                  } else if (token.errorType === 'punctuation') {
                    badgeColor = 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30';
                    errorLabel = 'فاصلة/نقطة';
                  }

                  return (
                    <span 
                      key={index} 
                      className={`inline-flex flex-col px-1 rounded mx-0.5 text-center ${badgeColor}`}
                    >
                      <span className="font-bold">{token.typed || '___'}</span>
                      <span className="text-[9px] font-medium opacity-80 border-t border-slate-800/40 px-1 select-none">
                        {token.original} ({errorLabel})
                      </span>
                    </span>
                  );
                }

                if (token.type === 'missing') {
                  return (
                    <span 
                      key={index} 
                      className="inline-flex flex-col px-1 rounded border border-dotted border-indigo-500/40 text-indigo-400 bg-indigo-950/20 mx-0.5 text-center"
                    >
                      <span className="line-through">{token.original}</span>
                      <span className="text-[9px] font-medium opacity-80 border-t border-indigo-800/20 px-1 select-none">
                        منسي ⚠️
                      </span>
                    </span>
                  );
                }

                if (token.type === 'extra') {
                  return (
                    <span 
                      key={index} 
                      className="inline-flex flex-col px-1 rounded border border-dashed border-orange-500/30 text-orange-400 bg-orange-950/20 mx-0.5 text-center"
                    >
                      <span className="line-through">{token.typed}</span>
                      <span className="text-[9px] font-medium opacity-80 border-t border-orange-850/20 px-1 select-none">
                        زائد ➕
                      </span>
                    </span>
                  );
                }

                return null;
              })}
            </div>
          </div>
        </div>

        {/* Error analysis reports card list on the side */}
        <div className="space-y-6 lg:col-span-1" id="report-error-breakdowns">
          
          {/* Categorized Count Panel */}
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block border-b border-slate-850 pb-2 text-right">تحليل الأخطاء الهيكلي</span>

            <div className="space-y-2.5">
              
              <div className="flex items-center justify-between flex-row-reverse text-xs">
                <span className="text-slate-300 font-bold">أخطاء حالة الحروف الكبيرة (Großschreibung):</span>
                <span className={`font-mono font-bold px-2 py-0.5 rounded ${caseErrorsList.length > 0 ? 'bg-teal-500/10 text-teal-400 border border-teal-500/10' : 'bg-slate-950 text-slate-500'}`}>
                  {caseErrorsList.length} خطأ
                </span>
              </div>

              <div className="flex items-center justify-between flex-row-reverse text-xs">
                <span className="text-slate-300 font-bold">الفواصل والرموز (Zeichensetzung):</span>
                <span className={`font-mono font-bold px-2 py-0.5 rounded ${puncErrorsList.length > 0 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-slate-950 text-slate-500'}`}>
                  {puncErrorsList.length} خطأ
                </span>
              </div>

              <div className="flex items-center justify-between flex-row-reverse text-xs">
                <span className="text-slate-300 font-bold">أخطاء الإملاء والتهجئة (Rechtschreibung):</span>
                <span className={`font-mono font-bold px-2 py-0.5 rounded ${spellingErrorsList.length > 0 ? 'bg-rose-500/10 text-rose-500' : 'bg-slate-950 text-slate-500'}`}>
                  {spellingErrorsList.length} خطأ
                </span>
              </div>

              <div className="flex items-center justify-between flex-row-reverse text-xs">
                <span className="text-slate-300 font-bold">الكلمات والجمل الناقصة:</span>
                <span className={`font-mono font-bold px-2 py-0.5 rounded ${missingWordsList.length > 0 ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-950 text-slate-500'}`}>
                  {missingWordsList.length} كلمة مفقودة
                </span>
              </div>
            </div>
          </div>

          {/* Quick interactive breakdown panel */}
          {errorsList.length > 0 ? (
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-3 max-h-[250px] overflow-y-auto">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block border-b border-slate-850 pb-2 text-right">أكثر الأخطاء تكراراً (Top Mistyped)</span>
              <div className="space-y-1.5" dir="ltr">
                {errorsList.slice(0, 6).map((tok, idx) => (
                  <div key={idx} className="text-xs flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-850 text-left">
                    <span className="font-mono text-rose-500 font-bold line-through">{tok.typed || '(ناقص)'}</span>
                    <span className="text-slate-400 text-[10px]">←</span>
                    <span className="font-mono text-emerald-400 font-bold">{tok.original}</span>
                  </div>
                ))}
                {errorsList.length > 6 && (
                  <p className="text-[10px] text-slate-500 text-center mt-1">توجد {errorsList.length - 6} أخطاء مبرزة بالأعلى.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-tr from-emerald-500/10 to-teal-500/5 p-5 rounded-2xl border border-emerald-500/20 text-center space-y-2">
              <Sparkles className="h-6 w-6 text-emerald-400 mx-auto" />
              <h4 className="text-xs font-black text-emerald-300">علامة كاملة خالية من الأخطاء!</h4>
              <p className="text-[10px] text-slate-300">أنت على دراية مطلقة بكل فاصلة وحرف ألماني في هذه الرسالة.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
