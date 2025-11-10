import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Channel from "./pages/Channel";
import Contact from "./pages/Contact";
import Videos from "./pages/Videos";
import About from "./pages/About";
import Article from "./pages/Article";
import { I18nProvider } from "./i18n.jsx";
import { loadTheme } from "./theme";
loadTheme();

export default function App() {
  return (
      <I18nProvider>
        <Header />
        <main className="container">
          <Routes>
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/ar" replace />} />
            <Route path="/:lang" element={<Home />} />             
            <Route path="/:lang/videos" element={<Videos />} />
            <Route path="/:lang/about" element={<About />} />
            <Route path="/:lang/contact" element={<Contact />} />
            {/* Channel route first */}
  <Route path="/:lang/channel/:id" element={<Channel />} />

  {/* Article route after */}
  <Route path="/:lang/:sourceId/:slug" element={<Article />} />
          </Routes>
        </main>
        <Footer />
      </I18nProvider>
  );
}
