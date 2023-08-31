import {useEffect, useState} from "react";

export const useValidation = (value, validations) => {

  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
  for (const validation in validations) {
    switch (validation) {
      case 'minLength':
        value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
        break;
      case 'isEmpty':
        value ? setEmpty(false) : setEmpty(true);
        break;
      case 'maxLength':
        value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
        break;
      case 'isEmail':
        const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        filter.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true);
        break;
    }
  }
  },[value])

  useEffect(() => {
  if (isEmpty || maxLengthError || minLengthError || emailError) {
    setInputValid(false);
  } else {
    setInputValid(true);
  }
  }, [isEmpty, maxLengthError, minLengthError, emailError])
  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
    inputValid
  }
}