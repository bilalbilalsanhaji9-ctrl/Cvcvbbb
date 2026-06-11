/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Session, Folder } from '../types';
import { 
  BarChart2, Award, Zap, ShieldCheck, Trash2, Calendar, 
  Clock, TrendingUp, Sparkles, BookOpen, ChevronRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';

interface SajjelTaqaddomPanelProps {
  sessions: Session[];
  folders: Folder[];
  onClearHistory: () => void;
  onDeleteSession: (id: string) => void;
}

export default function SajjelTaqaddomPanel({
  sessions,
  folders,
  onClearHistory,
  onDeleteSession,
}: SajjelTaqaddomPanelProps) {
  // Sorting sessions chronologically for chart display
  const chartData = [...sessions]
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((s, index) => ({
      name: `جلسة ${index + 1}`,
      WPM: s.wpm,
      Accuracy: s.accuracy,
      date: new Date(s.timestamp).toLocaleDateString('ar-EG'),
    }));

  // Statistics calculation for highlights
  const totalSessions = sessions.length;
  const bestWpm = totalSessions > 0 ? Math.max(...sessions.map(s => s.wpm)) : 0;
  const bestAccuracy = totalSessions > 0 ? Math.max(...sessions.map(s => s.accuracy)) : 0;
  const avgWpm = totalSessions > 0 ? Math.round(sessions.reduce((acc, s) => acc + s.wpm, 0) / totalSessions) : 0;
  const avgAccuracy = totalSessions > 0 ? Math.round(sessions.reduce((acc, s) => acc + s.accuracy, 0) / totalSessions) : 0;

  // Render format
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rs = secs % 60;
    if (mins > 0) return `${mins}د ${rs}ث`;
    return `${rs}ث`;
  };

  return (
    <div className="space-y-6" id="progress-panel-container">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="progress-badges">
        <div className="bg-slate-900/60 p-5 border border-slate-800 rounded-2xl flex items-center justify-between text-right">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold block">إجمالي الجلسات</span>
            <span className="text-3xl font-black font-mono text-white">{totalSessions}</span>
          </div>
          <div className="h-11 w-11 rounded-xl bg-slate-850 flex items-center justify-center text-slate-300">
            <BookOpen className="h-5.5 w-5.5 text-blue-400" />
          </div>
        </div>

        <div className="bg-slate-900/60 p-5 border border-slate-800 rounded-2xl flex items-center justify-between text-right">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold block">أعلى سرعة (WPM)</span>
            <span className="text-3xl font-black font-mono text-teal-400">{bestWpm}</span>
          </div>
          <div className="h-11 w-11 rounded-xl bg-slate-850 flex items-center justify-center text-slate-300">
            <Zap className="h-5.5 w-5.5 text-teal-400 animate-pulse" />
          </div>
        </div>

        <div className="bg-slate-900/60 p-5 border border-slate-800 rounded-2xl flex items-center justify-between text-right">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold block">أعلى دقة تم تسجيلها</span>
            <span className="text-3xl font-black font-mono text-emerald-400">{bestAccuracy}%</span>
          </div>
          <div className="h-11 w-11 rounded-xl bg-slate-850 flex items-center justify-center text-slate-300">
            <Award className="h-5.5 w-5.5 text-emerald-400" />
          </div>
        </div>

        <div className="bg-slate-900/60 p-5 border border-slate-800 rounded-2xl flex items-center justify-between text-right">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold block">معدل الدقة العام</span>
            <span className="text-3xl font-black font-mono text-teal-400">{avgAccuracy}%</span>
          </div>
          <div className="h-11 w-11 rounded-xl bg-slate-850 flex items-center justify-center text-slate-300">
            <ShieldCheck className="h-5.5 w-5.5 text-teal-400" />
          </div>
        </div>
      </div>

      {sessions.length === 0 ? (
        /* Empty State */
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3" id="progress-empty-state">
          <BarChart2 className="h-12 w-12 text-slate-600 mx-auto animate-bounce" />
          <h3 className="text-sm font-bold text-slate-300">سجل تقدمك فارغ حالياً</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            بمجرد انتهائك من كتابة منهجيتك الأولى سواء في وضع الحفظ أو وضع الامتحان، سيتم رسم تطور سرعتك ودقتك تلقائياً هنا وبشكل مرئي رائع.
          </p>
        </div>
      ) : (
        /* Visual Chart and training logs table */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recharts Area Container */}
          <div className="lg:col-span-2 bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-4 text-right" id="progress-chart-card">
            <div className="flex items-center justify-between border-b border-slate-850 pb-2.5 flex-row-reverse">
              <span className="text-xs font-black text-slate-200">الرسم البياني لتطور الأداء السرعة والدقة</span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold">
                <TrendingUp className="h-3 w-3 text-emerald-400" />
                <span>إحصائيات متزامنة</span>
              </span>
            </div>

            <div className="h-[280px] w-full" id="wpm-accuracy-chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorWpm" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                    labelStyle={{ color: '#94a3b8', fontWeight: 'bold', fontSize: '11px' }}
                    itemStyle={{ fontSize: '11px' }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Area
                    name="السرعة (WPM)"
                    type="monotone"
                    dataKey="WPM"
                    stroke="#14b8a6"
                    fillOpacity={1}
                    fill="url(#colorWpm)"
                    strokeWidth={2.5}
                  />
                  <Area
                    name="الدقة (%)"
                    type="monotone"
                    dataKey="Accuracy"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorAcc)"
                    strokeWidth={2.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Past logs list table */}
          <div className="lg:col-span-1 bg-slate-900/60 rounded-2xl border border-slate-800 p-5 flex flex-col h-[380px]" id="logs-history-card">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-row-reverse mb-3">
              <span className="text-xs font-black text-slate-200">سجل الجلسات السابقة ({sessions.length})</span>
              <button
                id="btn-clear-history"
                onClick={() => {
                  if (confirm('هل أنت متأكد من رغبتك في حذف جميع إحصائيات الجلسات السابقة وتصفير سجل التقدم الخاص بك؟')) {
                    onClearHistory();
                  }
                }}
                className="text-[9px] font-bold text-rose-400 hover:text-rose-300 transition"
              >
                تفريغ السجل
              </button>
            </div>

            <div className="space-y-2.5 overflow-y-auto flex-1 pr-1" id="history-scroller">
              {[...sessions]
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((sess) => {
                  const dateLabel = new Date(sess.timestamp).toLocaleDateString('ar-EG', {
                    month: 'short',
                    day: 'numeric',
                  });

                  return (
                    <div 
                      key={sess.id} 
                      className="p-3 bg-slate-950/60 border border-slate-850 hover:border-slate-800 rounded-xl relative group flex items-center justify-between text-right"
                    >
                      <div className="flex items-center gap-2">
                        <button
                          id={`del-history-${sess.id}`}
                          onClick={() => onDeleteSession(sess.id)}
                          className="p-1 px-1.5 hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 rounded transition shrink-0"
                          title="حذف هذه الجلسة"
                        >
                          <Trash2 className="h-3.25 w-3.25" />
                        </button>

                        <div className="shrink-0 text-left font-mono text-[10.5px]">
                          <div className="text-teal-400 font-black text-xs">{sess.wpm} WPM</div>
                          <div className="text-emerald-400 font-bold">{sess.accuracy}% دقة</div>
                        </div>
                      </div>

                      <div className="space-y-0.5 text-right font-sans">
                        <h4 className="text-[11.5px] font-bold text-slate-200 line-clamp-1">{sess.textTitle}</h4>
                        <div className="flex items-center gap-1.5 text-[9px] text-slate-400 justify-end">
                          <span className={`px-1 py-0.25 text-[8px] font-black rounded ${
                            sess.mode === 'exam' ? 'bg-rose-500/10 text-rose-400' : 'bg-teal-500/10 text-teal-400'
                          }`}>
                            {sess.mode === 'exam' ? 'امتحان' : 'حفظ'}
                          </span>
                          <span>•</span>
                          <span>{formatTime(sess.duration)}</span>
                          <span>•</span>
                          <span>{dateLabel}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
