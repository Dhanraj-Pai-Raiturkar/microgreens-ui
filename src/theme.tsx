import { createTheme } from '@mui/material'
import React from 'react'

type typography = {
  primary?: {
    color?: {
      main?: string
      light?: string
      dark?: string
    }
    font?: {
      size?: string
      weight?: string
      lineHeight?: string
      letterSpacing: string
      family: string
    }
  }
  secondary?: {
    color?: {
      main?: string
      light?: string
      dark?: string
    }
    font?: {
      size?: string
      weight?: string
      lineHeight?: string
      letterSpacing: string
      family: string
    }
  }
}

type background = {
  primary?: {
    main?: string
    light?: string
    dark?: string
  }
  secondary?: {
    main?: string
    light?: string
    dark?: string
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    custom?: {
      typography?: typography
      background?: background
    }
  }
  interface ThemeOptions {
    custom?: {
      typography?: {
        primary?: {
          color?: {
            main?: React.CSSProperties['color']
            light?: React.CSSProperties['color']
            dark?: React.CSSProperties['color']
          }
          font?: {
            size?: React.CSSProperties['fontSize']
            weight?: React.CSSProperties['fontWeight']
            lineHeight?: React.CSSProperties['lineHeight']
            letterSpacing?: React.CSSProperties['letterSpacing']
            family?: React.CSSProperties['fontFamily']
          }
        }
        secondary?: {
          color?: {
            main?: React.CSSProperties['color']
            light?: React.CSSProperties['color']
            dark?: React.CSSProperties['color']
          }
          font?: {
            size?: React.CSSProperties['fontSize']
            weight?: React.CSSProperties['fontWeight']
            lineHeight?: React.CSSProperties['lineHeight']
            letterSpacing?: React.CSSProperties['letterSpacing']
            family?: React.CSSProperties['fontFamily']
          }
        }
      }
      background?: {
        primary?: {
          main?: React.CSSProperties['color']
          light?: React.CSSProperties['color']
          dark?: React.CSSProperties['color']
        }
        secondary?: {
          main?: React.CSSProperties['color']
          light?: React.CSSProperties['color']
          dark?: React.CSSProperties['color']
        }
      }
    }
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#399f2e'
    }
  },
  custom: {
    typography: {
      primary: {
        color: {
          main: '',
          light: '',
          dark: ''
        },
        font: {
          size: '',
          weight: '',
          family: '',
          letterSpacing: '',
          lineHeight: ''
        }
      }
    },
    background: {
      primary: {
        main: '#d3d3d3',
        light: '#f3f3f3',
        dark: '#2b2b2b'
      },
      secondary: {
        main: '#62cd32',
        light: '#49b51f',
        dark: '#399f2e'
      }
    }
  }
})

export default theme
