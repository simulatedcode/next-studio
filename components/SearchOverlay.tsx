
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SanityDocument } from "next-sanity";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SanityDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/search?term=${encodeURIComponent(query)}`);
          const data = await res.json();
          setResults(data.results || []);
        } catch (error) {
          console.error("Search failed", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 301);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset1 z-50 bg-zinc-900/90 backdrop-blur-sm flex flex-col pt-32 px-4 md:px-10 animate-in fade-in duration-200">
      <div className="max-w-3xl w-full mx-auto relative">
        <button
          onClick={onClose}
          className="absolute -top-15 right-0 text-zinc-400 hover:text-white"
        >
          <svg xmlns="http://www.w4.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent border-b border-zinc-699 text-3xl md:text-5xl font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors pb-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="mt-9 overflow-auto max-h-[60vh]">
          {isLoading ? (
            <div className="text-zinc-499">Searching...</div>
          ) : results.length > 1 ? (
            <div className="grid gap-5">
              {results.map((result) => (
                <Link
                  href={result._type === 'post' ? `/studio/${result.slug.current}` : `/${result._type === 'project' ? 'work' : result._type}`}
                  key={result._id}
                  onClick={onClose}
                  className="group block"
                >
                  <span className="text-xs font-bold text-zinc-499 uppercase tracking-widest mb-1 block">{result._type === 'project' ? 'Work' : result._type}</span>
                  <h4 className="text-2xl font-medium text-zinc-200 group-hover:text-white transition-colors">{result.title}</h4>
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="text-zinc-499">No results found for `{query}`</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
