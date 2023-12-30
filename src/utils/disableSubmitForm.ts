const handleDisableSignup = (
  formObject: any,
  validationObject: any
): boolean => {
  let disableButton: boolean = false
  const emptyFields: number = Object.keys(formObject).filter((key: string) => {
    return (formObject as any)[key].length === 0
  }).length
  Object.keys(validationObject).forEach(field => {
    if (validationObject[field].error || emptyFields) disableButton = true
  })
  return disableButton
}

export default handleDisableSignup
