const updateFormInput: (
  key: string,
  value: string,
  setState: Function
) => void = (key: string, value: string, setState: Function) => {
  setState((prev: any) => {
    return {
      ...prev,
      [key]: value
    }
  })
}

export default updateFormInput
