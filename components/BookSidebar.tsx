'use client';

import React from 'react';

import type {Book} from '@/lib/books';
import {FILTER_TABS} from '@/lib/constants';

interface BookSidebarProps {
  readonly books: Book[];
  readonly categories: readonly string[];
  readonly selectedBookId: string | null;
  readonly savedIds: ReadonlySet<string>;
  readonly readIds: ReadonlySet<string>;
  readonly activeCategory: string;
  readonly searchQuery: string;
  readonly onBookSelect: (book: Book) => void;
  readonly onCategoryChange: (category: string) => void;
  readonly onSearchChange: (query: string) => void;
}

export function BookSidebar({
  books,
  categories,
  selectedBookId,
  savedIds,
  readIds,
  activeCategory,
  searchQuery,
  onBookSelect,
  onCategoryChange,
  onSearchChange,
}: BookSidebarProps): React.JSX.Element {
  const filterTabs = [FILTER_TABS.ALL, FILTER_TABS.SAVED, FILTER_TABS.READ, ...categories];

  return (
    <aside className="w-80 border-r border-gray-800 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-800 space-y-3">
        <input
          type="text"
          placeholder="Search books or authors..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-gray-800 text-sm text-gray-100 placeholder-gray-500 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500"
        />
        <div className="flex flex-wrap gap-1.5">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onCategoryChange(tab)}
              className={`text-xs px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                activeCategory === tab
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {books.length === 0 && (
          <p className="text-sm text-gray-500 text-center mt-8 px-4">No books found.</p>
        )}
        {books.map((book) => (
          <button
            key={book.id}
            onClick={() => onBookSelect(book)}
            className={`w-full text-left px-4 py-3 border-b border-gray-800/50 transition-colors hover:bg-gray-800/50 cursor-pointer ${
              selectedBookId === book.id
                ? 'bg-gray-800 border-l-2 border-l-emerald-500'
                : ''
            }`}
          >
            <div className="flex items-start justify-between gap-1">
              <p className="text-sm font-medium text-gray-100 leading-snug">{book.title}</p>
              <div className="flex gap-1 shrink-0 mt-0.5">
                {readIds.has(book.id) && <span className="text-xs">✓</span>}
                {savedIds.has(book.id) && <span className="text-xs">🔖</span>}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{book.author}</p>
            <span className="inline-block mt-1 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
              {book.category}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
