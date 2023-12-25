import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControl,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import {
  CardContentStyles,
  CardStyles,
  SignUpButtonStyles,
  TextFieldStyles,
  ToggleButtonStyles
} from './styles'
import { SignInProps } from './types'
import updateFormInput from '../../utils/updateFormInput'
import handleDisableSignup from '../../utils/disableSubmitForm'
import useSignUp from '../../hooks/login/useSignup'
import { SignInRequestBody } from '../../hooks/login/types'
import useValidate from '../../hooks/validation/useValidate'

interface SignUpProps {
  toggleSignup: Function
}

const SignIn: React.FC<SignUpProps> = props => {
  const { toggleSignup } = props
  const [error, setError] = useState({
    error: false,
    message: ''
  })
  const [disableSubmit, setDisableSubmit] = useState(false)
  const [loginForm, setLoginForm] = useState<SignInProps>({
    email: '',
    password: ''
  })
  const validations: Record<string, RegExp | Function> = {
    email: /^.{0,}$/,
    password: /^.{0,}$/
  }
  const { signingIn, signIn } = useSignUp()
  const { validate, validationState } = useValidate(validations)
  const handleEmailChange = (e: SyntheticEvent, key: string): void => {
    const email: string = (e.target as HTMLInputElement).value
    updateFormInput(key, email, setLoginForm)
    validate(key, email, 'Required field')
  }
  const handlePasswordChange = (e: SyntheticEvent, key: string): void => {
    const password: string = (e.target as HTMLInputElement).value
    updateFormInput(key, password, setLoginForm)
    validate(key, password, 'Required field')
  }
  const handleSignIn: (e: SyntheticEvent) => Promise<void> = async (
    e: SyntheticEvent
  ) => {
    try {
      e.preventDefault()
      const payload: SignInRequestBody = {
        email: loginForm?.email,
        password: loginForm?.password
      }
      const response = await signIn(payload)
      if (!response?.status)
        setError((prev: any) => {
          return {
            ...prev,
            error: true,
            message: 'Email or password is incorrect'
          }
        })
      else
        setError((prev: any) => {
          return {
            ...prev,
            error: false,
            message: 'Successfully Logged In'
          }
        })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    setDisableSubmit(handleDisableSignup(loginForm, validationState))
  }, [validationState])
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
          <form onSubmit={e => handleSignIn(e)}>
            <FormControl fullWidth>
              <TextField
                size="small"
                variant="standard"
                type="email"
                placeholder="Email"
                sx={TextFieldStyles}
                onChange={e => handleEmailChange(e, 'email')}
                onBlur={e => handleEmailChange(e, 'email')}
                error={validationState.email.error}
                helperText={
                  validationState.email.error
                    ? validationState.email.message
                    : ''
                }
              />
              <TextField
                size="small"
                variant="standard"
                type="password"
                placeholder="Password"
                sx={TextFieldStyles}
                onChange={e => handlePasswordChange(e, 'password')}
                onBlur={e => handlePasswordChange(e, 'password')}
                error={validationState.password.error}
                helperText={
                  validationState.password.error
                    ? validationState.password.message
                    : ''
                }
              />
              <Typography
                textAlign={'center'}
                width={'100%'}
                fontWeight={600}
                color={error.error ? 'red' : 'primary'}
                variant="subtitle2"
              >
                {error.message}
              </Typography>
              <Button
                disabled={disableSubmit}
                sx={SignUpButtonStyles}
                size="small"
                variant="contained"
                type="submit"
              >
                {!signingIn ? (
                  'Login'
                ) : (
                  <CircularProgress sx={{ color: 'white' }} size={'1.5rem'} />
                )}
              </Button>
            </FormControl>
          </form>
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
