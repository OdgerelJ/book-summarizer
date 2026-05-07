"use client";

import { useState, useEffect } from "react";
import { books, categories, Book } from "@/lib/books";

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("savedBooks");
    if (saved) setSavedIds(new Set(JSON.parse(saved)));
    const read = localStorage.getItem("readBooks");
    if (read) setReadIds(new Set(JSON.parse(read)));
    const n = localStorage.getItem("bookNotes");
    if (n) setNotes(JSON.parse(n));
  }, []);

  function toggleSave(bookId: string) {
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(bookId) ? next.delete(bookId) : next.add(bookId);
      localStorage.setItem("savedBooks", JSON.stringify([...next]));
      return next;
    });
  }

  function toggleRead(bookId: string) {
    setReadIds((prev) => {
      const next = new Set(prev);
      next.has(bookId) ? next.delete(bookId) : next.add(bookId);
      localStorage.setItem("readBooks", JSON.stringify([...next]));
      return next;
    });
  }

  function saveNote(bookId: string, text: string) {
    setNotes((prev) => {
      const next = { ...prev, [bookId]: text };
      localStorage.setItem("bookNotes", JSON.stringify(next));
      return next;
    });
  }

  async function copyToClipboard() {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const filteredBooks = books.filter((b) => {
    const matchesCategory =
      activeCategory === "All"
        ? true
        : activeCategory === "Saved"
        ? savedIds.has(b.id)
        : activeCategory === "Read"
        ? readIds.has(b.id)
        : b.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      q === "" || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  async function loadSummary(book: Book, forceRefresh = false) {
    setSelectedBook(book);
    setSummary("");

    const cacheKey = `summary_${book.id}`;
    if (!forceRefresh) {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setSummary(cached);
        return;
      }
    } else {
      localStorage.removeItem(cacheKey);
    }

    setLoading(true);
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: book.id }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setSummary(full);
      }

      localStorage.setItem(cacheKey, full);
    } catch {
      setSummary("Failed to load summary. Check your API key in .env.local.");
    } finally {
      setLoading(false);
    }
  }

  function renderMarkdown(text: string) {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("## "))
        return (
          <h2 key={i} className="text-emerald-400 text-lg font-semibold mt-6 mb-2">
            {line.replace("## ", "")}
          </h2>
        );
      if (line.startsWith("- ") || line.startsWith("* "))
        return (
          <li key={i} className="text-gray-300 leading-relaxed ml-4 list-disc">
            {line.replace(/^[-*] /, "").replace(/\*\*(.*?)\*\*/g, "$1")}
          </li>
        );
      if (line.startsWith("> "))
        return (
          <blockquote key={i} className="border-l-2 border-emerald-500 pl-4 text-gray-400 italic my-2">
            {line.replace("> ", "")}
          </blockquote>
        );
      if (line.trim() === "") return <br key={i} />;
      return (
        <p key={i} className="text-gray-300 leading-relaxed">
          {line.replace(/\*\*(.*?)\*\*/g, "$1")}
        </p>
      );
    });
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
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
        {/* Sidebar */}
        <aside className="w-80 border-r border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 space-y-3">
            {/* Search */}
            <input
              type="text"
              placeholder="Search books or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-sm text-gray-100 placeholder-gray-500 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500"
            />
            {/* Category filters */}
            <div className="flex flex-wrap gap-1.5">
              {["All", "Saved", "Read", ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredBooks.length === 0 && (
              <p className="text-sm text-gray-500 text-center mt-8 px-4">No books found.</p>
            )}
            {filteredBooks.map((book) => (
              <button
                key={book.id}
                onClick={() => loadSummary(book)}
                className={`w-full text-left px-4 py-3 border-b border-gray-800/50 transition-colors hover:bg-gray-800/50 cursor-pointer ${
                  selectedBook?.id === book.id ? "bg-gray-800 border-l-2 border-l-emerald-500" : ""
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

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {!selectedBook && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <span className="text-5xl mb-4">📚</span>
              <h2 className="text-xl font-semibold text-gray-300">Pick a book to get started</h2>
              <p className="text-gray-500 mt-2 max-w-sm">
                Click any book on the left to get an AI-generated summary with key ideas and
                actionable investing lessons.
              </p>
            </div>
          )}

          {selectedBook && loading && !summary && (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-400">Generating summary for</p>
              <p className="text-white font-semibold mt-1">{selectedBook.title}</p>
            </div>
          )}

          {selectedBook && summary && (
            <div className="max-w-3xl">
              {/* Book header */}
              <div className="mb-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedBook.title}</h2>
                    <p className="text-gray-400 mt-1">by {selectedBook.author}</p>
                    <span className="inline-block mt-2 text-sm text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
                      {selectedBook.category}
                    </span>
                  </div>
                  {/* Action buttons */}
                  <div className="flex items-center gap-2 mt-1 shrink-0">
                    {/* Read toggle */}
                    <button
                      onClick={() => toggleRead(selectedBook.id)}
                      title={readIds.has(selectedBook.id) ? "Mark as unread" : "Mark as read"}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                        readIds.has(selectedBook.id)
                          ? "border-emerald-500 text-emerald-400 bg-emerald-500/10"
                          : "border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300"
                      }`}
                    >
                      {readIds.has(selectedBook.id) ? "✓ Read" : "Mark read"}
                    </button>
                    {/* Copy */}
                    <button
                      onClick={copyToClipboard}
                      title="Copy summary"
                      className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    {/* Regenerate */}
                    <button
                      onClick={() => loadSummary(selectedBook, true)}
                      disabled={loading}
                      title="Regenerate summary"
                      className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300 transition-colors cursor-pointer disabled:opacity-40"
                    >
                      ↺
                    </button>
                    {/* Save */}
                    <button
                      onClick={() => toggleSave(selectedBook.id)}
                      title={savedIds.has(selectedBook.id) ? "Remove from saved" : "Save"}
                      className={`text-xl transition-all hover:scale-110 cursor-pointer ${
                        savedIds.has(selectedBook.id) ? "opacity-100" : "opacity-30 hover:opacity-60"
                      }`}
                    >
                      🔖
                    </button>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1">
                {renderMarkdown(summary)}
                {loading && (
                  <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-1 align-middle" />
                )}
              </div>

              {/* Notes */}
              <div className="mt-8 border-t border-gray-800 pt-6">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">My Notes</p>
                <textarea
                  value={notes[selectedBook.id] ?? ""}
                  onChange={(e) => saveNote(selectedBook.id, e.target.value)}
                  placeholder="Jot down your thoughts, key takeaways, or questions..."
                  rows={4}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-300 placeholder-gray-600 outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
