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

type signUpType = (data: SignUpRequestBody) => Promise<void>
type useSignUpType = {
  signUp: signUpType
  validate: validateType
  validationState: validationStateType
}

const validations: Record<string, RegExp> = {
  firstname: /^.{2,}$/,
  lastname: /^.{1,}$/,
  email: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{7,}$/
}

const useSignUp: () => useSignUpType = () => {
  const { validate, validationState } = useValidate(validations)
  const signUp: signUpType = async (data: SignUpRequestBody) => {
    try {
      const body: SignUpRequestBody = {
        ...data
      }
      const response = await axiosInstance.post('auth/sign-up', body, {
        timeout: 4000
      })
      console.log('response', response)
    } catch (error) {
      console.error(error)
    }
  }

  return { signUp, validate, validationState }
}

export default useSignUp
