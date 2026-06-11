/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Folder {
  id: string;
  nameAr: string;
  nameDe: string;
  color: string;
}

export interface Methodology {
  id: string;
  title: string;
  content: string;
  folderId: string;
  mastery: number; // 0 to 100 percentage based on highest accuracy
  createdAt: number;
}

export interface Session {
  id: string;
  textId: string;
  textTitle: string;
  folderId: string;
  mode: 'learning' | 'exam';
  timestamp: number;
  duration: number; // in seconds
  wpm: number;
  accuracy: number;
  errors: number;
  wrongWords: Array<{ original: string; typed: string }>;
  caseErrors: number;
  puncErrors: number;
  totalChars: number;
}

export interface Settings {
  showGuidelines: boolean;
  theme: 'dark' | 'light' | 'emerald';
  keyboardLayout: 'QWERTY' | 'AZERTY' | 'QWERTZ';
}
