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
import useSignUp, { SignUpRequestBody } from '../../hooks/login/UseSignup'

interface SignUpProps {
  toggleSignup: Function
}

interface SignUpForm {
  firstname: string
  lastname: string
  email: string
  gender: string
  password: string
  confirmPassword: string
}

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

  const handleSignUp: () => Promise<void> = async () => {
    try {
      console.log(signupForm)
      const payload: SignUpRequestBody = {
        name: `${signupForm?.firstname?.trim()} ${signupForm?.lastname?.trim()}`,
        email: signupForm?.email,
        gender: signupForm?.gender,
        password: signupForm?.password
      }
      await useSignUp(payload)
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
                updateFormInput(
                  'firstname',
                  (e.target as HTMLInputElement).value
                )
              }
            />
            <TextField
              size="small"
              variant="standard"
              placeholder="Last Name"
              sx={TextFieldStyles}
              onChange={(e: SyntheticEvent) =>
                updateFormInput(
                  'lastname',
                  (e.target as HTMLInputElement).value
                )
              }
            />
            <TextField
              size="small"
              variant="standard"
              type="email"
              placeholder="Email"
              sx={TextFieldStyles}
              onChange={(e: SyntheticEvent) =>
                updateFormInput('email', (e.target as HTMLInputElement).value)
              }
            />
            <RadioGroup
              sx={RadioGroupStyles}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Male"
              name="radio-buttons-group"
              onChange={(e: SyntheticEvent) =>
                updateFormInput('gender', (e.target as HTMLInputElement).value)
              }
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
                updateFormInput(
                  'password',
                  (e.target as HTMLInputElement).value
                )
              }
            />
            <TextField
              size="small"
              variant="standard"
              type="password"
              placeholder="Confirm Password"
              sx={TextFieldStyles}
              onChange={(e: SyntheticEvent) =>
                updateFormInput(
                  'confirmPassword',
                  (e.target as HTMLInputElement).value
                )
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
