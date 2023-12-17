import { SxProps } from '@mui/material'

const CardStyles: SxProps = {
  width: { xs: '80%', sm: '40%', md: '30%', lg: '20%', xl: '10%' },
  borderRadius: 2
}
const CardMediaStyles = {
  height: 160,
  mb: '1rem',
  backgroundPosition: 'center'
}
const CardContentStyles = { display: 'flex', flexDirection: 'column' }
const TextFieldStyles = { mb: '1rem' }
const RadioGroupStyles = {
  display: 'flex',
  flexDirection: 'row',
  mb: '1rem',
  justifyContent: 'space-evenly'
}
const SignUpButtonStyles = { my: '1rem' }
const ToggleButtonStyles = {
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
  ToggleButtonStyles
}
