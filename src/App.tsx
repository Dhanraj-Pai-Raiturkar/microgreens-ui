import React, { useState } from 'react'
import { Grid } from '@mui/material'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'

function App(): React.ReactElement {
  const [showSignup, setShowSignup] = useState<Boolean>(false)
  return (
    <Grid
      width={'100vw'}
      height={'100vh'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={theme => {
        return {
          backgroundColor: theme?.custom?.background?.primary?.light
        }
      }}
    >
      {showSignup ? (
        <SignUp toggleSignup={setShowSignup} />
      ) : (
        <SignIn toggleSignup={setShowSignup} />
      )}
    </Grid>
  )
}

export default App
