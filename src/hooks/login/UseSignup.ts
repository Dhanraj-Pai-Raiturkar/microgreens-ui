import { useEffect } from 'react'
import axiosInstance from '../../utils/axiosInstance'

export interface SignUpRequestBody {
  name: string
  gender: string
  email: string
  password: string
}

const UseSignUp: (data: SignUpRequestBody) => void = (
  data: SignUpRequestBody
) => {
  const signUp: () => Promise<void> = async () => {
    try {
      const body: SignUpRequestBody = {
        ...data
      }
      const response = await axiosInstance.post('/sign-up', body)
      console.log('response', response)
    } catch (error) {
      console.error(error)
    }
  }
  console.log('------->')
  useEffect(() => {
    signUp()
  }, [data])

  return () => {}
}

export default UseSignUp
