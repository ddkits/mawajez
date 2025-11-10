import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { I18nProvider } from './i18n.jsx'
import App from './App'
import './styles.css'
import { loadTheme } from "./theme";
loadTheme();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ 
  v7_startTransition: true,
  v7_relativeSplatPath: true 
}}>
      <I18nProvider>
        <App />
      </I18nProvider>
    </BrowserRouter>
  </React.StrictMode>
)
