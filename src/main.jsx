import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LogIn from './pages/Auth/LogIn/LogIn.jsx'
import ReactDOM from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <LogIn /> */}
  </StrictMode>,
)
