import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ArticleCard from '../components/ArticleCard'
import Loader from '../components/Loader'
import sources from '../data/sources'
import { loadArticles, filterBySource } from '../lib/aggregators'
import { useI18n } from '../i18n.jsx'
import { Helmet } from 'react-helmet-async'

export default function Channel() {
  const { id } = useParams()
  const { t, lang } = useI18n()

  const [articles, setArticles] = useState(null)
  const src = sources[lang]?.find(s => s.id === id)

  useEffect(() => {
    if (!src) return
    setArticles(null)

    ;(async () => {
      const all = await loadArticles('All', lang)
      setArticles(filterBySource(all, id))
    })()
  }, [id, lang])

  if (!src) return <div style={{ padding: 20 }}>Unknown channel.</div>

  return (
    <section>
      <Helmet>
        <title>{src.name} • Mawajez</title>
        <meta name="description" content={`Latest news from ${src.name}`} />
      </Helmet>

      <h2 style={{ marginBottom: 12 }}>{src.name}</h2>
      <div className="badge" style={{ marginBottom: 18 }}>
        {t('category')} — {src.category}
      </div>

      {!articles ? (
        <Loader rows={9} />
      ) : (
        <div className="home-grid">
          {articles.map(a => (
            <ArticleCard key={a.id} item={a} />
          ))}
        </div>
      )}
    </section>
  )
}
