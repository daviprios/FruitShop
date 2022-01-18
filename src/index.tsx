import React from 'react'
import ReactDOM from 'react-dom'
import 'styles/global.sass'
import App from './routes'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)