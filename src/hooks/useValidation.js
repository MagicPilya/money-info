import {useEffect, useState} from "react";

export const useValidation = (value, validations) => {

  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const [textError, setTextError] = useState('');

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
  },[value, textError])

  useEffect(() => {
  if (isEmpty || maxLengthError || minLengthError || emailError) {
    setInputValid(false);
  } else {
    setInputValid(true);
  }
  }, [textError,isEmpty, maxLengthError, minLengthError, emailError]);

  useEffect( () => {
    if (isEmpty) {
      setTextError("Поле не должно быть пустым");
    } else if (maxLengthError) {
      setTextError("Достигнута максимальная длина символов");
    } else if (minLengthError) {
      setTextError('Условие минимального количества символов не удовлетворено')
    } else if (emailError) {
      setTextError("Не правильный email")
    }
  }, [textError, isEmpty, maxLengthError, minLengthError, emailError]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
    inputValid,
    textError
  }
}