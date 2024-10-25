import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './components/Home.tsx'
import NavMenu from './components/NavMenu.tsx'

import './assets/css/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NavMenu />
    <Home />
  </StrictMode>,
)
