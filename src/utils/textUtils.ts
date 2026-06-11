/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Token interface for diffing
export interface DiffToken {
  type: 'correct' | 'incorrect' | 'missing' | 'extra';
  original: string;
  typed: string;
  errorType?: 'case' | 'spelling' | 'punctuation' | 'none';
}

/**
 * Splits text into clean tokens suitable for natural language alignment.
 * Keeps punctuation attached to words for rich punctuation error detection.
 */
export function tokenize(text: string): string[] {
  if (!text) return [];
  // Split by spaces but preserve lines or double spaces as simple tokens
  return text.trim().split(/\s+/).filter(Boolean);
}

/**
 * Cleans a word for comparison (removes general punctuation, trims)
 */
export function cleanWord(word: string): string {
  return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'„“]/g, "").trim();
}

/**
 * Computes the Longest Common Subsequence (LCS) to align Original and Typed words.
 * This ensures that if the user skips a word or inserts extra text, the rest of the
 * text is not labeled as 100% incorrect (solves the offset problem).
 */
export function alignTexts(original: string, typed: string): DiffToken[] {
  const origTokens = tokenize(original);
  const typeTokens = tokenize(typed);

  const n = origTokens.length;
  const m = typeTokens.length;

  // DP table for LCS
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const w1 = origTokens[i - 1];
      const w2 = typeTokens[j - 1];

      if (w1 === w2) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else if (cleanWord(w1).toLowerCase() === cleanWord(w2).toLowerCase()) {
        // High similarity (just case or punctuation difference) counts as alignment but with error
        dp[i][j] = dp[i - 1][j - 1] + 0.9;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find alignment
  const result: DiffToken[] = [];
  let i = n;
  let j = m;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0) {
      const w1 = origTokens[i - 1];
      const w2 = typeTokens[j - 1];

      // Exact match
      if (w1 === w2) {
        result.unshift({
          type: 'correct',
          original: w1,
          typed: w2,
          errorType: 'none'
        });
        i--;
        j--;
        continue;
      }

      // Close match (capitalization, punctuation, or minor spelling difference)
      const cleanW1 = cleanWord(w1);
      const cleanW2 = cleanWord(w2);

      if (cleanW1.toLowerCase() === cleanW2.toLowerCase()) {
        let errorType: 'case' | 'punctuation' | 'spelling' = 'spelling';
        if (cleanW1 !== cleanW2 && w1.toLowerCase() === w2.toLowerCase()) {
          errorType = 'case';
        } else if (cleanW1.toLowerCase() === cleanW2.toLowerCase() && w1 !== w2) {
          // If clean words are identical but full tokens are not, it's a punctuation issue
          errorType = 'punctuation';
        } else if (w1.toLowerCase() !== w2.toLowerCase()) {
          errorType = 'case'; // Combined case and punctuation
        }

        result.unshift({
          type: 'incorrect',
          original: w1,
          typed: w2,
          errorType
        });
        i--;
        j--;
        continue;
      }
    }

    // Determine path based on DP table to minimize costs
    if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      // Extra word typed
      result.unshift({
        type: 'extra',
        original: '',
        typed: typeTokens[j - 1],
        errorType: 'none'
      });
      j--;
    } else {
      // Missing word from original
      result.unshift({
        type: 'missing',
        original: origTokens[i - 1],
        typed: '',
        errorType: 'none'
      });
      i--;
    }
  }

  return result;
}

/**
 * Calculates typing statistics (WPM, Accuracy, Speeds)
 */
