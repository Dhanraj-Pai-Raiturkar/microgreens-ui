import { useState } from 'react'
import { formValidationType } from '../../components/login/loginInterfaces'

export type validationStateType = { [key: string]: formValidationType }
export type validateType = (key: string, value: string, message: string) => void
export type fieldsType = Record<string, RegExp>
type useValidateType = {
  validate: validateType
  validationState: validationStateType
}

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
  const validate = (key: string, value: string, message: string): void => {
    const isError: boolean = !validationState[key].validationRegex.test(value)
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
  //   console.log(validate)
  return { validate, validationState }
}

export default useValidate
