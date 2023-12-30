import { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import {
  SignInRequestBody,
  SignUpRequestBody,
  signInType,
  signUpType,
  useSignUpType,
  verifyEmail,
  verifyEmailType
} from './types'

const useSignUp: () => useSignUpType = () => {
  const [signingUp, setSigningUp] = useState<boolean>(false)
  const [signingIn, setSigningIn] = useState<boolean>(false)
  const [verifyingEmail, setVerifyingEmail] = useState<boolean>(false)
  const signUp: signUpType = async (data: SignUpRequestBody) => {
    try {
      setSigningUp(true)
      const body: SignUpRequestBody = {
        ...data
      }
      const response = await axiosInstance.post('auth/sign-up', body)
      console.log('response', response)
      if (response?.status === 200 || response?.status === 201)
        return { status: true, message: response?.data.message }
      return { status: false, message: 'failed' }
    } catch (error) {
      setSigningUp(false)
      console.error(error)
      return { status: false, message: 'failed' }
    } finally {
      setSigningUp(false)
    }
  }

  const verifyEmailAsync: verifyEmailType = async (data: verifyEmail) => {
    try {
      setVerifyingEmail(true)
      const body: verifyEmail = {
        ...data
      }
      const response = await axiosInstance.post('auth/confirm-sign-up', body)
      console.log('response', response)
      if (response?.status === 200 || response?.status === 201)
        return { status: true, message: response?.data.message }
      return { status: false, message: 'failed' }
    } catch (error) {
      setVerifyingEmail(false)
      console.error(error)
      return { status: false, message: 'failed' }
    } finally {
      setVerifyingEmail(false)
    }
  }

  const signIn: signInType = async (data: SignInRequestBody) => {
    try {
      setSigningIn(true)
      const body: SignInRequestBody = {
        ...data
      }
      const response = await axiosInstance.post('auth/sign-in', body)
      console.log('response', response)
      if (response?.status === 200 || response?.status === 201)
        return { status: true, message: response?.data.message }
      return { status: false, message: 'failed' }
    } catch (error) {
      setSigningIn(false)
      console.error(error)
      return { status: false, message: 'failed' }
    } finally {
      setSigningIn(false)
    }
  }

  return {
    signUp,
    signIn,
    verifyEmailAsync,
    signingUp,
    signingIn,
    verifyingEmail
  }
}

export default useSignUp