export function calculateStats(
  original: string,
  typed: string,
  secondsElapsed: number
): {
  wpm: number;
  accuracy: number;
  errors: number;
  caseErrors: number;
  puncErrors: number;
  totalChars: number;
} {
  const alignment = alignTexts(original, typed);
  const totalChars = typed.length;

  let correctCount = 0;
  let errors = 0;
  let caseErrors = 0;
  let puncErrors = 0;

  // We count errors and correct aligned items
  alignment.forEach(token => {
    if (token.type === 'correct') {
      correctCount += token.typed.length;
    } else if (token.type === 'incorrect') {
      errors++;
      if (token.errorType === 'case') caseErrors++;
      else if (token.errorType === 'punctuation') puncErrors++;
    } else if (token.type === 'extra') {
      errors++;
    } else if (token.type === 'missing') {
      errors++;
    }
  });

  // Basic accuracy: percentage of typed words aligned correctly
  const typedWordCount = tokenize(typed).length;
  const originalWordCount = tokenize(original).length;
  
  let accuracy = 100;
  if (typedWordCount > 0 || originalWordCount > 0) {
    const totalAlignedCorrect = alignment.filter(t => t.type === 'correct').length;
    const maxPoss = Math.max(originalWordCount, typedWordCount);
    accuracy = Math.round((totalAlignedCorrect / maxPoss) * 100);
    if (accuracy < 0) accuracy = 0;
  }

  // Traditional WPM = (Total characters typed / 5) / minutes
  const minutes = secondsElapsed > 0 ? secondsElapsed / 60 : 1 / 60;
  const wpm = Math.round((totalChars / 5) / minutes);

  return {
    wpm: isNaN(wpm) || wpm < 0 ? 0 : wpm,
    accuracy: isNaN(accuracy) || accuracy < 0 ? 0 : accuracy,
    errors,
    caseErrors,
    puncErrors,
    totalChars,
  };
}

/**
 * Splits text into sentences.
 */
export function splitSentences(text: string): string[] {
  if (!text) return [];
  // Match sentences ending in dot, question mark or exclamation mark, tracking whitespace
  return text.split(/(?<=[.!?])\s+/).filter(Boolean);
}

/**
 * Masks text by percentage or random sentence selection
 */
export function maskText(
  text: string,
  mode: 'none' | 'percent10' | 'percent25' | 'percent50' | 'sentenceHide',
  seedValue: number = 0
): string {
  if (mode === 'none' || !text) return text;

  if (mode === 'sentenceHide') {
    const sentences = splitSentences(text);
    return sentences.map((sentence, index) => {
      // Hide odd index sentences or every 2nd sentence using standard mapping
      const shouldHide = (index + seedValue) % 3 === 1;
      if (shouldHide && sentence.trim().length > 4) {
        const words = sentence.trim().split(/\s+/);
        return words.map(() => '_____').join(' ');
      }
      return sentence;
    }).join(' ');
  }

  let percent = 0;
  if (mode === 'percent10') percent = 0.10;
  if (mode === 'percent25') percent = 0.25;
  if (mode === 'percent50') percent = 0.50;

  const words = text.split(/(\s+)/); // Preserve whitespace segments
  let wordCounter = 0;
  
  // Decide which words to hide deterministically or stably based on selection
  const wordsToHide = words.map((chunk) => {
    if (!chunk.trim()) return false;
    wordCounter++;
    // Deterministic pseudo-randomness based on counter
    const hash = (wordCounter * 17) % 100;
    return hash < percent * 100;
  });

  wordCounter = 0;
  return words.map((chunk, index) => {
    if (!chunk.trim()) return chunk;
    const hide = wordsToHide[index];
    if (hide) {
      // Replaces characters with underscores or bullet bubbles
      return '_____';
    }
    return chunk;
  }).join('');
}

/**
 * Extracts a hint for the user at their current position.
 * Returns the first 1-3 words of the sentence they should write next.
 */
export function getHint(original: string, typed: string, count: number = 3): string {
  const origTokens = tokenize(original);
  const typedTokens = tokenize(typed);

  const typedCount = typedTokens.length;
  if (typedCount >= origTokens.length) {
    return "لقد انتهيت بالفعل من كتابة النص! (End of text reached)";
  }

  // Next words to write
  const nextWords = origTokens.slice(typedCount, typedCount + count);
  return nextWords.join(' ');
}
