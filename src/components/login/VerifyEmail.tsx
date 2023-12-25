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
  const { email, showModal, login, toggleModal } = props
  const [verificationCode, setVerificationCode] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const { verifyEmail, verifyingEmail } = useSignUp()

  const handleSubmit: (e: SyntheticEvent) => Promise<void> = async (
    e: SyntheticEvent
  ) => {
    try {
      e.preventDefault()
      const payload = {
        email,
        confirmationCode: verificationCode
      }
      const response = await verifyEmail(payload)
      if (!response?.status) setError(true)
      else setError(false)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!error) {
      login()
    }
  }, [error])

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
        <Card sx={CardStyles}>
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
