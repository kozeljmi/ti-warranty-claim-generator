"use client";

import { useState, useRef, useEffect } from "react";
import {
  phoneCountryCodes,
  findCountryByCode,
  OTHER_PREFIX_SENTINEL,
} from "@/data/phoneCountryCodes";

interface Props {
  value: string; // the prefix code like "+1" or OTHER_PREFIX_SENTINEL
  customPrefix: string;
  onChange: (prefix: string) => void;
  onCustomPrefixChange: (value: string) => void;
}

export default function PhonePrefixSelect({
  value,
  customPrefix,
  onChange,
  onCustomPrefixChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isCustom = value === OTHER_PREFIX_SENTINEL;
  const selected = isCustom ? null : findCountryByCode(value);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = phoneCountryCodes.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.country.toLowerCase().includes(q) ||
      c.code.includes(q)
    );
  });

  const displayText = isCustom
    ? customPrefix || "Other"
    : selected
      ? `${selected.flag} ${selected.code}`
      : "+1";

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-lg border border-gray-300 px-2.5 py-2 text-sm text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:border-[#CC0000] focus:ring-[#CC0000] transition-colors min-w-[90px]"
        aria-label="Select country calling code"
        aria-expanded={open}
      >
        <span className="truncate">{displayText}</span>
        <svg
          className={`h-3.5 w-3.5 text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-64 rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="p-2 border-b border-gray-100">
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country or code..."
              className="w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-[#CC0000] focus:ring-[#CC0000]"
            />
          </div>
          <ul className="max-h-52 overflow-auto py-1">
            {filtered.map((entry, i) => (
              <li key={`${entry.code}-${entry.country}-${i}`}>
                <button
                  type="button"
                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm text-left hover:bg-gray-50 ${
                    value === entry.code && selected?.country === entry.country
                      ? "bg-red-50 text-[#CC0000]"
                      : "text-gray-700"
                  }`}
                  onMouseDown={() => {
                    onChange(entry.code);
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  <span className="text-base leading-none">{entry.flag}</span>
                  <span className="flex-1 truncate">{entry.country}</span>
                  <span className="text-gray-400 text-xs">{entry.code}</span>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-400">No results</li>
            )}
            {/* Other / custom option */}
            <li className="border-t border-gray-100">
              <button
                type="button"
                className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm text-left hover:bg-gray-50 ${
                  isCustom ? "bg-red-50 text-[#CC0000]" : "text-gray-700"
                }`}
                onMouseDown={() => {
                  onChange(OTHER_PREFIX_SENTINEL);
                  setOpen(false);
                  setSearch("");
                }}
              >
                <span className="text-base leading-none">🌐</span>
                <span className="flex-1">Other (custom code)</span>
              </button>
            </li>
          </ul>
        </div>
      )}

      {isCustom && (
        <input
          type="text"
          value={customPrefix}
          onChange={(e) => onCustomPrefixChange(e.target.value)}
          placeholder="+000"
          className="absolute top-full mt-1 w-20 rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-[#CC0000] focus:ring-[#CC0000]"
          aria-label="Custom country code"
        />
      )}
    </div>
  );
}
