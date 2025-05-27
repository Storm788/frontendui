import { createElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App.jsx'

const root = createRoot(document.getElementById('root'))
root.render(
  createElement(
    StrictMode,
    null,
    createElement(App, null)
  )
)