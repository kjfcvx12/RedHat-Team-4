import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CafeContextPro from './components/CafeContextPro.jsx'

createRoot(document.getElementById('root')).render(
  <CafeContextPro>
    <App />
  </CafeContextPro>,
)
