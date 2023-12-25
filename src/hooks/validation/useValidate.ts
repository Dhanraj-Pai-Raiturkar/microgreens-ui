import { useState } from 'react'
import {
  fieldsType,
  useValidateType,
  validationStateType
} from '../login/types'

const useValidate = (fields: fieldsType): useValidateType => {
  const validationFields: string[] = Object.keys(fields)
  const initialState = validationFields.reduce(
    (acc: validationStateType, key: string) => {
      return {
        ...acc,
        [key]: { validationRegex: fields[key], error: false, message: '' }
      }
    },
    {}
  )
  const [validationState, setValidationState] =
    useState<validationStateType>(initialState)
  const validate = (
    key: string,
    value: string,
    message: string,
    password?: string,
    confirmPassword?: string
  ): void => {
    const validator = validationState[key].validationRegex
    let isError: boolean
    if (validator instanceof Function)
      isError = !validator(password, confirmPassword)
    else isError = !validator.test(value)
    if (isError) {
      setValidationState((prev: any) => {
        return {
          ...prev,
          [key]: { ...prev[key], error: true, message }
        }
      })
    } else {
      setValidationState((prev: any) => {
        return {
          ...prev,
          [key]: { ...prev[key], error: false, message }
        }
      })
    }
  }
  return { validate, validationState }
}

export default useValidate
