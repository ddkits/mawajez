import { Helmet } from "react-helmet-async";
import { useI18n } from "../i18n.jsx";

export default function About(){
  const { t } = useI18n();

  return (
    <section className="container">
      <Helmet>
        <title>Mawajez — {t('about')}</title>
        <meta name="description" content="Learn about Mawajez, a fast global news hub delivering reliable news headlines in English and Arabic." />
        <meta property="og:title" content="About Mawajez" />
        <meta property="og:description" content="A lightweight news hub that respects privacy. No tracking. No ads. No database." />
      </Helmet>

      <h2>{t('about')}</h2>
      <p className="muted">
        A lightweight, static news hub. No tracking, no database — just curated headlines.
      </p>
      <ul>
        <li>RSS + YouTube news aggregation.</li>
        <li>Category filtering & infinite scroll.</li>
        <li>Arabic + English support.</li>
        <li>Privacy first.</li>
      </ul>
    </section>
  )
}
