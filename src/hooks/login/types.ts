import { formValidationType } from '../../components/login/types'

export interface SignUpRequestBody {
  name: string
  gender: string
  email: string
  password: string
}

export interface SignInRequestBody {
  email: string
  password: string
}

export type signUpType = (
  data: SignUpRequestBody
) => Promise<{ status: boolean; message: string }>
export type signInType = (
  data: SignInRequestBody
) => Promise<{ status: boolean; message: string }>
export type verifyEmailType = (
  data: verifyEmail
) => Promise<{ status: boolean; message: string }>
export type useSignUpType = {
  signUp: signUpType
  verifyEmailAsync: verifyEmailType
  signingUp: boolean
  verifyingEmail: boolean
  signIn: signInType
  signingIn: boolean
}

export type verifyEmail = {
  email: string
  confirmationCode: string
}

export type validationStateType = { [key: string]: formValidationType }
export type validateType = (
  key: string,
  value: string,
  message: string,
  password?: string,
  confirmPassword?: string
) => void
export type fieldsType = Record<string, RegExp | Function>
export type useValidateType = {
  validate: validateType
  validationState: validationStateType
}
