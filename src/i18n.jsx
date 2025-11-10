import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import en from './locales/en.json'
import ar from './locales/ar.json'
import { useLocation } from "react-router-dom";

const dict = { en, ar }
const I18nCtx = createContext(null)

// ✅ Global language state for use outside React (aggregators.js, etc.)
let currentLang = localStorage.getItem('lang') || 'ar';

export function I18nProvider({ children }) {
  const location = useLocation();
  const urlLang = location.pathname.split('/')[1]; // read /en/... or /ar/...

  const [lang, setLang] = useState(urlLang || currentLang);

  // Update when URL language changes
  useEffect(() => {
    if (urlLang === 'en' || urlLang === 'ar') {
      setLang(urlLang);
    }
  }, [urlLang]);

  // Sync with DOM + global variable
  useEffect(() => {
    localStorage.setItem('lang', lang);
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = useMemo(() => {
    const d = dict[lang] || dict.en;
    return (key) => d[key] || key;
  }, [lang]);

  return (
    <I18nCtx.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

// ✅ Aggregators can call this safely now
export function getCurrentLang() {
  return currentLang;
}
