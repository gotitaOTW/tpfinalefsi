import { StrictMode } from 'react'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import React from 'react'
import { UserProvider } from './contextos/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
)
