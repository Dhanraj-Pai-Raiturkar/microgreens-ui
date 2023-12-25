import { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import useValidate, {
  validateType,
  validationStateType
} from '../validation/useValidate'

export interface SignUpRequestBody {
  name: string
  gender: string
  email: string
  password: string
}

type signUpType = (
  data: SignUpRequestBody
) => Promise<{ status: boolean; message: string }>
type verifyEmailType = (
  data: verifyEmail
) => Promise<{ status: boolean; message: string }>
type useSignUpType = {
  signUp: signUpType
  verifyEmail: verifyEmailType
  validate: validateType
  validationState: validationStateType
  signingUp: boolean
  verifyingEmail: boolean
}

type verifyEmail = {
  email: string
  confirmationCode: string
}

const validations: Record<string, RegExp | Function> = {
  firstname: /^.{2,}$/,
  lastname: /^.{1,}$/,
  email: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,}$/,
  confirmPassword: (password: string, confirmPassword: string) => {
    return password === confirmPassword
  }
}

const useSignUp: () => useSignUpType = () => {
  const [signingUp, setSigningUp] = useState<boolean>(false)
  const [verifyingEmail, setVerifyingEmail] = useState<boolean>(false)
  const { validate, validationState } = useValidate(validations)
  const signUp: signUpType = async (data: SignUpRequestBody) => {
    try {
      setSigningUp(true)
      const body: SignUpRequestBody = {
        ...data
      }
      const response = await axiosInstance.post('auth/sign-up', body, {
        timeout: 10000
      })
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

  const verifyEmail: verifyEmailType = async (data: verifyEmail) => {
    try {
      setVerifyingEmail(true)
      const body: verifyEmail = {
        ...data
      }
      const response = await axiosInstance.post('auth/confirm-sign-up', body, {
        timeout: 10000
      })
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

  return {
    signUp,
    validate,
    validationState,
    signingUp,
    verifyEmail,
    verifyingEmail
  }
}

export default useSignUp
