import React from 'react'
import ReactDOM from 'react-dom/client'
import { IverApp } from './IverApp.jsx'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <IverApp />
    </BrowserRouter>
  // </React.StrictMode>,
)
