import { useEffect, useMemo, useRef, useState } from 'react'
import Loader from '../components/Loader'
import ArticleCard from '../components/ArticleCard'
import sources from '../data/sources'
import { loadArticles } from '../lib/aggregators'
import { useI18n } from '../i18n.jsx'
import { Helmet } from "react-helmet-async";

const CATS = ['All','World','Business','Tech','Sports']

export default function Home(){
  const [all, setAll] = useState(null)
  const [q, setQ] = useState('')
  const [source, setSource] = useState('all')
  const [cat, setCat] = useState('All')
  const [visible, setVisible] = useState(24) // infinite scroll window
  const loaderRef = useRef(null)
  const { t, lang } = useI18n()
  
// Fetch when language or category changes
useEffect(() => {
  setAll(null);
  setVisible(24);
  window.scrollTo({ top: 0, behavior: "smooth" });
  (async () => setAll(await loadArticles(cat, lang)))();
}, [cat, lang]);

// Infinite scroll (attach once)
useEffect(() => {
  const el = loaderRef.current;
  if (!el) return;

  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setVisible(v => v + 24);
    }
  }, { rootMargin: "600px" }); // smoother scroll

  io.observe(el);
  return () => io.disconnect();
}, [loaderRef, all]); // Re-attach when new feed loads


  const filtered = useMemo(()=>{
    const arr = all || []
    const bySource = source==='all' ? arr : arr.filter(a=> a.sourceId === source)
    const ql = q.trim().toLowerCase()
    const byQ = ql ? bySource.filter(a=> (a.title + ' ' + (a.excerpt||'')).toLowerCase().includes(ql)) : bySource
    return byQ.slice(0, visible)
  },[all, q, source, visible])

 return (
  
  <section className="home">
    <Helmet>
      <title>{t('brand')} — {t('home')}</title>
      <meta name="description" content="Latest curated world news in one place." />
    </Helmet>
    {/* Category Tabs */}
    <div className="home-tabs">
      {CATS.map(c => (
        <button
          key={c}
          className={cat === c ? "home-tab active" : "home-tab"}
          onClick={() => setCat(c)}
        >
          {t('category_' + c.toLowerCase()) || c}
        </button>
      ))}
    </div>

    {/* Filters Row */}
    <div className="home-filters">
      <input
        className="home-input"
        placeholder={t('search_placeholder')}
        value={q}
        onChange={e => setQ(e.target.value)}
      />

      <select
        className="home-select"
        value={source}
        onChange={e => setSource(e.target.value)}
      >
        <option value="all">{t('all_sources')}</option>
        {sources[lang]
          .filter(s => s.type === 'rss' && (cat === 'All' || s.category === cat))
          .map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
      </select>

      <span className="home-count">
        {(all?.length || 0)} {t('results')}
      </span>
    </div>

    {/* Feed */}
    {!all ? (
      <Loader rows={9} />
    ) : (
      <>
        <div className="home-grid">
          {filtered.map(item => <ArticleCard key={item.id} item={item} />)}
        </div>
        <div ref={loaderRef} style={{ height: 1 }} />
      </>
    )}

  </section>
);

}
