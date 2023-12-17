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
import React from 'react'

interface SignUpProps {
  toggleSignup: Function
}

const SignUp: React.FC<SignUpProps> = props => {
  const { toggleSignup } = props
  return (
    <Grid
      width={'100%'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Card
        sx={{
          width: { xs: '80%', sm: '40%', md: '30%', lg: '20%', xl: '10%' },
          borderRadius: 2
        }}
      >
        <CardMedia
          image={'/login_banner.png'}
          sx={{
            height: 160,
            mb: '1rem',
            backgroundPosition: 'center'
          }}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormControl>
            <TextField
              size="small"
              variant="standard"
              placeholder="First Name"
              sx={{ mb: '1rem' }}
            />
            <TextField
              size="small"
              variant="standard"
              placeholder="Last Name"
              sx={{ mb: '1rem' }}
            />
            <TextField
              size="small"
              variant="standard"
              type="email"
              placeholder="Email"
              sx={{ mb: '1rem' }}
            />
            <RadioGroup
              sx={{
                display: 'flex',
                flexDirection: 'row',
                mb: '1rem',
                justifyContent: 'space-evenly'
              }}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Male"
              name="radio-buttons-group"
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
              sx={{ mb: '1rem' }}
            />
            <TextField
              size="small"
              variant="standard"
              type="password"
              placeholder="Confirm Password"
              sx={{ mb: '1rem' }}
            />
            <Button sx={{ my: '1rem' }} size="small" variant="contained">
              Sign Up
            </Button>
          </FormControl>
        </CardContent>
      </Card>
      <Button
        onClick={() => toggleSignup((prev: Boolean) => !prev)}
        variant="text"
        disableTouchRipple
        sx={{
          width: '100%',
          fontSize: '0.6rem',
          '&:hover': {
            background: 'none'
          }
        }}
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
