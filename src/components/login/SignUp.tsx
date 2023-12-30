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
import CircularProgress from '@mui/material/CircularProgress'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import {
  CardContentStyles,
  CardMediaStyles,
  CardStyles,
  RadioGroupStyles,
  SignUpButtonStyles,
  TextFieldStyles,
  ToggleButtonStyles,
  loginHeaderStryles
} from './styles'
import useSignUp from '../../hooks/login/useSignup'
import { SignUpForm, SignUpProps } from './types'
import VerifyEmail from './VerifyEmail'
import { SignUpRequestBody } from '../../hooks/login/types'
import updateFormInput from '../../utils/updateFormInput'
import handleDisableSignup from '../../utils/disableSubmitForm'
import useValidate from '../../hooks/validation/useValidate'

const SignUp: React.FC<SignUpProps> = props => {
  const { toggleSignup } = props
  const [disableSubmit, setDisableSubmit] = useState(true)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [signupForm, setSignupForm] = useState<SignUpForm>({
    firstname: '',
    lastname: '',
    email: '',
    gender: 'Male',
    password: '',
    confirmPassword: ''
  })
  const validations: Record<string, RegExp | Function> = {
    firstname: /^.{2,}$/,
    lastname: /^.{1,}$/,
    email: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,}$/,
    confirmPassword: (password: string, confirmPassword: string) => {
      return password === confirmPassword
    }
  }
  const { signUp, signingUp } = useSignUp()
  const { validate, validationState } = useValidate(validations)
  const handleFirstnameChange = (e: SyntheticEvent, key: string): void => {
    const firstname: string = (e.target as HTMLInputElement).value
    updateFormInput(key, firstname, setSignupForm)
    validate(key, firstname, 'min 2 characters')
  }

  const handleLastnameChange = (e: SyntheticEvent, key: string): void => {
    const lastname: string = (e.target as HTMLInputElement).value
    updateFormInput(key, lastname, setSignupForm)
    validate(key, lastname, 'min 1 character')
  }

  const handleEmailChange = (e: SyntheticEvent, key: string): void => {
    const email: string = (e.target as HTMLInputElement).value
    updateFormInput(key, email, setSignupForm)
    validate(key, email, 'please provide a valid email')
  }

  const handleGenderChange = (e: SyntheticEvent, key: string): void => {
    const gender: string = (e.target as HTMLInputElement).value
    updateFormInput(key, gender, setSignupForm)
  }

  const handlePasswordChange = (e: SyntheticEvent, key: string): void => {
    const password: string = (e.target as HTMLInputElement).value
    updateFormInput(key, password, setSignupForm)
    validate(
      key,
      password,
      'min 8 characters,atleast 1 upppercase,atleast 1 special character'
    )
  }

  const handleConfirmPasswordChange = (
    e: SyntheticEvent,
    key: string
  ): void => {
    const confirmPassword: string = (e.target as HTMLInputElement).value
    updateFormInput(key, confirmPassword, setSignupForm)
    validate(
      key,
      confirmPassword,
      'password does not match',
      signupForm?.password,
      confirmPassword
    )
  }

  const handleSignUp: (e: SyntheticEvent) => Promise<void> = async (
    e: SyntheticEvent
  ) => {
    try {
      e.preventDefault()
      const payload: SignUpRequestBody = {
        name: `${signupForm?.firstname?.trim()} ${signupForm?.lastname?.trim()}`,
        email: signupForm?.email,
        gender: signupForm?.gender,
        password: signupForm?.password
      }
      const response = await signUp(payload)
      if (response?.status) setShowModal(true)
      else setShowModal(false)
    } catch (error) {
      console.error('handleSignUp error', error)
    }
  }

  const handleRedirectToLogin: () => void = () => {
    toggleSignup((prev: boolean) => !prev)
  }

  useEffect(() => {
    setDisableSubmit(handleDisableSignup(signupForm, validationState))
  }, [validationState])

  return (
    <Grid
      width={'100%'}
      height={'100%'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <VerifyEmail
        login={handleRedirectToLogin}
        showModal={showModal}
        email={signupForm?.email}
        toggleModal={setShowModal}
      />
      <Card sx={CardStyles}>
        <CardMedia image={'/login_banner.png'} sx={CardMediaStyles} />
        <CardContent sx={CardContentStyles}>
          <Typography
            sx={{ ...loginHeaderStryles, mb: 0 }}
            color={'primary.dark'}
            variant="h5"
          >
            Join the microgreens family
          </Typography>
          <Typography
            sx={{ ...loginHeaderStryles, mt: 0 }}
            color={'primary.dark'}
            variant="h6"
          >
            Sign up now!
          </Typography>
          <form style={{ width: '100%' }} onSubmit={e => handleSignUp(e)}>
            <FormControl fullWidth>
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
                  validationState.email.error
                    ? validationState.email.message
                    : ''
                }
              />
              <RadioGroup
                sx={RadioGroupStyles}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Male"
                name="radio-buttons-group"
                onChange={(e: SyntheticEvent) =>
                  handleGenderChange(e, 'gender')
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
                  handlePasswordChange(e, 'password')
                }
                onBlur={(e: SyntheticEvent) =>
                  handlePasswordChange(e, 'password')
                }
                error={validationState.password.error}
                helperText={
                  validationState.password.error ? (
                    <ul style={{ padding: 0, paddingLeft: '1rem' }}>
                      {validationState.password.message
                        .split(',')
                        .map((lineitem: string) => (
                          <li>{lineitem}</li>
                        ))}
                    </ul>
                  ) : (
                    ''
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
                  handleConfirmPasswordChange(e, 'confirmPassword')
                }
                error={validationState.confirmPassword.error}
                helperText={
                  validationState.confirmPassword.error
                    ? validationState.confirmPassword.message
                    : ''
                }
              />
              <Button
                type="submit"
                sx={SignUpButtonStyles}
                size="small"
                variant="contained"
                disabled={disableSubmit}
              >
                {!signingUp ? (
                  'Sign Up'
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
