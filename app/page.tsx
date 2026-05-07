'use client';

import React, {useState} from 'react';

import {books, categories} from '@/lib/books';
import type {Book} from '@/lib/books';
import {COPY_RESET_DELAY_MS, FILTER_TABS, STORAGE_KEYS} from '@/lib/constants';
import {BookSidebar} from '@/components/BookSidebar';
import {SummaryPanel} from '@/components/SummaryPanel';

function readLocalSet(key: string): Set<string> {
  if (typeof window === 'undefined') return new Set();
  const stored = localStorage.getItem(key);
  return stored ? new Set(JSON.parse(stored) as string[]) : new Set();
}

function readLocalRecord(key: string): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const stored = localStorage.getItem(key);
  return stored ? (JSON.parse(stored) as Record<string, string>) : {};
}

export default function Home(): React.JSX.Element {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>(FILTER_TABS.ALL);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedIds, setSavedIds] = useState<Set<string>>(
    () => readLocalSet(STORAGE_KEYS.SAVED_BOOKS),
  );
  const [readIds, setReadIds] = useState<Set<string>>(
    () => readLocalSet(STORAGE_KEYS.READ_BOOKS),
  );
  const [notes, setNotes] = useState<Record<string, string>>(
    () => readLocalRecord(STORAGE_KEYS.BOOK_NOTES),
  );
  const [isCopied, setIsCopied] = useState<boolean>(false);

  function toggleSave(bookId: string): void {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(bookId)) {
        next.delete(bookId);
      } else {
        next.add(bookId);
      }
      localStorage.setItem(STORAGE_KEYS.SAVED_BOOKS, JSON.stringify([...next]));
      return next;
    });
  }

  function toggleRead(bookId: string): void {
    setReadIds((prev) => {
      const next = new Set(prev);
      if (next.has(bookId)) {
        next.delete(bookId);
      } else {
        next.add(bookId);
      }
      localStorage.setItem(STORAGE_KEYS.READ_BOOKS, JSON.stringify([...next]));
      return next;
    });
  }

  function saveNote(bookId: string, text: string): void {
    setNotes((prev) => {
      const next = {...prev, [bookId]: text};
      localStorage.setItem(STORAGE_KEYS.BOOK_NOTES, JSON.stringify(next));
      return next;
    });
  }

  async function copyToClipboard(): Promise<void> {
    await navigator.clipboard.writeText(summary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), COPY_RESET_DELAY_MS);
  }

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      activeCategory === FILTER_TABS.ALL ? true
      : activeCategory === FILTER_TABS.SAVED ? savedIds.has(book.id)
      : activeCategory === FILTER_TABS.READ ? readIds.has(book.id)
      : book.category === activeCategory;

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      query === '' ||
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  async function loadSummary(book: Book, forceRefresh = false): Promise<void> {
    setSelectedBook(book);
    setSummary('');

    const cacheKey = `${STORAGE_KEYS.SUMMARY_PREFIX}${book.id}`;

    if (!forceRefresh) {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setSummary(cached);
        return;
      }
    } else {
      localStorage.removeItem(cacheKey);
    }

    setIsStreaming(true);
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({bookId: book.id}),
      });

      if (!res.ok || !res.body) throw new Error('Request failed');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = '';

      while (true) {
        const {done, value} = await reader.read();
        if (done) break;
        full += decoder.decode(value, {stream: true});
        setSummary(full);
      }

      localStorage.setItem(cacheKey, full);
    } catch {
      setSummary('Failed to load summary. Check your API key in .env.local.');
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <span className="text-2xl">📈</span>
          <div>
            <h1 className="text-xl font-bold text-white">Investor&apos;s Library</h1>
            <p className="text-xs text-gray-400">AI summaries of top investing books</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex h-[calc(100vh-65px)]">
        <BookSidebar
          books={filteredBooks}
          categories={categories}
          selectedBookId={selectedBook?.id ?? null}
          savedIds={savedIds}
          readIds={readIds}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onBookSelect={loadSummary}
          onCategoryChange={setActiveCategory}
          onSearchChange={setSearchQuery}
        />

        <main className="flex-1 overflow-y-auto p-8">
          {!selectedBook && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <span className="text-5xl mb-4">📚</span>
              <h2 className="text-xl font-semibold text-gray-300">
                Pick a book to get started
              </h2>
              <p className="text-gray-500 mt-2 max-w-sm">
                Click any book on the left to get an AI-generated summary with key
                ideas and actionable investing lessons.
              </p>
            </div>
          )}

          {selectedBook && isStreaming && !summary && (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-400">Generating summary for</p>
              <p className="text-white font-semibold mt-1">{selectedBook.title}</p>
            </div>
          )}

          {selectedBook && summary && (
            <SummaryPanel
              book={selectedBook}
              summary={summary}
              isStreaming={isStreaming}
              isSaved={savedIds.has(selectedBook.id)}
              isRead={readIds.has(selectedBook.id)}
              isCopied={isCopied}
              note={notes[selectedBook.id] ?? ''}
              onToggleSave={() => toggleSave(selectedBook.id)}
              onToggleRead={() => toggleRead(selectedBook.id)}
              onRegenerate={() => loadSummary(selectedBook, true)}
              onCopy={copyToClipboard}
              onNoteChange={(text) => saveNote(selectedBook.id, text)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
