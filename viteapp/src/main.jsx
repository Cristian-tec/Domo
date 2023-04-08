import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import './index.css'
import MqCOnnector from './Context/MqConnector'

ReactDOM.createRoot(document.getElementById('root')).render(
  <MqCOnnector>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MqCOnnector>
)
