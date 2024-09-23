import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Grid } from '@mui/material'
import SignIn from './components/login/SignIn'
import SignUp from './components/login/SignUp'

function App(): React.ReactElement {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignIn />
    },
    {
      path: '/register',
      element: <SignUp />
    },
    {
      path: '/home',
      element: <div>Home Page</div>
    }
  ])
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
      <RouterProvider router={router} />
    </Grid>
  )
}

export default App
