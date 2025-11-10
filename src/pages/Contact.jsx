import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useI18n } from "../i18n.jsx";

export default function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    await fetch("https://formspree.io/f/mnqykrya", {
      method: "POST",
      body: fd,
      headers: { Accept: "application/json" }
    });
    setSent(true);
  };

  return (
    <section className="contact-page">
      <Helmet>
        <title>Mawajez — {t('contact')}</title>
      </Helmet>

      <h1>{t('contact_us')}</h1>

      {sent ? (
        <p className="success">{t('message_sent_success')}</p>
      ) : (
        <form onSubmit={onSubmit} className="contact-form">
          <input name="name" placeholder={t('your_name')} required />
          <input name="email" type="email" placeholder={t('your_email')} required />
          <textarea name="message" placeholder={t('your_message')} required />
          <button type="submit">{t('send')}</button>
        </form>
      )}
    </section>
  );
}
