import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  Modal,
  TextField,
  Typography
} from '@mui/material'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CardContentStyles,
  CardStyles,
  SignUpButtonStyles,
  ToggleButtonStyles
} from './styles'
import useSignUp from '../../hooks/login/useSignup'

interface VerifyEmailInterface {
  showModal: boolean
  email: string
  login: Function
  toggleModal: Function
}

const VerifyEmail: React.FC<VerifyEmailInterface> = props => {
  // const resendOtpTimer = 25
  const navigate = useNavigate()
  const { email, showModal, login, toggleModal } = props
  const [verificationCode, setVerificationCode] = useState<string>('')
  // const [timer, setTimer] = useState<number>(resendOtpTimer)
  // const [resendOtp, setResendOtp] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const { verifyEmailAsync, verifyingEmail, triggerResendOtp } = useSignUp()

  const handleSubmit: (e: SyntheticEvent) => Promise<void> = async (
    e: SyntheticEvent
  ) => {
    try {
      e.preventDefault()
      const payload = {
        email,
        confirmationCode: verificationCode
      }
      const response = await verifyEmailAsync(payload)
      if (!response?.status) setError(true)
      else setError(false)
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setResendOtp(true)
  //     setTimer(resendOtpTimer)
  //   }, resendOtpTimer * 1000)
  //   const interval = setInterval(() => {
  //     setTimer(prev => prev - 1)
  //   }, 1000)
  //   return () => {
  //     clearTimeout(timeout)
  //     clearInterval(interval)
  //   }
  // }, [])

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setResendOtp(true)
  //     setTimer(resendOtpTimer)
  //   }, resendOtpTimer * 1000)
  //   const interval = setInterval(() => {
  //     setTimer(prev => prev - 1)
  //   }, 1000)
  //   return () => {
  //     clearTimeout(timeout)
  //     clearInterval(interval)
  //   }
  // }, [resendOtp])

  useEffect(() => {
    if (!error) {
      login()
    }
  }, [error])

  const handleResendOtp: () => Promise<void> = async () => {
    await triggerResendOtp(email)
    // setResendOtp(false)
  }

  return (
    <Modal sx={{ height: '100%' }} open={showModal}>
      <Grid
        height={'100%'}
        width={'100%'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Card sx={{ ...CardStyles, height: 'auto' }}>
          <CardContent sx={CardContentStyles}>
            <form onSubmit={e => handleSubmit(e)}>
              <FormControl fullWidth>
                <Typography
                  fontWeight={800}
                  color={'primary'}
                  textAlign={'center'}
                  variant="h6"
                  fontSize={'1.1rem'}
                  gutterBottom
                >
                  EMAIL VERIFICATION
                </Typography>
                <Typography
                  component={'div'}
                  fontSize={'0.9rem'}
                  textAlign={'center'}
                >
                  We have sent an email at{' '}
                  {
                    <Typography fontWeight={800} variant="h6" fontSize={'1rem'}>
                      {email}
                    </Typography>
                  }{' '}
                  with a confirmation code.
                </Typography>
                <TextField
                  variant="standard"
                  sx={{ m: '0.8rem 0rem' }}
                  size="small"
                  onChange={(e: SyntheticEvent) =>
                    setVerificationCode((e?.target as HTMLInputElement).value)
                  }
                  error={error}
                  helperText={error ? 'invalid code' : ''}
                />
                <Button
                  disabled={!verificationCode?.length}
                  sx={SignUpButtonStyles}
                  size="small"
                  variant="contained"
                  //   onClick={() => handleSubmit()}
                  type="submit"
                >
                  {!verifyingEmail ? (
                    'submit'
                  ) : (
                    <CircularProgress sx={{ color: 'white' }} size={'1.5rem'} />
                  )}
                </Button>
                <Button
                  onClick={handleResendOtp}
                  variant="text"
                  disableTouchRipple
                  sx={ToggleButtonStyles}
                  // disabled={!resendOtp}
                >
                  resend code
                </Button>
                {/* {!resendOtp && (
                  <Typography
                    textAlign={'center'}
                    color={'primary'}
                    variant="subtitle2"
                  >
                    {timer}s
                  </Typography>
                )} */}
                <Button
                  onClick={() => toggleModal((prev: Boolean) => !prev)}
                  variant="text"
                  disableTouchRipple
                  sx={ToggleButtonStyles}
                >
                  cancel
                </Button>
              </FormControl>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Modal>
  )
}

export default VerifyEmail
