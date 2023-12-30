export interface SignUpProps {
  toggleSignup: Function
}

export interface SignUpForm {
  firstname: string
  lastname: string
  email: string
  gender: string
  password: string
  confirmPassword: string
}

export interface formValidationType {
  error: boolean
  validationRegex: RegExp | Function
  message: string
}

export interface SignInProps {
  email: string
  password: string
}
