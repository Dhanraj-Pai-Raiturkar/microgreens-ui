import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import theme from './theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
