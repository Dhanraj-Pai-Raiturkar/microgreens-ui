import axiosInstance from '../../utils/axiosInstance'

export interface SignUpRequestBody {
  name: string
  gender: string
  email: string
  password: string
}

export interface useSignUpInterface {
  signUp: Function
}

const useSignUp: () => useSignUpInterface = () => {
  const signUp: (data: SignUpRequestBody) => Promise<void> = async (
    data: SignUpRequestBody
  ) => {
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

  return { signUp }
}

export default useSignUp
