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
  ToggleButtonStyles
} from './styles'
import useSignUp, { SignUpRequestBody } from '../../hooks/login/useSignup'
import { SignUpForm, SignUpProps } from './loginInterfaces'
import VerifyEmail from './VerifyEmail'

const SignUp: React.FC<SignUpProps> = props => {
  const { toggleSignup } = props
  const [disableSubmite, setDisableSubmit] = useState(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [signupForm, setSignupForm] = useState<SignUpForm>({
    firstname: '',
    lastname: '',
    email: '',
    gender: 'Male',
    password: '',
    confirmPassword: ''
  })
  const { signUp, validate, validationState, signingUp } = useSignUp()

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
    validate(key, lastname, 'min 1 character')
  }

  const handleEmailChange = (e: SyntheticEvent, key: string): void => {
    const email: string = (e.target as HTMLInputElement).value
    updateFormInput(key, email)
    validate(key, email, 'please provide a valid email')
  }

  const handleGenderChange = (e: SyntheticEvent, key: string): void => {
    const gender: string = (e.target as HTMLInputElement).value
    updateFormInput(key, gender)
  }

  const handlePasswordChange = (e: SyntheticEvent, key: string): void => {
    const password: string = (e.target as HTMLInputElement).value
    updateFormInput(key, password)
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
    updateFormInput(key, confirmPassword)
    validate(
      key,
      confirmPassword,
      'password does not match',
      signupForm?.password,
      confirmPassword
    )
  }

  const handleDisableSignup = (): boolean => {
    let disableButton: boolean = false
    const emptyFields: number = Object.keys(signupForm).filter(
      (key: string) => {
        return (signupForm as any)[key].length === 0
      }
    ).length
    Object.keys(validationState).forEach(field => {
      if (validationState[field].error || emptyFields) disableButton = true
    })
    return disableButton
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
    setDisableSubmit(handleDisableSignup())
  }, [validationState])

  // const handleEnter: () => void = (e: any) => {
  //   console.log(e.key)
  //   if (e.key === 'Enter') handleSignUp(e)
  // }
  // window.addEventListener('keyup', handleEnter)

  return (
    <Grid
      width={'100%'}
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
              {/* </Tooltip> */}
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
                disabled={disableSubmite}
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
