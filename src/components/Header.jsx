import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useI18n } from '../i18n.jsx'
import "./header.css"
import sources from '../data/sources.js'

export default function Header() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const navigate = useNavigate()
  const { t, lang, setLang } = useI18n()

  useEffect(() => { 
    localStorage.setItem('theme', theme)
    document.documentElement.dataset.theme = theme
  }, [theme])

  const randomChannel = () => {
    const list = sources[lang].filter(s => s.type === 'rss')
    const rand = list[Math.floor(Math.random() * list.length)]
    navigate(`/${lang}/channel/${rand.id}`)
  }

  return (
    <header className="site-header">
      <div className="container nav">

        {/* Brand */}
        <Link to={`/${lang}`} className="brand">
          <span className="dot" />
          <span className="brand-text">{t("brand")}</span>
        </Link>

        {/* Navigation */}
        <nav className="nav-links">
          <NavLink to={`/${lang}`} end>{t('home')}</NavLink>
          <NavLink to={`/${lang}/videos`}>{t('videos')}</NavLink>
          <button className="nav-pill" onClick={randomChannel}>{t('random')}</button>
          <NavLink to={`/${lang}/about`}>{t('about')}</NavLink>
        </nav>

        {/* Controls */}
        <div className="controls">
          <button className="icon-btn" onClick={() => setTheme(t => t==='dark' ? 'light' : 'dark')}>
            {theme==='dark' ? '☀️' : '🌙'}
          </button>

          <button className="icon-btn" onClick={() => {
            const newLang = lang === 'en' ? 'ar' : 'en'
            setLang(newLang)
            navigate(`/${newLang}`)
          }}>
            {lang==='en' ? '🌐 AR' : '🌐 EN'}
          </button>
        </div>

      </div>
    </header>
  )
}
