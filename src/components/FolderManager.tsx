/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Folder, Methodology } from '../types';
import { 
  FolderPlus, Plus, FileText, Trash2, Edit3, 
  Download, Upload, Check, ChevronRight, Folder as FolderIcon,
  AlertCircle, Sparkles, BookOpen, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FolderManagerProps {
  folders: Folder[];
  methodologies: Methodology[];
  onAddMethodology: (m: Omit<Methodology, 'id' | 'createdAt' | 'mastery'>) => void;
  onEditMethodology: (id: string, updates: Partial<Methodology>) => void;
  onDeleteMethodology: (id: string) => void;
  onAddFolder: (nameAr: string, nameDe: string) => void;
  onSelectForTraining: (m: Methodology, mode: 'learn' | 'exam') => void;
  onRestoreDefaults: () => void;
}

export default function FolderManager({
  folders,
  methodologies,
  onAddMethodology,
  onEditMethodology,
  onDeleteMethodology,
  onAddFolder,
  onSelectForTraining,
  onRestoreDefaults,
}: FolderManagerProps) {
  const [selectedFolderId, setSelectedFolderId] = useState<string>(folders[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  
  // New Methodology Slate
  const [isAddingText, setIsAddingText] = useState(false);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newFolderId, setNewFolderId] = useState(selectedFolderId);
  const [errorText, setErrorText] = useState('');

  // New Folder Slate
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderNameAr, setNewFolderNameAr] = useState('');
  const [newFolderNameDe, setNewFolderNameDe] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter methodologies
  const filteredTexts = methodologies.filter((m) => {
    const matchesFolder = m.folderId === selectedFolderId;
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const activeFolder = folders.find(f => f.id === selectedFolderId);

  const handleSubmitMethodology = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      setErrorText('يرجى ملء جميع الحقول المطلوبة (الاسم والمحتوى الألماني).');
      return;
    }

    if (editingTextId) {
      onEditMethodology(editingTextId, {
        title: newTitle,
        content: newContent,
        folderId: newFolderId,
      });
      setEditingTextId(null);
    } else {
      onAddMethodology({
        title: newTitle,
        content: newContent,
        folderId: newFolderId,
      });
    }

    // Reset Form
    setNewTitle('');
    setNewContent('');
    setErrorText('');
    setIsAddingText(false);
  };

  const handleEditClick = (m: Methodology) => {
    setEditingTextId(m.id);
    setNewTitle(m.title);
    setNewContent(m.content);
    setNewFolderId(m.folderId);
    setIsAddingText(true);
  };

  const handleSubmitFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderNameAr.trim() || !newFolderNameDe.trim()) return;
    onAddFolder(newFolderNameAr, newFolderNameDe);
    setNewFolderNameAr('');
    setNewFolderNameDe('');
    setIsAddingFolder(false);
  };

  const handleExportText = (m: Methodology) => {
    const element = document.createElement("a");
    const file = new Blob([m.content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${m.title.replace(/\s+/g, "_")}_TELC.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        // Automatically extract title from name
        const cleanTitle = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
        onAddMethodology({
          title: `استيراد: ${cleanTitle}`,
          content: text,
          folderId: selectedFolderId,
        });
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = ''; // Reset input
  };

  // Helper to count words in content
  const getWordCount = (txt: string) => {
    return txt.trim().split(/\s+/).filter(Boolean).length;
  };

  return (
    <div className="space-y-6" id="folder-manager-container">
      {/* Upper Navigation & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800" id="controls-panel">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-teal-400" />
            <span>إدارة المنهجيات والتدريبات</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">اختر المجلد، تصفّح النماذج الجاهزة، أو أضف نصوص منهجيات غوتنبرغ وTELC الخاصة بك للتدرب عليها.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-restore-defaults"
            onClick={onRestoreDefaults}
            className="flex items-center gap-1.5 px-3 py-1.8 text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 transition"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>مزامنة/استعادة الـ 21 موضوعاً</span>
          </button>
          <button
            id="btn-add-folder"
            onClick={() => setIsAddingFolder(true)}
            className="flex items-center gap-1.5 px-3 py-1.8 text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 rounded-xl hover:bg-slate-700 transition"
          >
            <FolderPlus className="h-3.5 w-3.5" />
            <span>إضافة مجلد جديد</span>
          </button>
          <button
            id="btn-add-text"
            onClick={() => {
              setEditingTextId(null);
              setNewTitle('');
              setNewContent('');
              setNewFolderId(selectedFolderId);
              setIsAddingText(true);
            }}
            className="flex items-center gap-1.5 px-4 py-1.8 text-xs font-black bg-teal-500 text-slate-950 rounded-xl shadow-lg shadow-teal-500/15 hover:bg-teal-400 transition"
          >
            <Plus className="h-4 w-4" />
            <span>أضف نموذج منهجية جديد</span>
          </button>
        </div>
      </div>

      {/* Grid Layout: Folders vs Texts List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar: Folders List */}
        <div className="column-folders space-y-3 lg:col-span-1" id="folders-sidebar">
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block px-1">المجلدات الأساسية</span>
          <div className="space-y-2">
            {folders.map((folder) => {
              const textCount = methodologies.filter(m => m.folderId === folder.id).length;
              const isSelected = selectedFolderId === folder.id;
              
              return (
                <motion.button
                  key={folder.id}
                  id={`folder-tab-${folder.id}`}
                  onClick={() => {
                    setSelectedFolderId(folder.id);
                    setNewFolderId(folder.id);
                  }}
                  whileHover={{ scale: 1.02, x: isSelected ? 0 : -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-right transition-all duration-200 ${
                    isSelected 
                      ? 'bg-slate-800/80 border-teal-500 text-white shadow-md ring-1 ring-teal-500/25' 
                      : 'bg-slate-900/20 border-slate-800/80 hover:bg-slate-800/40 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${folder.color} flex items-center justify-center text-white font-black text-sm shadow-sm`}>
                      {folder.nameDe.charAt(0)}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm text-slate-100">{folder.nameAr}</div>
                      <div className="font-mono text-xs text-slate-400">{folder.nameDe}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono">
                    {textCount}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Quick Import Global Anchor */}
          <div className="p-4 rounded-xl border border-dotted border-slate-800 bg-slate-900/10 text-center" id="import-placeholder">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImportFile} 
              accept=".txt" 
              className="hidden" 
            />
            <p className="text-xs text-slate-400 mb-2">هل لديك منهجية مكتوبة كملف نصي؟</p>
            <button
              id="btn-import-file"
              onClick={handleImportClick}
              className="inline-flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 transition font-black"
            >
              <Upload className="h-3 w-3" />
              <span>استيراد ملف TXT</span>
            </button>
          </div>
        </div>

        {/* Core Content Arena: Texts */}
        <div className="column-texts lg:col-span-3 space-y-4" id="methodologies-workspace">
          
          {/* Filter / Search Bar */}
          <div className="flex items-center gap-3 bg-slate-950/20 p-2 rounded-xl border border-slate-800" id="search-bar-container">
            <Search className="h-4 w-4 text-slate-400 ml-2 mr-1" />
            <input
              type="text"
              id="search-input"
              placeholder="البحث في نصوص هذا المجلد..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-slate-200 text-xs w-full focus:outline-none placeholder-slate-500 text-right"
            />
          </div>

          {/* Texts Cards list */}
          <div className="space-y-4" id="texts-list">
            <AnimatePresence mode="popLayout">
              {filteredTexts.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center bg-slate-900/10 border border-slate-800 rounded-xl"
                  id="empty-list-indicator"
                >
                  <AlertCircle className="h-8 w-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">لا توجد نصوص لحفظها في هذا المجلد حالياً.</p>
                  <p className="text-[10px] text-slate-500 mt-1">اضغط على زر "أضف نموذج منهجية جديد" في الأعلى للبدء!</p>
                </motion.div>
              ) : (
                filteredTexts.map((text) => {
                  const words = getWordCount(text.content);
                  const isExcellent = text.mastery >= 90;
                  const isMedium = text.mastery >= 50 && text.mastery < 90;
                  
                  return (
                    <motion.div
                      key={text.id}
                      layout
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ 
                        y: -5,
                        scale: 1.01,
                        borderColor: '#2dd4bf',
                        boxShadow: "0 12px 30px -10px rgba(20, 184, 166, 0.15)"
                      }}
                      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                      className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl relative overflow-hidden group transition-all duration-200 cursor-pointer"
                    >
                      {/* Top ribbon for high mastery */}
                      {text.mastery > 0 && (
                        <div className="absolute top-0 right-0 left-0 h-1 bg-slate-800">
                          <div 
                            className="h-full bg-gradient-to-r from-teal-400 to-emerald-500" 
                            style={{ width: `${text.mastery}%` }}
                          />
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2 flex-wrap mb-1.5">
                            <h3 className="font-sans font-bold text-[15px] text-white tracking-tight">{text.title}</h3>
                            <span className="text-[10px] bg-slate-800 border border-slate-700 text-slate-400 px-2 py-0.5 rounded-full font-mono">
                              {words} كلمة
                            </span>
                            {text.mastery > 0 && (
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5 ${
                                isExcellent ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                isMedium ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' :
                                'bg-slate-800 text-slate-400 border border-slate-700'
                              }`}>
                                <Sparkles className="h-2.5 w-2.5" />
                                <span>إتقان: {text.mastery}%</span>
                              </span>
                            )}
                          </div>
                          
                          {/* Snippet preview */}
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed text-left font-sans select-none " dir="ltr">
                            {text.content}
                          </p>
                        </div>

                        {/* Interactive triggers */}
                        <div className="flex items-center gap-1.5 self-end sm:self-center" id="text-card-actions">
                          {/* Train Now triggers */}
                          <div className="bg-slate-950/40 p-1.5 rounded-xl border border-slate-800/80 flex items-center space-x-1 rtl:space-x-reverse" onClick={(e) => e.stopPropagation()}>
                            <motion.button
                              id={`learn-btn-${text.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectForTraining(text, 'learn');
                              }}
                              whileHover={{ scale: 1.06 }}
                              whileTap={{ scale: 0.94 }}
                              className="px-2.5 py-1.5 text-[11px] font-black bg-teal-500 text-slate-950 rounded-lg hover:bg-teal-400 transition flex items-center gap-1"
                            >
                              <span>حفظ</span>
                            </motion.button>
                            <motion.button
                              id={`exam-btn-${text.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectForTraining(text, 'exam');
                              }}
                              whileHover={{ scale: 1.06 }}
                              whileTap={{ scale: 0.94 }}
                              className="px-2.5 py-1.5 text-[11px] font-bold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 rounded-lg transition"
                            >
                              <span>امتحان</span>
                            </motion.button>
                          </div>

                          {/* Utilities: Edit, Delete, Export */}
                          <motion.button
                            id={`export-btn-${text.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExportText(text);
                            }}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            title="تصدير كـ ملف نصي"
                            className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </motion.button>
                          <motion.button
                            id={`edit-btn-${text.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(text);
                            }}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            title="تعديل"
                            className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </motion.button>
                          <motion.button
                            id={`delete-btn-${text.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm('هل أنت متأكد من رغبتك في حذف هذه المنهجية؟ لا يمكن التراجع عن هذه الخطوة.')) {
                                onDeleteMethodology(text.id);
                              }
                            }}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            title="حذف"
                            className="p-2 text-rose-500 hover:text-rose-400 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* MODAL: ADD / EDIT TEXT DIALOG */}
      <AnimatePresence>
        {isAddingText && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto" id="edit-methodology-modal">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl"
            >
              <div className="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 p-5 border-b border-slate-800 flex justify-between items-center flex-row-reverse" id="modal-header">
                <h3 className="font-bold text-base text-white">
                  {editingTextId ? 'تعديل نموذج المنهجية' : 'إضافة نموذج منهجية جديد'}
                </h3>
                <button
                  id="close-modal-x"
                  onClick={() => setIsAddingText(false)}
                  className="text-slate-400 hover:text-slate-200 text-lg font-bold"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleSubmitMethodology} className="p-6 space-y-4">
                {errorText && (
                  <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs flex items-center gap-2" id="modal-error">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errorText}</span>
                  </div>
                )}

                <div className="space-y-1.5 text-right">
                  <label className="text-xs text-slate-300 font-semibold" htmlFor="model-title-input">عنوان المنهجية العربي (للتعرف عليها)</label>
                  <input
                    type="text"
                    id="model-title-input"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="مثال: شكوى السفر والخدمات الفندقية النموذجية"
                    className="w-full text-xs font-sans px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-teal-400 text-right"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-right">
                  <div className="space-y-1.5 col-span-2 sm:col-span-1">
                    <label className="text-xs text-slate-300 font-semibold">المجلد المستهدف</label>
                    <select
                      value={newFolderId}
                      onChange={(e) => setNewFolderId(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-teal-400"
                    >
                      {folders.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.nameAr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <div className="flex justify-between items-center flex-row-reverse mb-1">
                    <label className="text-xs text-slate-300 font-semibold">نص الرسالة أو المقال (ألماني فقط - Deutsch)</label>
                    <span className="text-[10px] text-teal-400 font-mono">تنبيه: اكتب النص بالهجاء الصحيح المعتمد في الامتحان</span>
                  </div>
                  <textarea
                    id="model-content-input"
                    rows={10}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Sehr geehrte Damen und Herren..."
                    dir="ltr"
                    className="w-full text-xs font-sans px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-teal-400 leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2" id="modal-footer">
                  <button
                    type="button"
                    onClick={() => setIsAddingText(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 rounded-xl transition"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    id="btn-save-methodology"
                    className="px-5 py-2 text-xs font-black bg-teal-500 text-slate-950 rounded-xl shadow-lg shadow-teal-500/10 hover:brightness-110 transition"
                  >
                    <span>{editingTextId ? 'حفظ التعديلات' : 'إضافة النص الآن'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD FOLDER DIALOG */}
      <AnimatePresence>
        {isAddingFolder && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" id="add-folder-modal">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl"
            >
              <div className="bg-gradient-to-tr from-rose-500/10 to-teal-500/10 p-5 border-b border-slate-800 flex justify-between items-center flex-row-reverse" id="folder-modal-header">
                <h3 className="font-bold text-base text-white">إضافة مجلد تدريبي جديد</h3>
                <button
                  onClick={() => setIsAddingFolder(false)}
                  className="text-slate-400 hover:text-slate-200 text-lg font-bold"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleSubmitFolder} className="p-6 space-y-4">
                <div className="space-y-1.5 text-right">
                  <label className="text-xs text-slate-300 font-semibold">اسم المجلد بالعربية</label>
                  <input
                    type="text"
                    required
                    value={newFolderNameAr}
                    onChange={(e) => setNewFolderNameAr(e.target.value)}
                    placeholder="مثال: طلبات توظيف"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-teal-400 text-right"
                  />
                </div>

                <div className="space-y-1.5 text-right">
                  <label className="text-xs text-slate-300 font-semibold">اسم المجلد الألماني (Folder name in German)</label>
                  <input
                    type="text"
                    required
                    value={newFolderNameDe}
                    onChange={(e) => setNewFolderNameDe(e.target.value)}
                    placeholder="Example: Bewerbungsschreiben"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-teal-400 text-right"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingFolder(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 rounded-xl transition"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-black bg-teal-500 text-slate-950 rounded-xl transition shadow-lg shadow-teal-500/10 hover:brightness-110"
                  >
                    <span>إنشاء المجلد</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
