'use client';

import React from 'react';

import type {Book} from '@/lib/books';
import {MarkdownRenderer} from './MarkdownRenderer';
import {Tooltip} from './Tooltip';

interface SummaryPanelProps {
  readonly book: Book;
  readonly summary: string;
  readonly isStreaming: boolean;
  readonly isSaved: boolean;
  readonly isRead: boolean;
  readonly isCopied: boolean;
  readonly note: string;
  readonly onToggleSave: () => void;
  readonly onToggleRead: () => void;
  readonly onRegenerate: () => void;
  readonly onCopy: () => void;
  readonly onNoteChange: (text: string) => void;
}

export function SummaryPanel({
  book,
  summary,
  isStreaming,
  isSaved,
  isRead,
  isCopied,
  note,
  onToggleSave,
  onToggleRead,
  onRegenerate,
  onCopy,
  onNoteChange,
}: SummaryPanelProps): React.JSX.Element {
  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{book.title}</h2>
            <p className="text-gray-400 mt-1">by {book.author}</p>
            <span className="inline-block mt-2 text-sm text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
              {book.category}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1 shrink-0">
            <Tooltip label={isRead ? 'Mark as unread' : 'Mark as read'}>
              <button
                onClick={onToggleRead}
                className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  isRead
                    ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                    : 'border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300'
                }`}
              >
                {isRead ? '✓ Read' : 'Mark read'}
              </button>
            </Tooltip>
            <Tooltip label="Copy summary to clipboard">
              <button
                onClick={onCopy}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
              >
                {isCopied ? 'Copied!' : 'Copy'}
              </button>
            </Tooltip>
            <Tooltip label="Discard cached summary and regenerate">
              <button
                onClick={onRegenerate}
                disabled={isStreaming}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300 transition-colors cursor-pointer disabled:opacity-40"
              >
                ↺
              </button>
            </Tooltip>
            <Tooltip label={isSaved ? 'Remove from saved' : 'Save this summary'}>
              <button
                onClick={onToggleSave}
                className={`text-xl transition-all hover:scale-110 cursor-pointer ${
                  isSaved ? 'opacity-100' : 'opacity-30 hover:opacity-60'
                }`}
              >
                🔖
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      <MarkdownRenderer text={summary} isStreaming={isStreaming} />

      <div className="mt-8 border-t border-gray-800 pt-6">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">My Notes</p>
        <textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Jot down your thoughts, key takeaways, or questions..."
          rows={4}
          className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-300 placeholder-gray-600 outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
        />
      </div>
    </div>
  );
}
