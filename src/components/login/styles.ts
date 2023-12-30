import { SxProps } from '@mui/material'

const CardStyles: SxProps = {
  width: { xs: '80%', sm: '60%', md: '50%', lg: '25%', xl: '25%' },
  borderRadius: 2,
  height: { xl: '70%', lg: '80%', md: '65%', sm: '50%', xs: '80vh' },
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  justifyContent: 'center',
  px: { xl: '2rem', lg: '0.5rem', md: '0.2rem', sm: '2rem', xs: 0 }
}
const CardMediaStyles: SxProps = {
  // height: 160,
  mb: '1rem',
  backgroundPosition: 'center'
}
const loginHeaderStryles: SxProps = { fontWeight: '600', my: '2rem' }
const CardContentStyles: SxProps = { display: 'flex', flexDirection: 'column' }
const TextFieldStyles: SxProps = { mb: '1.5rem', fontSize: '0.1rem' }
const RadioGroupStyles: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  mb: '1rem',
  justifyContent: 'space-evenly'
}
const SignUpButtonStyles: SxProps = { my: '1rem' }
const ToggleButtonStyles: SxProps = {
  width: '100%',
  fontSize: '0.6rem',
  '&:hover': {
    background: 'none'
  }
}

export {
  CardStyles,
  CardMediaStyles,
  CardContentStyles,
  TextFieldStyles,
  RadioGroupStyles,
  SignUpButtonStyles,
  ToggleButtonStyles,
  loginHeaderStryles
}
