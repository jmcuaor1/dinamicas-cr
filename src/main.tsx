import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AdminPage from './AdminPage'
import './index.css'

const isAdminRoute = window.location.pathname.replace(/\/+$/, '') === '/admin'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isAdminRoute ? <AdminPage /> : <App />}
  </React.StrictMode>,
)
