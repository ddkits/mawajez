import { Link } from "react-router-dom";
import { useI18n } from "../i18n.jsx";

export default function SourceBadge({ id, name }) {
  const { lang } = useI18n();

  return (
    <Link
      to={`/${lang}/channel/${id}`}
      className="badge"
      title={name}
      style={{ textDecoration: "none" }}
    >
      {name}
    </Link>
  );
}
