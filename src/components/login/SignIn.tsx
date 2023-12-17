import {
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  TextField
} from '@mui/material'
import React from 'react'
import {
  CardContentStyles,
  CardStyles,
  SignUpButtonStyles,
  TextFieldStyles,
  ToggleButtonStyles
} from './styles'

interface SignUpProps {
  toggleSignup: Function
}

const SignIn: React.FC<SignUpProps> = props => {
  const { toggleSignup } = props
  return (
    <Grid
      width={'100%'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Card sx={CardStyles}>
        <CardMedia
          image={'/login_banner.png'}
          sx={{
            height: 160,
            mb: '1rem',
            backgroundPosition: 'center'
          }}
        />
        <CardContent sx={CardContentStyles}>
          <FormControl>
            <TextField
              size="small"
              variant="standard"
              type="email"
              placeholder="Email"
              sx={TextFieldStyles}
            />
            <TextField
              size="small"
              variant="standard"
              type="password"
              placeholder="Password"
              sx={TextFieldStyles}
            />
            <Button sx={SignUpButtonStyles} size="small" variant="contained">
              Login
            </Button>
          </FormControl>
        </CardContent>
      </Card>
      <Button
        onClick={() => toggleSignup((prev: Boolean) => !prev)}
        variant="text"
        disableTouchRipple
        sx={ToggleButtonStyles}
      >
        {
          <>
            Dont have an account?
            <br />
            Sign Up here
          </>
        }
      </Button>
    </Grid>
  )
}

export default SignIn
