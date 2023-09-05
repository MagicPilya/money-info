import {useEffect, useState} from "react";

export const useValidation = (value, validations) => {

  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const [textError, setTextError] = useState('');
  const [isNegative, setNegative] = useState(false);
  const [isNull, setNull] = useState(false);

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
      case 'isNull':
        (value === 0) ? setNull(true) : setNull(false);
        break;
      case 'isNegative':
        (value < 0) ? setNegative(true) : setNegative(false);
      break;
    }
  }
  },[value, textError])

  useEffect(() => {
  if (isEmpty || maxLengthError || minLengthError || emailError || isNull || isNegative) {
    setInputValid(false);
  } else {
    setInputValid(true);
  }
  }, [textError,isEmpty, maxLengthError, minLengthError, emailError, isNull, isNegative]);

  useEffect( () => {
    if (isEmpty) {
      setTextError("Поле не должно быть пустым");
    } else if (maxLengthError) {
      setTextError("Достигнута максимальная длина символов");
    } else if (minLengthError) {
      setTextError('Условие минимального количества символов не удовлетворено');
    } else if (emailError) {
      setTextError("Не правильный email");
    } else if (isNegative) {
      setTextError("Число в поле не может быть отрицательным");
    } else if (isNull) {
      setTextError("Число не должно равняться нулю");
    }
  }, [textError, isEmpty, maxLengthError, minLengthError, emailError, isNegative, isNull]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
    inputValid,
    textError,
    isNegative,
    isNull,
  }
}