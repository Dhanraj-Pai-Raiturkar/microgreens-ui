import {
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import React, { SyntheticEvent, useState } from 'react'
import {
  CardContentStyles,
  CardMediaStyles,
  CardStyles,
  RadioGroupStyles,
  SignUpButtonStyles,
  TextFieldStyles,
  ToggleButtonStyles
} from './styles'
import useSignUp, { SignUpRequestBody } from '../../hooks/login/useSignup'
import { SignUpForm, SignUpProps } from './loginInterfaces'

const SignUp: React.FC<SignUpProps> = props => {
  const { toggleSignup } = props
  const [signupForm, setSignupForm] = useState<SignUpForm>({
    firstname: '',
    lastname: '',
    email: '',
    gender: 'Male',
    password: '',
    confirmPassword: ''
  })
  const { signUp, validate, validationState } = useSignUp()

  console.log(validationState)

  const updateFormInput: (key: string, value: string) => void = (
    key: string,
    value: string
  ) => {
    setSignupForm((prev: SignUpForm) => {
      return {
        ...prev,
        [key]: value
      }
    })
  }

  const handleFirstnameChange = (e: SyntheticEvent, key: string): void => {
    const firstname: string = (e.target as HTMLInputElement).value
    updateFormInput(key, firstname)
    validate(key, firstname, 'min 2 characters')
  }

  const handleLastnameChange = (e: SyntheticEvent, key: string): void => {
    const lastname: string = (e.target as HTMLInputElement).value
    updateFormInput(key, lastname)
    validate(key, lastname, 'please provide a firstname')
  }

  const handleEmailChange = (e: SyntheticEvent, key: string): void => {
    const email: string = (e.target as HTMLInputElement).value
    updateFormInput(key, email)
    validate(key, email, 'please provide a firstname')
  }

  const handleGenderChange = (e: SyntheticEvent, key: string): void => {
    const gender: string = (e.target as HTMLInputElement).value
    updateFormInput(key, gender)
  }

  const handlePasswordChange = (e: SyntheticEvent, key: string): void => {
    const password: string = (e.target as HTMLInputElement).value
    updateFormInput(key, password)
  }

  const handleConfirmPasswordChange = (
    e: SyntheticEvent,
    key: string
  ): void => {
    const confirmPassword: string = (e.target as HTMLInputElement).value
    updateFormInput(key, confirmPassword)
    validate(key, confirmPassword, 'please provide a firstname')
  }

  const handleSignUp: () => Promise<void> = async () => {
    try {
      console.log(signupForm)
      const payload: SignUpRequestBody = {
        name: `${signupForm?.firstname?.trim()} ${signupForm?.lastname?.trim()}`,
        email: signupForm?.email,
        gender: signupForm?.gender,
        password: signupForm?.password
      }
      await signUp(payload)
      console.log(payload)
    } catch (error) {
      console.error('handleSignUp error', error)
    }
  }

  return (
    <Grid
      width={'100%'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Card sx={CardStyles}>
        <CardMedia image={'/login_banner.png'} sx={CardMediaStyles} />
        <CardContent sx={CardContentStyles}>
          <FormControl>
            <TextField
              size="small"
              variant="standard"
              placeholder="First Name"
              sx={TextFieldStyles}
              onChange={(e: SyntheticEvent) =>
                handleFirstnameChange(e, 'firstname')
              }
              onBlur={(e: SyntheticEvent) =>
                handleFirstnameChange(e, 'firstname')
              }
              error={validationState.firstname.error}
              helperText={
                validationState.firstname.error
                  ? validationState.firstname.message
                  : ''
              }
            />
            <TextField
              size="small"
              variant="standard"
              placeholder="Last Name"
              sx={TextFieldStyles}
              onChange={(e: SyntheticEvent) =>
                handleLastnameChange(e, 'lastname')
              }
              onBlur={(e: SyntheticEvent) =>
                handleLastnameChange(e, 'lastname')
              }
              error={validationState.lastname.error}
              helperText={
                validationState.lastname.error
                  ? validationState.lastname.message
                  : ''
              }
            />
            <TextField
              size="small"
              variant="standard"
              type="email"
              placeholder="Email"
              sx={TextFieldStyles}
              onChange={(e: SyntheticEvent) => handleEmailChange(e, 'email')}
              onBlur={(e: SyntheticEvent) => handleEmailChange(e, 'email')}
              error={validationState.email.error}
              helperText={
                validationState.email.error ? validationState.email.message : ''
              }
            />
            <RadioGroup
              sx={RadioGroupStyles}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Male"
              name="radio-buttons-group"
              onChange={(e: SyntheticEvent) => handleGenderChange(e, 'gender')}
            >
              <FormControlLabel
                value="Male"
                control={<Radio size="small" />}
                label={<Typography>Male</Typography>}
              />
              <FormControlLabel
                value="Female"
                control={<Radio size="small" />}
                label={<Typography>Female</Typography>}
              />
            </RadioGroup>
            <TextField
              size="small"
              variant="standard"
              type="password"
              placeholder="Password"
              sx={TextFieldStyles}
              onChange={(e: SyntheticEvent) =>
                handlePasswordChange(e, 'password')
              }
              onBlur={(e: SyntheticEvent) =>
                handlePasswordChange(e, 'password')
              }
              error={validationState.password.error}
              helperText={
                validationState.password.error
                  ? validationState.password.message
                  : ''
              }
            />
            <TextField
              size="small"
              variant="standard"
              type="password"
              placeholder="Confirm Password"
              sx={TextFieldStyles}
              onChange={(e: SyntheticEvent) =>
                handleConfirmPasswordChange(e, 'confirmPassword')
              }
              onBlur={(e: SyntheticEvent) =>
                handleConfirmPasswordChange(e, 'confirmPassword')
              }
            />
            <Button
              sx={SignUpButtonStyles}
              size="small"
              variant="contained"
              onClick={() => handleSignUp()}
            >
              Sign Up
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
            Already have an account?
            <br />
            Login here
          </>
        }
      </Button>
    </Grid>
  )
}

export default SignUp
