import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import en from './locales/en.json'
import ar from './locales/ar.json'

const dict = { en, ar }
const I18nCtx = createContext(null)

// Global language tracker (used outside React)
let currentLang = localStorage.getItem('lang') || 'en';

export function I18nProvider({ children }){
  const [lang, setLang] = useState(currentLang)

  useEffect(()=>{
    localStorage.setItem('lang', lang)
    currentLang = lang; // sync for external modules
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const t = useMemo(()=>{
    const d = dict[lang] || dict.en
    return (key)=> d[key] || key
  }, [lang])

  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>
}

export function useI18n(){
  const ctx = useContext(I18nCtx)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

// ✅ External getter for modules like aggregators.js
export function getCurrentLang(){
  return currentLang;
}
