import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'


if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}


createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)
